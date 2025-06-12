import React, { useRef, useEffect, useState } from "react";
import { Box, Paper, Button } from "@mui/material";
import Style from "../blog/Blog.module.scss";

const BOARD_SIZE = 15;
const CELL_SIZE = 24;
const INITIAL_SNAKE = [
    { x: 7, y: 7 },
    { x: 6, y: 7 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function getRandomFood(snake) {
    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };
        if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return newFood;
        }
    }
}

export default function SnakeGame() {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
    const [running, setRunning] = useState(true);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const moveRef = useRef(direction);
    const runningRef = useRef(running);

    useEffect(() => {
        moveRef.current = direction;
    }, [direction]);
    useEffect(() => {
        runningRef.current = running;
    }, [running]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!runningRef.current) return;
            switch (e.key) {
                case "ArrowUp":
                case "w":
                    if (moveRef.current.y !== 1) setDirection({ x: 0, y: -1 });
                    break;
                case "ArrowDown":
                case "s":
                    if (moveRef.current.y !== -1) setDirection({ x: 0, y: 1 });
                    break;
                case "ArrowLeft":
                case "a":
                    if (moveRef.current.x !== 1) setDirection({ x: -1, y: 0 });
                    break;
                case "ArrowRight":
                case "d":
                    if (moveRef.current.x !== -1) setDirection({ x: 1, y: 0 });
                    break;
                default:
                    break;
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!running) return;
        if (gameOver) return;
        const interval = setInterval(() => {
            setSnake(prevSnake => {
                const newHead = {
                    x: prevSnake[0].x + moveRef.current.x,
                    y: prevSnake[0].y + moveRef.current.y
                };
                // Check collision
                if (
                    newHead.x < 0 || newHead.x >= BOARD_SIZE ||
                    newHead.y < 0 || newHead.y >= BOARD_SIZE ||
                    prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
                ) {
                    setGameOver(true);
                    setRunning(false);
                    return prevSnake;
                }
                let newSnake;
                if (newHead.x === food.x && newHead.y === food.y) {
                    newSnake = [newHead, ...prevSnake];
                    setFood(getRandomFood(newSnake));
                    setScore(s => s + 1);
                } else {
                    newSnake = [newHead, ...prevSnake.slice(0, -1)];
                }
                return newSnake;
            });
        }, 180); // slowed down from 120ms to 180ms
        return () => clearInterval(interval);
    }, [food, running, gameOver]);

    const handleRestart = () => {
        setSnake(INITIAL_SNAKE);
        setDirection(INITIAL_DIRECTION);
        setFood(getRandomFood(INITIAL_SNAKE));
        setScore(0);
        setGameOver(false);
        setRunning(true);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" mt="3rem" id="snake-game">
            <Paper
                elevation={6}
                sx={{
                    width: BOARD_SIZE * CELL_SIZE + 32,
                    p: { xs: 2, md: 4 },
                    borderRadius: '1rem',
                    background: 'linear-gradient(135deg, #f8f8f8 80%, #eae6f7 100%)',
                    boxShadow: '0 .5rem 1rem rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
                className={Style.shadowed}
            >
                <h1 className={Style.title}>Snake Game</h1>
                <Box
                    sx={{
                        width: BOARD_SIZE * CELL_SIZE,
                        height: BOARD_SIZE * CELL_SIZE,
                        background: "#1f1f1f",
                        borderRadius: "0.5rem",
                        position: "relative",
                        margin: "1rem 0",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        overflow: "hidden"
                    }}
                >
                    {/* Snake */}
                    {snake.map((segment, idx) => (
                        <Box
                            key={idx}
                            sx={{
                                position: "absolute",
                                left: segment.x * CELL_SIZE,
                                top: segment.y * CELL_SIZE,
                                width: CELL_SIZE,
                                height: CELL_SIZE,
                                background: idx === 0 ? "#8D53FF" : "#169c2a",
                                borderRadius: idx === 0 ? "30%" : "20%",
                                border: idx === 0 ? "2px solid #CA6BE6" : "1px solid #8D53FF",
                                transition: "left 80ms, top 80ms"
                            }}
                        />
                    ))}
                    {/* Food */}
                    <Box
                        sx={{
                            position: "absolute",
                            left: food.x * CELL_SIZE,
                            top: food.y * CELL_SIZE,
                            width: CELL_SIZE,
                            height: CELL_SIZE,
                            background: "#CA6BE6",
                            borderRadius: "50%",
                            border: "2px solid #8D53FF"
                        }}
                    />
                </Box>
                <Box mb={2} fontWeight="bold" color="#8D53FF" fontSize="1.2rem">
                    Score: {score}
                </Box>
                {gameOver && (
                    <Box mb={2} color="#FF6057" fontWeight="bold">
                        Game Over!
                    </Box>
                )}
                <Button
                    variant="contained"
                    sx={{
                        background: "#8D53FF",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "2rem",
                        px: 4,
                        py: 1,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                        '&:hover': {
                            background: "#169c2a"
                        }
                    }}
                    onClick={handleRestart}
                >
                    {gameOver ? "Play Again" : "Restart"}
                </Button>
                <Box mt={2} color="#555" fontSize="0.95rem" textAlign="center">
                    Controls: Arrow keys or WASD
                </Box>
            </Paper>
        </Box>
    );
}
