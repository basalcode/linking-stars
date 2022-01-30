import type { NextPage } from 'next'
import { FunctionComponent, ReactNode, useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED = (props: { 
    value: number
}) => {

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

    const currentLedLight = ledLight[props.value];

    const ledLines = useMemo(() => {
        return currentLedLight?.map((isOn, index) => {
            return (
                <div
                    key={index}
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