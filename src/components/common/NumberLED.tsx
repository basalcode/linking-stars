import type { NextPage } from 'next'

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

    return (
        <div className={style.numberLED}>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
            <div className={`${style.ledLine} ${style["ledLine--on"]}`}></div>
        </div>
    );
}

export default NumberLED; 