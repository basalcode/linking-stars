import type { NextPage } from 'next'
import { useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED: NextPage = () => {
    const number = 2;

    const ledLight = [
        [true, true, true, true, false, true, true],
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

    const currentLedLight = ledLight[number - 1];

    const ledLines = useMemo(() => {
        return currentLedLight.map((isOn, index) => {

            return (
                <div
                    key={index}
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