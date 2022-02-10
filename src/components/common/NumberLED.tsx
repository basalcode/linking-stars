import type { NextPage } from 'next'
import { FunctionComponent, ReactNode, useMemo } from 'react';

import style from './NumberLED.module.scss';

interface Props {
    value: number,
    lineLength: number,
    thickness: number
}

const NumberLED: FunctionComponent<Props> = ({ value, lineLength, thickness }) => {
    const width = lineLength;
    const height = lineLength * 2;
    const centerTop = lineLength - (thickness / 2);

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
    const ledStyle = [
        { top: 0, left: 0, width: thickness, height: lineLength },
        { top: 0, left: 0, width: lineLength, height: thickness },
        { top: 0, right: 0, width: thickness, height: lineLength },
        { top: centerTop, left: 0, width: thickness, height: lineLength },
        { top: centerTop, left: 0, width: lineLength, height: thickness },
        { top: centerTop, right: 0, width: thickness, height: lineLength },
        { bottom: 0, left: 0, width: lineLength, height: thickness },
    ]

    const currentLedLight = ledLight[value];

    const ledLines = useMemo(() => {
        return currentLedLight?.map((isOn, index) => {
            const currentStyle = ledStyle[index];

            return (
                <div
                    style={currentStyle}
                    key={index}
                    className={`${style.ledLine} ${isOn && style["ledLine--on"]}`}
                ></div>
            );
        });
    }, [value]);

    return (
        <div
            style={{
                width: width,
                height: height
            }}
            className={style.numberLED}
        >
            {ledLines}
        </div>
    );
}

export default NumberLED; 