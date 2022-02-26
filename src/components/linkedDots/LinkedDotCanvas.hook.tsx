import { useEffect, useState } from 'react';

export interface Dot {
    x: number,
    y: number,
    width: number,
    height: number,
    radian: number,
    speed: number
}

enum BoundaryIndex {
    Bottom = 0,
    Left,
    Top,
    Right
}

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

const moveQuadrantIndex = (currentQuadrantIndex: number, movement: number) => {
    const quadrantAmount: number = 4;

    return (quadrantAmount + (currentQuadrantIndex + movement)) % quadrantAmount;
}

const getOverflowedRadian = (radian: number) => {
    return radian % (Math.PI / 2);
}

const getReflexedDot = (currentDot: Dot, boundaryIndex: number): Dot => {
    const originalQuadrantIndex: number = getQuadrantIndex(currentDot.radian);
    const reflectedQuadrantIndex = getReflectedQuadrantIndex(originalQuadrantIndex, boundaryIndex);

    const reflectedRadian = getQuadrantMinRadian(reflectedQuadrantIndex) + ((Math.PI / 2) - getOverflowedRadian(currentDot.radian));

    const reflectedMovementX: number = Math.cos(reflectedRadian) * currentDot.speed;
    const reflectedMovementY: number = Math.sin(reflectedRadian) * currentDot.speed;

    let reflectedX: number = currentDot.x + reflectedMovementX;
    let reflectedY: number = currentDot.y + reflectedMovementY;

    const newDot: Dot = {
        ...currentDot,
        x: reflectedX,
        y: reflectedY,
        radian: reflectedRadian
    }

    return newDot;
}

const initializeDot = (canvasWidth: number, canvasHeight: number, pointWidth: number, pointHeight: number): Dot => {
    const x: number = Math.floor(Math.random() * (canvasWidth - pointWidth));
    const y: number = Math.floor(Math.random() * (canvasHeight - pointHeight));
    const radian: number = Math.random() * (Math.PI * 2);
    const speed: number = 1;

    const dot: Dot = {
        x: x,
        y: y,
        width: pointWidth,
        height: pointHeight,
        radian: radian,
        speed: speed
    }

    return dot;
}

const getOverflowBoundsIndex = (newDot: Dot, canvasElement: HTMLCanvasElement): number => {
    const { x, y, width, height } = newDot;
    const canvasWidth: number = canvasElement.width;
    const canvasHeight: number = canvasElement.height;

    const isTopOutOfBounds: boolean = y < 0;
    if (isTopOutOfBounds) return BoundaryIndex.Top;

    const isLeftOutOfBounds: boolean = x < 0;
    if (isLeftOutOfBounds) return BoundaryIndex.Left

    const isBottomOutOfBounds: boolean = y + height > canvasHeight;
    if (isBottomOutOfBounds) return BoundaryIndex.Bottom

    const isRightOutOfBounds: boolean = x + width > canvasWidth;
    if (isRightOutOfBounds) return BoundaryIndex.Right

    const isNotOverflowed = -1;
    return isNotOverflowed;
}

export const useLinkedDotAnimation = (pointAmount: number, pointWidth: number, pointHeight: number, framePerSecond: number) => {
    const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>();
    const [dots, setDots] = useState<Array<Dot> | null>(null);

    useEffect(() => {
        if (!canvasElement) return;

        const canvasWidth: number = canvasElement.width;
        const cavnasHeight: number = canvasElement.height;

        if (!dots) {
            const initializer = Array<number>(pointAmount).fill(0);
            const initializedDots = initializer.map((_) => {
                const initializedDot = initializeDot(canvasWidth, cavnasHeight, pointWidth, pointHeight);
                return initializedDot;
            });

            return setDots(initializedDots);
        }

        const context = canvasElement.getContext('2d') as CanvasRenderingContext2D;
        const secondUnit: number = 1000;
        const secondPerFrame: number = secondUnit / framePerSecond;
        const rendererId = setTimeout(() => {
            context.clearRect(0, 0, canvasWidth, cavnasHeight);

            const newDots = dots.map((dot: Dot) => {
                const movementX: number = Math.cos(dot.radian) * dot.speed;
                const movementY: number = Math.sin(dot.radian) * dot.speed;

                const newX: number = dot.x + movementX;
                const newY: number = dot.y + movementY;

                let newDot: Dot = {
                    ...dot,
                    x: newX,
                    y: newY
                }

                const overflowedBoundIndex: number = getOverflowBoundsIndex(newDot, canvasElement);
                const isOverflowed: boolean = overflowedBoundIndex !== -1;

                if (isOverflowed) {
                    newDot = getReflexedDot(dot, overflowedBoundIndex);
                }

                context.strokeRect(newDot.x, newDot.y, newDot.width, newDot.height);

                return newDot;
            });

            setDots(newDots);
        }, secondPerFrame);

        return () => clearTimeout(rendererId);
    }, [canvasElement, dots]);

    return setCanvasElement;
}