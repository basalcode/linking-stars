import type { NextPage } from 'next'
import { useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED: NextPage = () => {
    const number = 3;

    const ledLight = [
        [false, true, false, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, true, true, false, true, true, true],
        [false, true, true, false, true, true, true],
        [false, false, true, false, false, true, false],
        [true, false, true, false, true, true, false],
        [true, true, false, false, true, true, true],
        [true, false, false, true, true, true, true],
        [false, true, true, false, false, true, false],
        [true, true, true, true, true, true, true],
        [true, true, true, false, true, true, false],
    ];

    const ledPosition = [
        { x: 0, y: 0, width: 10, height: 2 },
        { x: 0, y: 0, width: 2, height: 10 },
        { x: 10, y: 0, width: 2, height: 10 },
        { x: 0, y: 10, width: 10, height: 2 },
        { x: 0, y: 10, width: 2, height: 10 },
        { x: 10, y: 10, width: 2, height: 10 },
        { x: 0, y: 20, width: 10, height: 2 }
    ]

    const currentLedLight = ledLight[number - 1];

    const ledLines = useMemo(() => {
        return currentLedLight.map((isOn, index) => {
            return (
                <div
                    key={index}
                    style={{
                        top: ledPosition[index].y + 50,
                        left: ledPosition[index].x + 50,
                        width: ledPosition[index].width,
                        height: ledPosition[index].height
                    }}
                    className={`${style.ledLine} ${isOn && style["ledLine--on"]}`}

                ></div>
            );
        });
    }, [number]);

    return (
        <div className={style.numberLED}>
            {ledLines}

        </div>
    );
}

export default NumberLED; 