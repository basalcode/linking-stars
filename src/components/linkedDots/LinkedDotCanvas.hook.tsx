/* packages */
import { useEffect, useState } from 'react';

/* types */
import { CanvasSize, DotSize } from './LinkedDotCanvas';

// interfaces
export interface Dot {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    radian: number,
    speedPerFrame: number
}

export interface Position {
    x: number,
    y: number
}

interface ReflectionChecker {
    reflectedX: number,
    reflectedY: number,
    boundaryIndex: number
}

// enums
export enum BoundaryIndex {
    Bottom = 0,
    Left,
    Top,
    Right
}

// functions
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

const moveQuadrantIndex = (currentQuadrantIndex: number, movement: number): number => {
    const quadrantAmount: number = 4;

    return (quadrantAmount + (currentQuadrantIndex + movement)) % quadrantAmount;
}

const getOverflowedRadian = (radian: number): number => {
    return radian % (Math.PI / 2);
}

const getReflexedDot = (currentDot: Dot, reflectionChecker: ReflectionChecker): Dot => {
    const { radian } = currentDot;
    const { reflectedX, reflectedY, boundaryIndex } = reflectionChecker;

    const originalQuadrantIndex: number = getQuadrantIndex(radian);
    const reflectedQuadrantIndex = getReflectedQuadrantIndex(originalQuadrantIndex, boundaryIndex);

    const reflectedRadian = getQuadrantMinRadian(reflectedQuadrantIndex) + ((Math.PI / 2) - getOverflowedRadian(radian));

    if (reflectionChecker.boundaryIndex === BoundaryIndex.Bottom) {
        console.log("reflectedX", reflectedX);
        console.log("reflectedY", reflectedY);
    }

    const newDot: Dot = {
        ...currentDot,
        x: reflectedX,
        y: reflectedY,
        radian: reflectedRadian
    }

    return newDot;
}

const initializeDot = (canvasSize: CanvasSize, dotSize: DotSize, id: number, speedPerFrame: number): Dot => {
    const { width: canvasWidth, height: canvasHeight } = canvasSize;
    const { width: dotWidth, height: dotHeight } = dotSize;

    const x: number = Math.floor(Math.random() * (canvasWidth - dotWidth));
    const y: number = Math.floor(Math.random() * (canvasHeight - dotHeight));
    const radian: number = Math.random() * (Math.PI * 2);

    const dot: Dot = {
        id: id,
        x: x,
        y: y,
        width: dotWidth,
        height: dotHeight,
        radian: radian,
        speedPerFrame: speedPerFrame
    }

    return dot;
}

const getBinarySearchedIndex = (sortedDots: Array<Dot>, insertionCoodinate: number): number => {
    let startIndex: number = 0;
    let finishIndex: number = sortedDots.length - 1;
    let insertIndex: number = - 1;

    while (true) {
        const isReversedSequence: boolean = startIndex > finishIndex;
        if (isReversedSequence) {
            insertIndex = startIndex;
            break;
        }

        const range: number = finishIndex - startIndex;
        const centerIndex: number = Math.floor(startIndex + range / 2);
        const centerElement: Dot = sortedDots[centerIndex];
        const centerCooridnate: number = centerElement.x;

        const isSearchDirectionForward: boolean = insertionCoodinate < centerCooridnate;
        const isSearchDirectionBackward: boolean = insertionCoodinate > centerCooridnate;
        const isSameAsCenterVlaue: boolean = insertionCoodinate === centerCooridnate;

        if (isSameAsCenterVlaue) {
            insertIndex = centerIndex;
            break;
        }

        if (isSearchDirectionForward) {
            finishIndex = centerIndex - 1;
            continue;
        };
        if (isSearchDirectionBackward) {
            startIndex = centerIndex + 1;
            continue;
        }
    }

    return insertIndex;
}

const getReflectionChecker = (newDot: Dot, canvasSize: CanvasSize): ReflectionChecker => {
    const { x, y, width, height }: Dot = newDot;
    const { width: canvasWidth, height: canvasHeight } = canvasSize;

    const overflowValidator: ReflectionChecker = {
        reflectedX: 0,
        reflectedY: 0,
        boundaryIndex: -1
    }

    const isTopOutOfBounds: boolean = y < 0;
    if (isTopOutOfBounds) {
        return {
            ...overflowValidator,
            reflectedX: x,
            reflectedY: -y,
            boundaryIndex: BoundaryIndex.Top
        };
    }

    const isLeftOutOfBounds: boolean = x < 0;
    if (isLeftOutOfBounds) {
        return {
            ...overflowValidator,
            reflectedX: -x,
            reflectedY: y,
            boundaryIndex: BoundaryIndex.Left
        };
    }

    const dotBottomY: number = y + height;
    const isBottomOutOfBounds: boolean = dotBottomY > canvasHeight;
    if (isBottomOutOfBounds) {
        const overflowedY: number = dotBottomY - canvasHeight;
        const reflectedY: number = canvasHeight - overflowedY - height;

        console.log("canvasHeight", canvasHeight);
        console.log("dotBottomY", dotBottomY);

        return {
            ...overflowValidator,
            reflectedX: x,
            reflectedY: reflectedY,
            boundaryIndex: BoundaryIndex.Bottom
        };
    }

    const dotRightX: number = x + width;
    const isRightOutOfBounds: boolean = dotRightX > canvasWidth;
    if (isRightOutOfBounds) {
        const overflowedX: number = dotRightX - canvasWidth;
        const reflectedX: number = canvasWidth - overflowedX - width;

        return {
            ...overflowValidator,
            reflectedX: reflectedX,
            reflectedY: y,
            boundaryIndex: BoundaryIndex.Right
        };
    }

    const isNotOverflowed: number = -1;
    return {
        ...overflowValidator,
        boundaryIndex: isNotOverflowed
    };
}

