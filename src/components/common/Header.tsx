import type { NextPage } from 'next'

import style from './Header.module.scss';

const Header: NextPage = ({ children }) => {
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
