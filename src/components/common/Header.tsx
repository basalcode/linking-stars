import type { NextPage } from 'next'
import { FunctionComponent } from 'react';

import style from './Header.module.scss';

interface Props {
    children?: HTMLElement
}

const Header: FunctionComponent<Props> = ({ children }) => {
    return (
        <header
            className={style.header}
        >
            <h1>
                Wall Paper
            </h1>
        </header>
    );
}

export default Header;