const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

const getCenterCoordinate = (coordinate: number, size: number): number => {
    return coordinate + (size / 2);
}

const drawFrame = (context: CanvasRenderingContext2D, dots: Array<Dot>, canvasSize: CanvasSize, linkingRadius: number): Array<Dot> => {
    const { width: canvasWidth, height: cavnasHeight } = canvasSize;

    context.clearRect(0, 0, canvasWidth, cavnasHeight);

    const newDots = dots.map((dot: Dot) => {
        const { x, y, radian } = dot;

        const movementX: number = Math.cos(radian) * dot.speedPerFrame;
        const movementY: number = Math.sin(radian) * dot.speedPerFrame;

        const newX: number = x + movementX;
        const newY: number = y + movementY;

        let newDot: Dot = {
            ...dot,
            x: newX,
            y: newY,
        }

        const reflectionChecker: ReflectionChecker = getReflectionChecker(newDot, canvasSize);
        const isOverflowed: boolean = reflectionChecker.boundaryIndex !== -1;

        if (isOverflowed) newDot = getReflexedDot(newDot, reflectionChecker);

        context.strokeStyle = `rgb(255, 255, 255)`;
        context.strokeRect(newDot.x, newDot.y, newDot.width, newDot.height);

        return newDot;
    });

    const sortedNewDots: Array<Dot> = newDots.sort((target: Dot, next: Dot): number => { return target.x - next.x });

    sortedNewDots.forEach((standardDot: Dot, index: number): void => {
        const { x, y, width, height } = standardDot;

        const centerX: number = getCenterCoordinate(x, width);
        const centerY: number = getCenterCoordinate(y, height);

        const filterEndRange: number = centerX + linkingRadius;
        const filterEndPositionX: number = filterEndRange > canvasWidth ? canvasWidth : filterEndRange;

        const filterStartIndex: number = index;
        const filteredFinishIndex: number = getBinarySearchedIndex(sortedNewDots, filterEndPositionX);

        for (let index = filterStartIndex; index < filteredFinishIndex; index++) {
            const filteredDot: Dot = sortedNewDots[index];
            const { x: filteredX, y: filteredY, width: filteredWidth, height: filteredHeight } = filteredDot;

            const filteredCenterX: number = getCenterCoordinate(filteredX, filteredWidth);
            const filteredCenterY: number = getCenterCoordinate(filteredY, filteredHeight);

            const distance: number = getDistance(centerX, centerY, filteredCenterX, filteredCenterY);
            const isInsideRange: boolean = distance <= linkingRadius;

            if (isInsideRange) {
                const maximumOpacity: number = 0.8;
                const opacity: number = maximumOpacity - (distance / linkingRadius);
                context.strokeStyle = `rgba(255, 255, 255, ${opacity})`;

                context.beginPath();
                context.moveTo(centerX, centerY);
                context.lineTo(filteredCenterX, filteredCenterY);
                context.stroke();
            }
        }
    });

    return sortedNewDots;
}

const getInitializedDots = (dotAmount: number, canvasSize: CanvasSize, dotSize: DotSize, speedPerFrame: number): Array<Dot> => {
    const initializer = Array<number>(dotAmount).fill(0);

    const initializedDots: Array<Dot> = initializer.map((_, index): Dot => {
        const { width: cavnasWidth, height: cavnasHeight } = canvasSize;
        const { width: dotWidth, height: dotHeight } = dotSize;

        const dotId: number = index;
        const initializedDot: Dot = initializeDot(canvasSize, dotSize, dotId, speedPerFrame);

        return initializedDot;
    });

    const sortedInitializedDots: Array<Dot> = initializedDots.sort((target: Dot, next: Dot): number => { return target.x - next.x; });

    return sortedInitializedDots;
}

export const useLinkedDotAnimation = (context: CanvasRenderingContext2D | null, dotAmount: number, canvasSize: CanvasSize | undefined, dotSize: DotSize, linkingRadius: number, framePerSecond: number, speedPerSecond: number, dotColor: string, lineColor: string) => {
    const [dots, setDots] = useState<Array<Dot> | null>(null);

    const secondUnit: number = 1000;
    const secondPerFrame: number = secondUnit / framePerSecond;
    const speedPerFrame: number = speedPerSecond / framePerSecond;

    useEffect(() => {
        if (!context) return;
        if (!canvasSize) return;

        if (!dots) {
            const initializedDots: Array<Dot> = getInitializedDots(dotAmount, canvasSize, dotSize, speedPerFrame);

            return setDots(initializedDots);
        }

        const rendererId = setTimeout(() => {
            const newDots: Array<Dot> = drawFrame(context, dots, canvasSize, linkingRadius);

            setDots(newDots);
        }, secondPerFrame);

        return () => clearTimeout(rendererId);
    }, [context, dots, canvasSize]);
}