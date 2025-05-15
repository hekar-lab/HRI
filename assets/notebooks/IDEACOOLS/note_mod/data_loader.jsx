import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function Select({selection, selected, onSelection}) {
    return (
        <select
            value={selected}
            onChange={(e) => onSelection(e.target.value)}
        >
            {selection.length == 0 ? 
            <option value="" key="default"> Loading... </option>
            :
            selection.map((opt) => {
                return <option value={opt.id} key={opt.id}>{opt.name}</option>
            })}
        </select>
    );
}

function FileSelector({aux, setData, rawFiles, fileId, fileList, setFileList}) {
    const filesToDL = [
        {id: 'burger', url: '/music/wav/BIGTOP BURGER UP.wav', name: 'BIGTOP.wav'},
        {id: 'bbawtd', url: '/music/wav/bbawtd.wav', name: 'Banana_Bread.wav'}
    ];
    const defaultFile = 'bbawtd';    

    useEffect(() => {
        const loadFiles = async () => {
            const loadPromises = filesToDL.map(async (file) => {
                const data = await fetch(file.url);
                const buffer = await data.arrayBuffer();
                const decoded = await aux.decodeAudioData(buffer);
                rawFiles.current[file.id] = decoded;
                return {id: file.id, name: file.name};
            });
    
            const loadedFiles = await Promise.all(loadPromises);
            setFileList(loadedFiles);
            handleSelection(defaultFile);
        };
    
        loadFiles();
    }, [aux]);

    const handleSelection = (id) => {
        if (id in rawFiles.current){
            setData(rawFiles.current[id]);
            fileId.current = id;
        } else {
            setData(null);
            fileId.current = '';
        }
    }

    return (
        <Select
            selection={fileList}
            selected={fileId.current}
            onSelection={handleSelection}
        />
    )
}

function FileUploader({aux, setData, rawFiles, fileId, fileList, setFileList}) {
    const handleChange = (evt) => {
        const loadFiles = async () => {
            let files = [];
            for (const f of evt.target.files) {
                files.push(f);
            }
            evt.target.value = '';
            files = files.filter(
                f => !(f.name in rawFiles.current) && f.type.startsWith("audio")
            );

            if (files.length > 0) {
                const loadPromises = files.map(async (file) => {
                    const buffer = await file.arrayBuffer();
                    const decoded = await aux.decodeAudioData(buffer);
                    rawFiles.current[file.name] = decoded;
                    return {id: file.name, name: file.name};
                });
        
                const loadedFiles = await Promise.all(loadPromises);
                setFileList(fileList.concat(loadedFiles));
                handleSelection(loadedFiles[0].id);
            }
        };

        loadFiles();
    }

    const handleSelection = (id) => {
        if (id in rawFiles.current){
            setData(rawFiles.current[id]);
            fileId.current = id;
        } else {
            setData(null);
            fileId.current = '';
        }
    }

    return (
        <>
        <input id="file-upload" type="file" accept="audio/*" style={{display: "none"}} onChange={handleChange}/>
        <label htmlFor="file-upload" className="upload">WIP :p</label>
        </>
    )
}

export default function DataLoaderModule({aux, setData}) {
    const divId = "data-loader";

    const rawFiles = useRef({});
    const fileId = useRef('');
    const [fileList, setFileList] = useState([]);

    return (
        <>
        {createPortal(
            <div>
                <p>Select file: </p>
                <FileSelector aux={aux} setData={setData} rawFiles={rawFiles} fileId={fileId} fileList={fileList} setFileList={setFileList}/>
                <p>| Upload files: </p>
                <FileUploader aux={aux} setData={setData} rawFiles={rawFiles} fileId={fileId} fileList={fileList} setFileList={setFileList}/>
            </div>,
            document.getElementById(`lab-module-${divId}`)
        )}
        </>
    );
}