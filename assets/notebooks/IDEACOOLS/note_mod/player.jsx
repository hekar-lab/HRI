import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export default function PlayerModule({aux, data}) {
    const divId = "player";
    const [isPlaying, setIsPlaying] = useState(false);
    const [source, setSource] = useState(null);

    const handleEnded = () => {
        stopAudio();
        setIsPlaying(false);
    }

    const stopAudio = () => {
        if (source != null) {
            source.stop();
            source.disconnect();
            source.removeEventListener('ended', handleEnded);
            setSource(null);
        }
    }

    const [prevData, setPrevData] = useState(data);
    if (data !== prevData) {
        setPrevData(data);
        stopAudio();
        setIsPlaying(false)
    }

    const handleClick = () => {
        if (data != null){
            if (isPlaying) {
                stopAudio();
                setIsPlaying(false);
            } else {
                let newSource = new AudioBufferSourceNode(aux, {
                    buffer: data
                });
                newSource.connect(aux.destination);
                newSource.addEventListener('ended', handleEnded);
                newSource.start();
                setSource(newSource);
                setIsPlaying(true);
            }
        }
    }



    return (
        <>{
            createPortal(
                <button
                    onClick={handleClick}
                >
                    {isPlaying ? (
                        "Pause"
                    ) : (
                        "Play"
                    )}
                </button>,
                document.getElementById(`lab-module-${divId}`)
            )
        }</>
    );
}