'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RotateCcw, ArrowLeft, ArrowRight, Crosshair } from 'lucide-react';

// --- GAME CONSTANTS ---
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const PLAYER_SPEED = 5;
const BULLET_SPEED = 7;
const BASE_ENEMY_SPEED = 1;
const BASE_ENEMY_ROWS = 3;
const ENEMY_COLS = 8;
const ENEMY_SIZE = 24;
const ENEMY_GAP = 16;

interface GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
}

export default function SpaceInvaders() {
    const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const reqRef = useRef<number>(0);

    // Game State Refs
    const player = useRef({ x: CANVAS_WIDTH / 2 - 15, y: CANVAS_HEIGHT - 30, width: 30, height: 15 });
    const bullets = useRef<GameObject[]>([]);
    const enemies = useRef<GameObject[]>([]);
    const enemyDirection = useRef(1);
    const keys = useRef<{ [key: string]: boolean }>({});
    const scoreRef = useRef(0);
    const levelRef = useRef(1);

    const initEnemies = useCallback((currentLevel: number) => {
        const newEnemies = [];
        const startX = 50;
        const startY = 40;
        const rows = Math.min(BASE_ENEMY_ROWS + Math.floor((currentLevel - 1) / 2), 6);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < ENEMY_COLS; col++) {
                newEnemies.push({
                    x: startX + col * (ENEMY_SIZE + ENEMY_GAP),
                    y: startY + row * (ENEMY_SIZE + ENEMY_GAP),
                    width: ENEMY_SIZE,
                    height: ENEMY_SIZE,
                    active: true,
                });
            }
        }
        enemies.current = newEnemies;
    }, []);

    const startGame = useCallback(() => {
        setGameState('playing');
        setScore(0);
        setLevel(1);
        scoreRef.current = 0;
        levelRef.current = 1;
        player.current = { x: CANVAS_WIDTH / 2 - 15, y: CANVAS_HEIGHT - 30, width: 30, height: 15 };
        bullets.current = [];
        enemyDirection.current = 1;
        initEnemies(1);
    }, [initEnemies]);

    // NEW: Extracted Action Logic (Shoot / Start Game) for Mobile Button Reusability
    const handleAction = useCallback(() => {
        if (gameState === 'idle' || gameState === 'gameover') {
            startGame();
        } else if (bullets.current.length < 3) {
            bullets.current.push({
                x: player.current.x + player.current.width / 2 - 2,
                y: player.current.y,
                width: 4,
                height: 10,
                active: true,
            });
        }
    }, [gameState, startGame]);

    const update = useCallback(() => {
        if (gameState !== 'playing') return;
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#0d1117';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        if (keys.current['ArrowLeft'] && player.current.x > 0) {
            player.current.x -= PLAYER_SPEED;
        }
        if (keys.current['ArrowRight'] && player.current.x < CANVAS_WIDTH - player.current.width) {
            player.current.x += PLAYER_SPEED;
        }

        ctx.fillStyle = '#58a6ff';
        bullets.current.forEach((bullet, index) => {
            bullet.y -= BULLET_SPEED;
            ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            if (bullet.y < 0) bullets.current.splice(index, 1);
        });

        const activeEnemies = enemies.current.filter((e) => e.active);

        if (activeEnemies.length === 0) {
            levelRef.current += 1;
            setLevel(levelRef.current);
            bullets.current = [];
            enemyDirection.current = 1;
            initEnemies(levelRef.current);
            reqRef.current = requestAnimationFrame(update);
            return;
        }

        let hitEdge = false;
        const currentEnemySpeed = BASE_ENEMY_SPEED + (levelRef.current * 0.3);

        activeEnemies.forEach((enemy) => {
            enemy.x += currentEnemySpeed * enemyDirection.current;
            if (enemy.x <= 0 || enemy.x + enemy.width >= CANVAS_WIDTH) {
                hitEdge = true;
            }
        });

        if (hitEdge) {
            enemyDirection.current *= -1;
            activeEnemies.forEach((enemy) => {
                enemy.y += 20;
                if (enemy.y + enemy.height >= player.current.y) {
                    setGameState('gameover');
                }
            });
        }

        ctx.fillStyle = '#3fb950';
        activeEnemies.forEach((enemy) => {
            ctx.fillRect(enemy.x + 4, enemy.y, 16, 4);
            ctx.fillRect(enemy.x, enemy.y + 4, 24, 8);
            ctx.fillRect(enemy.x + 4, enemy.y + 12, 4, 8);
            ctx.fillRect(enemy.x + 16, enemy.y + 12, 4, 8);

            bullets.current.forEach((bullet, bIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    enemy.active = false;
                    bullets.current.splice(bIndex, 1);
                    scoreRef.current += 10;
                    setScore(scoreRef.current);
                }
            });
        });

        ctx.fillStyle = '#c9d1d9';
        ctx.fillRect(player.current.x + 12, player.current.y - 6, 6, 6);
        ctx.fillRect(player.current.x, player.current.y, player.current.width, player.current.height);

        reqRef.current = requestAnimationFrame(update);
    }, [gameState, initEnemies]);

    useEffect(() => {
        if (gameState === 'playing') {
            reqRef.current = requestAnimationFrame(update);
        }
        return () => {
            if (reqRef.current) cancelAnimationFrame(reqRef.current);
        };
    }, [gameState, update]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            keys.current[e.code] = true;
            if (e.code === 'Space') {
                e.preventDefault();
                handleAction(); // Uses the extracted logic
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            keys.current[e.code] = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleAction]);

    return (
        <div className="flex flex-col items-center bg-[#0d1117] p-4 sm:p-6 rounded-xl border border-[#30363d] font-mono select-none w-full max-w-4xl mx-auto shadow-2xl h-full max-h-[100dvh]">

            <div className="w-full flex justify-between items-center mb-4 px-2 text-[#8b949e] shrink-0">
                <h2 className="font-bold tracking-widest text-sm sm:text-base">SYNTAX_INVADERS</h2>
                <div className="flex gap-4 sm:gap-6 text-lg sm:text-xl font-bold text-[#c9d1d9]">
                    <span className="text-[#58a6ff]">LVL: {level}</span>
                    <span>SCORE: {score.toString().padStart(4, '0')}</span>
                </div>
            </div>

            {/* 1. The wrapper now flexibly fills the space and handles the background/border */}
            <div className="relative w-full flex-1 min-h-0 flex items-center justify-center bg-[#0d1117] border-b-2 border-[#30363d] rounded-sm overflow-hidden">

                {/* 2. object-contain perfectly scales the canvas without stretching it */}
                <canvas
                    ref={canvasRef}
                    width={CANVAS_WIDTH}
                    height={CANVAS_HEIGHT}
                    className="w-full h-full object-contain block"
                />

                {gameState === 'idle' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                        <span className="text-[#3fb950] animate-pulse mb-4 text-sm sm:text-base font-bold">PRESS SPACE TO DEPLOY</span>
                        <div className="text-[#8b949e] text-xs sm:text-sm text-center">
                            <p>Arrows to Move, Space to Shoot</p>
                            <p className="sm:hidden text-[#58a6ff] mt-2">Touch controls enabled</p>
                        </div>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 gap-4">
                        <span className="text-red-500 tracking-[0.3em] font-bold text-xl sm:text-2xl">SYSTEM FAILURE</span>
                        <span className="text-[#c9d1d9] text-sm sm:text-base">REACHED LEVEL {level}</span>
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 px-4 py-2 mt-2 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] rounded-md transition-colors text-sm sm:text-base"
                        >
                            <RotateCcw className="w-4 h-4" /> REBOOT
                        </button>
                    </div>
                )}
            </div>

            <div className="flex sm:hidden w-full justify-between items-center mt-6 px-2 touch-none shrink-0">
                <div className="flex gap-4">
                    <button
                        onPointerDown={() => (keys.current['ArrowLeft'] = true)}
                        onPointerUp={() => (keys.current['ArrowLeft'] = false)}
                        onPointerLeave={() => (keys.current['ArrowLeft'] = false)}
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-14 h-14 bg-[#21262d] rounded-full active:bg-[#30363d] text-[#8b949e] flex items-center justify-center shadow-lg"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button
                        onPointerDown={() => (keys.current['ArrowRight'] = true)}
                        onPointerUp={() => (keys.current['ArrowRight'] = false)}
                        onPointerLeave={() => (keys.current['ArrowRight'] = false)}
                        onContextMenu={(e) => e.preventDefault()}
                        className="w-14 h-14 bg-[#21262d] rounded-full active:bg-[#30363d] text-[#8b949e] flex items-center justify-center shadow-lg"
                    >
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>
                <button
                    onPointerDown={handleAction}
                    onContextMenu={(e) => e.preventDefault()}
                    className="w-20 h-20 bg-[#3fb950]/20 border-2 border-[#3fb950] rounded-full active:bg-[#3fb950]/40 text-[#3fb950] flex items-center justify-center shadow-[0_0_15px_rgba(63,185,80,0.3)]"
                >
                    <Crosshair className="w-8 h-8" />
                </button>
            </div>

        </div>
    );
}