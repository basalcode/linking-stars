import { useEffect, useState } from 'react';

// interfaces
export interface Dot {
    id: number,
    x: number,
    y: number,
    width: number,
    height: number,
    radian: number,
    speed: number
}

interface Coordinate {
    id: number,
    coordinate: number
}

interface SortedDotPosition {
    sortedXs: Array<Coordinate>,
    sortedYs: Array<Coordinate>
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

const initializeDot = (canvasWidth: number, canvasHeight: number, pointWidth: number, pointHeight: number, id: number): Dot => {
    const x: number = Math.floor(Math.random() * (canvasWidth - pointWidth));
    const y: number = Math.floor(Math.random() * (canvasHeight - pointHeight));
    const radian: number = Math.random() * (Math.PI * 2);
    const speed: number = 1;

    const dot: Dot = {
        id: id,
        x: x,
        y: y,
        width: pointWidth,
        height: pointHeight,
        radian: radian,
        speed: speed
    }

    return dot;
}

const insertValue = (sortedArray: Array<Coordinate>, element: Coordinate): Array<Coordinate> => {
    let startIndex: number = 0;
    let finishIndex: number = sortedArray.length - 1;
    let insertIndex: number = - 1;

    const insertionCoodinate: number = element.coordinate;

    while (true) {
        const isReversedSequence = startIndex > finishIndex;
        if (isReversedSequence) {
            insertIndex = finishIndex;
            break;
        }

        const range: number = finishIndex - startIndex;
        const centerIndex: number = startIndex + range / 2;
        const centerElement: Coordinate = sortedArray[centerIndex];
        const centerCooridnate: number = centerElement.coordinate;

        const isSearchDirectionForward: boolean = insertionCoodinate < centerCooridnate;
        const isSearchDirectionBackward: boolean = insertionCoodinate < centerCooridnate;
        const isSameAsCenterVlaue: boolean = insertionCoodinate === centerCooridnate;

        if (isSameAsCenterVlaue) {
            insertIndex = centerIndex;
            break;
        }

        if (isSearchDirectionForward) {
            finishIndex = centerIndex - 1
            continue;
        };
        if (isSearchDirectionBackward) {
            startIndex = centerIndex + 1;
            continue;
        }
    }

    const newSortedArray = sortedArray.slice();
    newSortedArray.splice(insertIndex, 0, element);

    return newSortedArray;
}

const getSortedCoordinates = (sortedCoordinates: Array<Coordinate>, id: number, coordinate: number): Array<Coordinate> => {
    // const dotId: number = dot.id;

    // const dotId: number = dot.id;
    // const dotX: number = dot.x;
    // const dotY: number = dot.y;

    const coordinatesElement: Coordinate = { id: id, coordinate: coordinate };

    insertValue(sortedCoordinates, coordinatesElement);

    // const x: Coordinate = { id: dotId, coordinate: dotX }
    // const y: Coordinate = { id: dotId, coordinate: dotY }

    // const sortedXs: Array<Coordinate> = [...sortedDotCoordinate.sortedXs];
    // const sortedYs: Array<Coordinate> = [...sortedDotCoordinate.sortedYs];

    // const newSortedXs = insertValue(sortedXs, x);
    // const newSortedYs = insertValue(sortedYs, y);

    // return {
    //     sortedXs: newSortedXs,
    //     sortedYs: newSortedYs
    // }
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
    const [sortedDotCoordinate, setSortedDotCoordinate] = useState<SortedDotPosition>({ sortedXs: [], sortedYs: [] });

    useEffect(() => {
        console.log("sortedDotCoordinate", sortedDotCoordinate);
    }, [sortedDotCoordinate]);

    useEffect(() => {
        if (!canvasElement) return;

        const canvasWidth: number = canvasElement.width;
        const cavnasHeight: number = canvasElement.height;

        if (!dots) {
            const initializer = Array<number>(pointAmount).fill(0);

            // let newSortedDotCoordinate = JSON.parse(JSON.stringify(sortedDotCoordinate));

            const initializedDots = initializer.map((_, index) => {
                const dotId = index;
                const initializedDot = initializeDot(canvasWidth, cavnasHeight, pointWidth, pointHeight, dotId);

                // newSortedDotCoordinate = getSortedDotCoordinate(newSortedDotCoordinate, initializedDot);

                return initializedDot;
            });

            setSortedDotCoordinate(newSortedDotCoordinate);

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