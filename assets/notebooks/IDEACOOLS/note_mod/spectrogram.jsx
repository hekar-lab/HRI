import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Canvas, useThree, useFrame, extend } from '@react-three/fiber';
import { OrbitControls, OrthographicCamera, PerspectiveCamera, shaderMaterial } from '@react-three/drei';
import FFT from 'fft.js';
import * as THREE from 'three';
import vertex_shaderGlsl from './vertex_shader.glsl';
import fragment_shaderGlsl from './fragment_shader.glsl';

import * as d3 from "d3";

const SpectralMaterial = shaderMaterial(
    { 
        colorMap: [
            new THREE.Color().setHex(0x522aa2).convertLinearToSRGB(),
            new THREE.Color().setHex(0x005387).convertLinearToSRGB(),
            new THREE.Color().setHex(0x086b71).convertLinearToSRGB(),
            new THREE.Color().setHex(0x237f52).convertLinearToSRGB(),
            new THREE.Color().setHex(0xf9a900).convertLinearToSRGB(),
            new THREE.Color().setHex(0xd05d29).convertLinearToSRGB(),
            new THREE.Color().setHex(0x9b2423).convertLinearToSRGB(),
            new THREE.Color().setHex(0x910775).convertLinearToSRGB(),
        ],
        tPower: null,
    },
    // vertex shader
    vertex_shaderGlsl,
    // fragment shader
    fragment_shaderGlsl
)

extend({ SpectralMaterial })

function SpectralMesh({zData}) {
    const tex = useRef(null);
    const meshRef = useRef(null);
    const materialRef = useRef(null);
    let scaleSpec = [1, 1, 1];
    let posSpec = [0, 0, 0];

    if (zData.length > 0) {
        let width = zData.length;
        let height = zData[0].length
        let texels = new Float32Array(width * height);
        scaleSpec = [width, height, 1];
        posSpec = [width * 0.5, height * 0.5, 0];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let val = (zData[x][y] + 90) / 90;
                texels[x + y * width] = val;
            }
        }

        if (tex.current != null) {
            tex.current.dispose();
        }

        let newTex = new THREE.DataTexture(texels, width, height, THREE.RedFormat, THREE.FloatType);
        newTex.minFilter = THREE.NearestFilter;
        newTex.magFilter = THREE.NearestFilter;
        newTex.needsUpdate = true;
        tex.current = newTex;

        materialRef.current.uniforms.tPower.value = newTex;
        materialRef.current.needsUpdate = true;
    } else {
        if (tex.current != null) {
            tex.current.dispose();
            tex.current = null;
            materialRef.current.uniforms.tPower.value = null;
            materialRef.current.needsUpdate = true;
        }
    }
    
    return (
        <mesh
            ref={meshRef}
            position={posSpec}
            scale={scaleSpec}
        >
            <planeGeometry/>
            <spectralMaterial ref={materialRef}/>
        </mesh>
    )
}

