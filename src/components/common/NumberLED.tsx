import type { NextPage } from 'next'

import style from './NumberLED.module.scss';

const NumberLED: NextPage = () => {
    const ledLight: object = {
        one: [false, false, true, false, false, true, false],
        two: [false, false, true, false, false, true, false],
        three: [false, false, true, false, false, true, false],
        four: [false, false, true, false, false, true, false],
        five: [false, false, true, false, false, true, false],
        six: [false, false, true, false, false, true, false],
        seven: [false, false, true, false, false, true, false],
        eight: [false, false, true, false, false, true, false],
        nine: [false, false, true, false, false, true, false]
    }

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