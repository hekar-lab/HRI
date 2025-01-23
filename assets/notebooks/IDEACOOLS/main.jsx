import * as React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import Notebook from './notebook';

const root = createRoot(document.getElementById("notebook-root"));
root.render(
    <StrictMode>
        <Notebook />
    </StrictMode>
)