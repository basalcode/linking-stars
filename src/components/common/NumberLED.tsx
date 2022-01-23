import type { NextPage } from 'next'
import { useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED: NextPage = (props: object) => {
    const number = 1;
    const ledLight = [
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false],
        [false, false, true, false, false, true, false]
    ];

    const currentLedLight = ledLight[number - 1];

    const ledLines = useMemo(() => {
        return currentLedLight.map((isOn, index) => {
            <div
                key={index}
                className={`${style.ledLine} ${isOn && style["ledLine--on"]}`}
            ></div>
        });
    }, [number]);

    return (
        <div className={style.numberLED}>
            {ledLines}
        </div>
    );
}

export default NumberLED; 