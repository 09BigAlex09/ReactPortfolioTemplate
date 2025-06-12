import React from 'react';
import Style from './Navbar.module.scss';
import { HashLink as Link } from 'react-router-hash-link';
import { Box, Paper } from "@mui/material";
import { info } from "../info/Info";
import { singlePage } from '../info/Info';
import Toggler from "./home/Toggler";

const links = [
    {
        name: 'Home Page',
        to: '',
        active: 'home'
    },
    {
        name: 'About Me',
        to: 'about',
        active: 'about'
    },
    {
        name: 'Portfolio',
        to: 'portfolio',
        active: 'portfolio'
    },
    {
        name: info.initials.toUpperCase(), // ensure initials are uppercase
        type: 'initials',
        to: '',
        active: 'home'
    },
    {
        name: 'Blog',
        to: 'blog',
        active: 'blog'
    },
    {
        name: 'Contact',
        to: 'contact',
        active: 'contact'
    },
    {
        name: 'Snake Game',
        to: 'snake',
        active: 'snake'
    }
];

// This function is used to create a scroll offset to compensate for the navbar
// when you click on the nav buttons to scroll down.
const scrollWidthOffset = (el) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -80; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}

export default function Navbar({ darkMode, handleClick, active, setActive }) {
    return (
        <Box
            component={'nav'}
            width={'100%'}
            position={singlePage ? 'fixed' : 'relative'}
            className={darkMode ? Style.dark : Style.light}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '5rem',
                position: 'relative'
            }}
        >
            {/* Centered nav links */}
            <Box
                component={'ul'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={{ xs: '2rem', md: '8rem' }}
                textTransform={'lowercase'}
                fontSize={'1rem'}
                sx={{
                    margin: '0 auto'
                }}
            >
                {links.map((link, index) => (
                    <Box key={index} component={'li'} className={(link.active === active && !link.type) && Style.active}
                        sx={{ borderImageSource: info.gradient }}>
                        <Link to={singlePage ? `#${link.to}` : `/${link.to}`}
                            scroll={el => scrollWidthOffset(el)}
                            smooth
                            onClick={() => setActive(link.active)} className={Style.link}>
                            {!link.type && <p style={{ padding: '0.5rem 0' }}>{link.name}</p>}
                            {link.type && <h1 style={{ textTransform: 'uppercase', fontWeight: 700 }}>{link.name}</h1>}
                        </Link>
                    </Box>
                ))}
            </Box>
            {/* Toggler box right */}
            <Paper
                elevation={3}
                sx={{
                    position: 'absolute',
                    right: { xs: 12, md: 40 },
                    top: '50%',
                    transform: 'translateY(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    px: 2,
                    py: 1,
                    borderRadius: '2rem',
                    background: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                    gap: 1,
                    minWidth: '80px'
                }}
            >
                <Toggler darkMode={darkMode} handleClick={handleClick} />
                <Box
                    sx={{
                        fontWeight: 'bold',
                        color: darkMode ? '#8D53FF' : '#169c2a',
                        fontSize: '1.05rem',
                        letterSpacing: '1px',
                        ml: 1,
                        textTransform: 'capitalize'
                    }}
                >
                    {darkMode ? 'dark' : 'light'}
                </Box>
            </Paper>
        </Box>
    )
}