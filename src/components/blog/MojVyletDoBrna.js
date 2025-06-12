import React from "react";
import { Box, Paper } from "@mui/material";
import Style from "./Blog.module.scss";

export default function MojVyletDoBrna() {
    return (
        <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            mt={'3rem'}
            id={'moj-vylet-do-brna'}
        >
            <Paper
                elevation={6}
                sx={{
                    width: { xs: '90%', md: '60%' },
                    p: { xs: 3, md: 5 },
                    borderRadius: '1rem',
                    background: 'linear-gradient(135deg, #f8f8f8 80%, #eae6f7 100%)',
                    boxShadow: '0 .5rem 1rem rgba(0,0,0,0.15)'
                }}
                className={Style.shadowed}
            >
                <h1 className={Style.title}>My Trip to Brno</h1>
                <p className={Style.description}>
                    Brno is the second largest city in the Czech Republic and offers many interesting places to explore.
                </p>
                <p>
                    During my trip, I visited several important landmarks. One of the biggest attractions is the <b>VIDA! Science Center</b>, where I could try various interactive exhibits and learn a lot about science and technology.
                </p>
                <p>
                    Another unforgettable place was <b>Špilberk Castle</b>, which towers above the city. The castle offers a beautiful view of all of Brno and its history is truly fascinating.
                </p>
                <p>
                    Besides that, I enjoyed walks through the historic center, tasted local specialties, and discovered many other interesting sights.
                </p>
            </Paper>
        </Box>
    );
}