function Spectre({data}) {
    const canvasRef = useRef(null);
    const camRef = useRef(null);
    const cnvSize = useRef([0, 0]);

    const zoomXRef = useRef(null);
    const zoomYRef = useRef(null);

    const dataWidth = useRef(0);
    const dataHeight = useRef(0);
    const fiveSec = useRef(0);
    const eightKHz = useRef(0);

    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);
    const pastTransformRef = useRef(d3.zoomIdentity);

    const [xDomain, setXDomain] = useState([0, 60]);
    const [yDomain, setYDomain] = useState([200,  0]);

    const xScale = useRef(null);
    const yScale = useRef(null);

    const [xAxisScale, setXAxis] = useState(() => d3.scaleLinear([0, 1]));
    const [yAxisScale, setYAxis] = useState(() => d3.scaleLinear([0, 1]));

    const updateScales = () => {
        const tX = d3.zoomTransform(d3.select(xAxisRef.current).node());
        const tY = d3.zoomTransform(d3.select(yAxisRef.current).node());

        console.log(tX);
        console.log(tY);

        setXDomain(xScale.current.range().map(tX.invertX, tX).map(xScale.current.invert));
        setXAxis(() => tX.rescaleX(xScale.current));

        setYDomain(yScale.current.range().map(tY.invertY, tY).map(yScale.current.invert));
        setYAxis(() => tY.rescaleY(yScale.current));
    }

    const zoomed = (evt) => {
        const center = (event, target) => {
            if (event.sourceEvent) {
                const p = d3.pointers(event, target);
                return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])];
            }
            return cnvSize.current.map(d => d / 2);
        }

        const shift = evt.sourceEvent && evt.sourceEvent.shiftKey;

        const xAxis = d3.select(xAxisRef.current);
        const yAxis = d3.select(yAxisRef.current);

        const t = evt.transform;
        const tX = d3.zoomTransform(xAxis.node());
        const tY = d3.zoomTransform(yAxis.node());
        const tOld = pastTransformRef.current;

        const k = t.k / tOld.k;
        const c = center(evt, evt.currentTarget); 

        if (k === 1) {
            yAxis.call(zoomYRef.current.translateBy, 0, (t.y - tOld.y) / tY.k)
            xAxis.call(zoomXRef.current.translateBy, (t.x - tOld.x) / tX.k, 0)
        } else {
            if (shift) {
                yAxis.call(zoomYRef.current.scaleBy, k, c)
            } else {
                xAxis.call(zoomXRef.current.scaleBy, k, c)
            }
        }

        updateScales();

        pastTransformRef.current = t;
    }

    const updateZoom = () => {
        const cnv = canvasRef.current;
        const cnvWidth = cnv.parentElement.clientWidth;
        const cnvHeight = cnv.parentElement.clientHeight;
        const cnvD3 = d3.select(cnv);

        const xAxis = d3.select(xAxisRef.current);
        const yAxis = d3.select(yAxisRef.current);

        cnvSize.current = [cnvWidth, cnvHeight];
        xScale.current = d3.scaleLinear([0, dataWidth.current], [0, cnvWidth]);
        yScale.current = d3.scaleLinear([dataHeight.current, 0], [0, cnvHeight]);

        zoomXRef.current = d3.zoom()
            .scaleExtent([1, dataWidth.current / 20])
            .translateExtent([[0, -Infinity], [cnvWidth, Infinity]])

        zoomYRef.current = d3.zoom()
            .scaleExtent([1, dataHeight.current / 20])
            .translateExtent([[-Infinity, 0], [Infinity, cnvHeight]]);

        cnvD3.call(d3.zoom().on("zoom", zoomed));

        xAxis.call(zoomXRef.current);
        yAxis.call(zoomYRef.current);

        xAxis.call(
            zoomXRef.current.transform, 
            new d3.ZoomTransform(dataWidth.current / fiveSec.current, 0, 0)
        );
        yAxis.call(
            zoomYRef.current.transform,
            new d3.ZoomTransform(dataHeight.current / eightKHz.current, 0, -cnvHeight * (dataHeight.current / eightKHz.current  - 1))
        );

        updateScales();
    }

    const handleResize = () => {
        const cnv = canvasRef.current.parentElement;
        if (
            canvasRef.current 
            && (cnv.clientWidth != cnvSize.current[0] || cnv.clientHeight != cnvSize.current[1])
        ) {
            updateZoom();
        }
    }

    useEffect(() => {
        fiveSec.current = 5 * (data.sr / data.fftSize);
        dataWidth.current = Math.max(fiveSec.current, data.raw.length);
        dataHeight.current = data.fftSize / 2;
        eightKHz.current = (8000 / data.sr) * dataHeight.current;
        updateZoom();
    }, [data])

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, [])
    
    return (
        <div className='spectrogram-container'>
        <Canvas ref={canvasRef} className='spectrogram-view'>
            <OrthographicCamera 
                makeDefault
                position={[0, 0, 10]} 
                top={yDomain[0]} 
                bottom={yDomain[1]} 
                left={xDomain[0]} 
                right={xDomain[1]} 
                near={1} 
                far={100}
                ref={camRef}
                manual
                onUpdate={(c) => c.updateProjectionMatrix()}
            /> 
            <SpectralMesh zData={data.raw}/>
        </Canvas>
        <Axis scale={xAxisScale} orientation={'x'} ref={xAxisRef}/>
        <Axis scale={yAxisScale} orientation={'y'} ref={yAxisRef}/>
        </div>
    );
}

const Axis = forwardRef(
function Axis({scale, orientation}, svgRef) {

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        if (scale) {
            if (orientation == 'x') {
                svg.select('.axis')
                    .attr('transform', `translate(-1, 0)`)
                    .call(d3.axisBottom(scale));
            } else if (orientation == 'y') {
                svg.select('.axis')
                    .attr('transform', `translate(${svgRef.current.clientWidth - 1}, 0)`)
                    .call(d3.axisLeft(scale));
            }
        }
    })

    return (
        <svg className={'spectrogram-' + orientation + '-axis'} ref={svgRef}>
            <g className='axis'/>
        </svg>
    )
})

export default function SpectrogramModule({data}) {
    const divId = "spectrogram";
    const fftSize = 1024;

    const getSpectrogramData = () => {
        if (data === null) { return { raw: [], sr: 1 }}

        let samples = new Float32Array(data.length);
        let spectre = [];
        let f = new FFT(fftSize);

        for (let c = 0; c < data.numberOfChannels; c++) {
            let channel = data.getChannelData(c);
            for (let s = 0; s < data.length; s++) {
                samples[s] += channel[s];
            }
        }

        for (let i = 0; i < samples.length; i += fftSize) {
            let out = f.createComplexArray();
            let batch = samples.slice(i, i + fftSize);
            if (batch.length < fftSize) {
                let paddedBatch = new Float32Array(fftSize);
                paddedBatch.set(batch, 0);
                batch = paddedBatch;
            }
            f.realTransform(out, batch);
            for (let j = 0; j < out.length; j += 2) {
                out[j] = Math.log10(Math.sqrt(out[j] * out[j] + out[j + 1] * out[j + 1]) * 2 / data.numberOfChannels / fftSize) * 20 ;
            }
            out = out.filter((_, index) => index % 2 === 0);
            spectre.push(out.slice(0, out.length/2 + 1));
        }

        return {raw: spectre, sr: data.sampleRate, fftSize: fftSize};
    };

    const spectrogramData = getSpectrogramData();

    return (
        <>{
            createPortal(
                <div className='lab-canvas-container'>
                    <Spectre data={spectrogramData}/>
                </div>,
                document.getElementById(`lab-module-${divId}`)
            )
        }</>
    );
}