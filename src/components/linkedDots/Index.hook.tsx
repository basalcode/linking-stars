export interface Dot {
    x: number,
    y: number,
    radian: number,
    speed: number
}

enum QuadrantIndex {
    First = 0,
    Second,
    Third,
    Fourth
}

import { useEffect, useState } from 'react';

const pointAmount: number = 50;
const framePerSecond: number = 144;
const secondUnit: number = 1000;
const secondPerFrame: number = secondUnit / framePerSecond;

const getQuadrantIndex = (radian: number): number => {
    const qudrantUnit: number = Math.PI / 2;
    const quadrantIndex: number = Math.floor(radian / qudrantUnit);

    return quadrantIndex;
}

const getQuadrantMinRadian = (quadrantIndex: number): number => {
    const quadrantMaxRadian: number = quadrantIndex * (Math.PI / 2);

    return quadrantMaxRadian;
}

const getReflectedQuadrantIndex = (originalQuadrantIndex: number, boundaryIndex: number): number => {
    const nextIndex: number = 1;
    const previousIndex: number = -1;

    const isForwardDirection = moveQuadrantIndex(originalQuadrantIndex, -1) === boundaryIndex;
    const shiftingIndex: number = isForwardDirection ? nextIndex : previousIndex;

    const reflectedQuadrantIndex: number = moveQuadrantIndex(originalQuadrantIndex, shiftingIndex);
    return reflectedQuadrantIndex;
}

const quadrantAmount = 4;
const moveQuadrantIndex = (currentQuadrantIndex: number, movement: number) => {
    return (quadrantAmount + (currentQuadrantIndex + movement)) % quadrantAmount;
}

const getOverflowedRadian = (radian: number) => {
    return radian % (Math.PI / 2);
}

const getReflexedDot = (currentDot: Dot, boundaryIndex: number): Dot => {
    const originalQuadrantIndex: number = getQuadrantIndex(currentDot.radian);
    const reflectedQuadrantIndex = getReflectedQuadrantIndex(originalQuadrantIndex, boundaryIndex);

    const reflectedRadian = getQuadrantMinRadian(reflectedQuadrantIndex) + ((Math.PI / 2) - getOverflowedRadian(currentDot.radian));

    const reflectedX: number = Math.cos(reflectedRadian) * currentDot.speed;
    const reflectedY: number = Math.sin(reflectedRadian) * currentDot.speed;

    let newX: number = currentDot.x + reflectedX;
    let newY: number = currentDot.y + reflectedY;

    const newDot: Dot = {
        x: newX,
        y: newY,
        radian: reflectedRadian,
        speed: currentDot.speed
    }

    return newDot;
}

const initializeDot = (width: number, height: number): Dot => {
    const x: number = Math.floor(Math.random() * width);
    const y: number = Math.floor(Math.random() * height);
    const radian: number = Math.random() * (Math.PI * 2);
    const speed: number = 1;

    const dot: Dot = {
        x: x,
        y: y,
        radian: radian,
        speed: speed
    }

    return dot;
}


export const useIndex = () => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
    const [dots, setDots] = useState<Array<Dot>>([]);

    useEffect(() => {
        if (!canvasElement) return;
        const width: number = canvasElement.width;
        const height: number = canvasElement.height;

        for (let i = 0; i < pointAmount; i++) {
            const dot = initializeDot(width, height);
            dots.push(dot);
        }
    }, [canvasElement]);

    useEffect(() => {
        if (!canvasElement) return;

        const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
        const rendererId = setTimeout(() => {
            const width: number = canvasElement.width;
            const height: number = canvasElement.height;

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
                        const newDot: Dot = getReflexedDot(dot, QuadrantIndex.Third);

                        context?.strokeRect(newDot.x, newDot.y, 4, 4);
                        return newDot;
                    }
                    if (isLeftOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, QuadrantIndex.Second);

                        context?.strokeRect(newDot.x, newDot.y, 4, 4);
                        return newDot;
                    }
                    if (isBottomOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, QuadrantIndex.First);

                        context?.strokeRect(newDot.x, newDot.y, 4, 4);
                        return newDot;
                    }
                    if (isRightOutOfBounds) {
                        const newDot: Dot = getReflexedDot(dot, QuadrantIndex.Fourth);

                        context?.strokeRect(newDot.x, newDot.y, 4, 4);
                        return newDot;
                    }
                }

                const newDot: Dot = { x: newX, y: newY, radian: dot.radian, speed: dot.speed };

                context?.strokeRect(newDot.x, newDot.y, 4, 4);

                return newDot;
            });

            setDots(newDots);
        }, secondPerFrame);

        return () => clearTimeout(rendererId);
    }, [canvasElement, dots]);

    return setCanvasElement;
}