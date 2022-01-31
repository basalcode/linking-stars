import type { NextPage } from 'next'
import { FunctionComponent, ReactNode, useMemo } from 'react';

import style from './NumberLED.module.scss';

const NumberLED = (props: { 
    value: number,
    lineLength: number,
    thickness: number,
}) => {
    const width = props.lineLength;
    const height = props.lineLength * 2;
    const centerTop = props.lineLength - (props.thickness / 2);

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
        { top: 0, left: 0, width: props.thickness, height: props.lineLength },
        { top: 0, left: 0, width: props.lineLength, height: props.thickness },
        { top: 0, right: 0, width: props.thickness, height: props.lineLength },
        { top: centerTop, left: 0, width: props.thickness, height: props.lineLength },
        { top: centerTop, left: 0, width: props.lineLength, height: props.thickness },
        { top: centerTop, right: 0, width: props.thickness, height: props.lineLength },
        { bottom: 0, left: 0, width: props.lineLength, height: props.thickness },
    ]    

    const currentLedLight = ledLight[props.value];

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
    }, [props.value]);

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