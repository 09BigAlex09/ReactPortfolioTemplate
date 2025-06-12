import Home from "./home/Home";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import Blog from "./blog/Blog";
import MojVyletDoBrna from "./blog/MojVyletDoBrna";
import Contact from "./contact/Contact";
import SnakeGame from "./snake/SnakeGame";
import React from 'react';
import { Route, Routes } from 'react-router-dom';

export default function MultiPageRoutes() {
    return (
        <Routes>
            <Route exact path={'/'} element={<Home />} />
            <Route exact path={'/about'} element={<About />} />
            <Route exact path={'/portfolio'} element={<Portfolio />} />
            <Route exact path={'/blog'} element={<Blog />} />
            <Route exact path={'/blog/moj-vylet-do-brna'} element={<MojVyletDoBrna />} />
            <Route exact path={'/contact'} element={<Contact />} />
            <Route exact path={'/snake'} element={<SnakeGame />} />
        </Routes>
    );
}