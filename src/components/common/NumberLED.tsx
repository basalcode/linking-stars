import type { NextPage } from 'next'
import { FunctionComponent, ReactNode, useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED = (props: { value: number, x: number, y: number, width: number, height: number, thickness: number }) => {
    const leftTop = { x: props.x, y: props.y };
    const rightTop = { x: props.x + props.width - props.thickness, y: props.y }
    const leftCenter = { x: props.x, y: (props.y - props.height) / props.thickness }
    const rightCenter = { x: props.x + props.width - props.thickness, y: props.y - props.thickness }
    const leftBottom = { x: props.x, y: props.height - props.thickness }

    const ledLight = [
        [true, true, true, true, false, true, true],
        [false, false, true, false, false, true, false],
        [false, true, true, true, true, false, true],
        [false, true, true, false, true, true, true],
        [true, false, true, false, true, true, false],
        [true, true, false, false, true, true, true],
        [true, false, false, true, true, true, true],
        [false, true, true, false, false, true, false],
        [true, true, true, true, true, true, true],
        [true, true, true, false, true, true, false]
    ];

    const ledPosition = [
        { x: leftTop.x, y: leftTop.y, width: props.thickness, height: props.height },
        { x: leftTop.x, y: leftTop.y, width: props.height, height: props.thickness },
        { x: rightTop.x, y: rightTop.y, width: props.thickness, height: props.height },
        { x: leftCenter.x, y: leftCenter.y, width: props.thickness, height: props.height },
        { x: leftCenter.x, y: leftCenter.y, width: props.height, height: props.thickness },
        { x: rightCenter.x, y: rightCenter.y, width: props.thickness, height: props.height },
        { x: leftBottom.x, y: leftBottom.y, width: props.height, height: props.thickness }
    ]

    const currentLedLight = ledLight[props.value];

    const ledLines = useMemo(() => {
        return currentLedLight?.map((isOn, index) => {
            return (
                <div
                    key={index}
                    style={{
                        top: ledPosition[index].y,
                        left: ledPosition[index].x,
                        width: ledPosition[index].width,
                        height: ledPosition[index].height
                    }}
                    className={`${style.ledLine} ${isOn && style["ledLine--on"]}`}
                ></div>
            );
        });
    }, [props.value]);

    return (
        <div className={style.numberLED}>
            {ledLines}
        </div>
    );
}

export default NumberLED; 