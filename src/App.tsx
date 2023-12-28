import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import WeekPage from "./pages/WeekPage";

function App() {
    return (
        <Routes>
            <Route path="/" index element={<MainPage/>}/>
            <Route path="/:date" element={<WeekPage/>}/>
        </Routes>
    );
}

export default App;
