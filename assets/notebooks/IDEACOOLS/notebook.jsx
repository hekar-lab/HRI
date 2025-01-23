import * as React from 'react';
import { useState, useRef } from 'react';

import DataLoaderModule from './note_mod/data_loader';
import PlayerModule from './note_mod/player';
import SpectrogramModule from './note_mod/spectrogram';

export default function Notebook() {
    const aux = useRef(new AudioContext());
    const [wavData, setWavData] = useState(null);

    return (
        <>
            <DataLoaderModule
                aux={aux.current}
                setData={setWavData}
            />
            <PlayerModule
                aux={aux.current}
                data={wavData}
            />
            <SpectrogramModule
                data={wavData}
            />
        </>
    )
}