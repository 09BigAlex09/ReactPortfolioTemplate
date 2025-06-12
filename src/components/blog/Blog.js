import React from 'react';
import { Box, Paper } from "@mui/material";
import { info } from "../../info/Info";
import { Link } from "react-router-dom";
import Style from './Blog.module.scss';

const blogPosts = [
    {
        title: "My Trip to Brno",
        description: "Experiences from visiting Brno, including the VIDA! Science Center and Špilberk Castle.",
        link: "/blog/moj-vylet-do-brna"
    }
    // You can add more articles in the same way
];

export default function Blog({ innerRef }) {
    return (
        <Box
            ref={innerRef}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            mt={'3rem'}
            id={'blog'}
        >
            <h1 className={Style.title}>Blog</h1>
            <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} justifyContent="center" width="100%" mt={2}>
                {blogPosts.map((post, idx) => (
                    <Paper
                        key={idx}
                        elevation={6}
                        sx={{
                            width: { xs: '90%', md: '350px' },
                            p: { xs: 3, md: 4 },
                            borderRadius: '1rem',
                            background: 'linear-gradient(135deg, #f8f8f8 80%, #eae6f7 100%)',
                            boxShadow: '0 .5rem 1rem rgba(0,0,0,0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                        className={Style.shadowed}
                    >
                        <h2 className={Style.title} style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{post.title}</h2>
                        <p className={Style.description} style={{ marginBottom: '1.5rem' }}>{post.description}</p>
                        <Box display="flex" justifyContent="center" width="100%">
                            <Link to={post.link} className={Style.articleLink}>
                                Read more
                            </Link>
                        </Box>
                    </Paper>
                ))}
            </Box>
            <p className={Style.author} style={{ marginTop: '2rem' }}>
                Author: <span style={{ color: info.baseColor }}>{info.firstName} {info.lastName}</span>
            </p>
        </Box>
    );
}