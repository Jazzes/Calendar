import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createGlobalStyle} from "styled-components";
import {HashRouter} from "react-router-dom";
import Context from "./context/Context";

const Global = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Montserrat', sans-serif;
    }
`

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <>
        <Global/>
        {/*Через BrowserRouter пустой index.html при сборке через webpack*/}
        <HashRouter>
            <Context>
                <App/>
            </Context>
        </HashRouter>
    </>
);