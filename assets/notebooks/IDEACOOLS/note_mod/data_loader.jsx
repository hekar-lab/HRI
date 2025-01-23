import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function Select({selection, selected, onSelection}) {
    return (
        <select
            value={selected}
            onChange={(e) => onSelection(e.target.value)}
        >
            <option value="" key="default"> Select a file </option>
            {selection.map((opt) => {
                return <option value={opt.id} key={opt.id}>{opt.name}</option>
            })}
        </select>
    );
}

export default function DataLoaderModule({aux, setData}) {
    const divId = "data-loader";
    const filesToDL = [
        {id: 'burger', url: '/music/wav/BIGTOP BURGER UP.wav', name: 'BIGTOP.wav'},
        {id: 'bbawtd', url: '/music/wav/bbawtd.wav', name: 'Banana_Bread.wav'}
    ];

    const rawFiles = useRef({});
    const fileId = useRef('');
    const [fileList, setFileList] = useState([]);

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
        <>
        {createPortal(
            <Select
                selection={fileList}
                selected={fileId.current}
                onSelection={handleSelection}
            />,
            document.getElementById(`lab-module-${divId}`)
        )}
        </>
    );
}