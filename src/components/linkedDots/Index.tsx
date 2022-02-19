import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import Layout from 'components/common/Layout';

import style from './Index.module.scss';

interface Dot {
    x: number,
    y: number,
    radian: number,
    speed: number
}

const Index: FunctionComponent = () => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [dots, setDots] = useState<Array<Dot>>([]);

    const pointAmount: number = 1;

    useEffect(() => {
        if (!canvasElement) return;
        const context: CanvasRenderingContext2D | null = canvasElement.getContext('2d');

        if (!canvasElement) return;
        if (!context) return;

        setContext(context);

        const width: number = canvasElement.width;
        const height: number = canvasElement.height;

        for (let i = 0; i < pointAmount; i++) {
            const x: number = Math.floor(Math.random() * width);
            const y: number = Math.floor(Math.random() * height);
            const radian: number = Math.random() * (Math.PI * 2);
            const degree: number = radian / Math.PI * 180;
            const speed: number = 1;

            const dot: Dot = {
                x: x,
                y: y,
                radian: radian,
                speed: speed
            }

            dots.push(dot);

            context?.strokeRect(x, y, 1, 1);
        }

        return () => {
            context.clearRect(0, 0, width, height);
        }
    }, [canvasElement]);

    const framePerSecond: number = 144;
    const secondUnit: number = 1000;
    const secondPerFrame: number = secondUnit / framePerSecond;

    const getQuadrantIndex = (radian: number): number => {
        return Math.floor(radian / (Math.PI / 2));
    }

    const getQuadrantMaxRadian = (quadrantIndex: number): number => {
        return quadrantIndex * (Math.PI / 2);
    }

    const getQuadrantDirection = (quadrantIndex: number, boundIndex: number): number => {
        return quadrantIndex > boundIndex ? 1 : -1;
    }

    const getReflexedDot = (currentDot: Dot, boundIndex: number): Dot => {
        const quadrantIndex: number = getQuadrantIndex(currentDot.radian);

        const quadrantDirection: number = getQuadrantDirection(quadrantIndex, boundIndex);
        console.log("quadrantDirection", quadrantDirection);
        const newQuadrantIndex = 4 + (quadrantIndex + quadrantDirection) % 4;
        console.log("newQuadrantIndex", newQuadrantIndex);

        const newRadian = getQuadrantMaxRadian(newQuadrantIndex) + currentDot.radian;

        const newMoveX: number = Math.cos(newRadian) * currentDot.speed;
        const newMoveY: number = Math.sin(newRadian) * currentDot.speed;

        let newX: number = currentDot.x + newMoveX;
        let newY: number = currentDot.y + newMoveY;

        newX = newX < 0 ? 0 : newX;
        newY = newY < 0 ? 0 : newY;

        const width: number = canvasElement?.width || 0;
        const height: number = canvasElement?.height || 0;

        newX = newX > width ? width : newX;
        newY = newX > height ? height : newY;

        const newDot: Dot = {
            x: newX,
            y: newY,
            radian: newRadian,
            speed: currentDot.speed
        }

        return newDot;
    }

    useEffect(() => {
        const rendererId = setTimeout(() => {
            const width: number = canvasElement?.width || 0;
            const height: number = canvasElement?.height || 0;

            context?.clearRect(0, 0, width, height);

            const newDots = dots.map((dot: Dot) => {
                const moveX: number = Math.cos(dot.radian) * dot.speed;
                const moveY: number = Math.sin(dot.radian) * dot.speed;

                const newX: number = dot.x + moveX;
                const newY: number = dot.y + moveY;

                const isTopOutOfBounds: boolean = newY < 0;
                const isLeftOutOfBounds: boolean = newX < 0;
                const isBottomOutOfBounds: boolean = newY > height;
                const isRightOutOfBounds: boolean = newX > width;

                const isOutOfBounds: boolean = isTopOutOfBounds || isLeftOutOfBounds || isBottomOutOfBounds || isRightOutOfBounds;

                if (isOutOfBounds) {
                    if (isTopOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, 0);

                        context?.strokeRect(newDot.x, newDot.y, 1, 1);
                        return newDot;
                    }
                    if (isLeftOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, 1);

                        context?.strokeRect(newDot.x, newDot.y, 1, 1);
                        return newDot;
                    }
                    if (isBottomOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, 2);

                        context?.strokeRect(newDot.x, newDot.y, 1, 1);
                        return newDot;
                    }
                    if (isRightOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, 3);

                        context?.strokeRect(newDot.x, newDot.y, 1, 1);
                        return newDot;
                    }
                }

                const newDot: Dot = { x: newX, y: newY, radian: dot.radian, speed: dot.speed };

                context?.strokeRect(newDot.x, newDot.y, 1, 1);

                return newDot;
            });

            setDots(newDots);
        }, secondPerFrame);

        return () => clearTimeout(rendererId);
    }, [dots]);

    return (
        <Layout>
            <canvas
                className={style.canvas}
                width={500}
                height={500}
                ref={element => setCanvasElement(element)}
            ></canvas>
        </Layout>
    );
}

export default Index;