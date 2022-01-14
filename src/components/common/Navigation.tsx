import type { NextPage } from 'next'
import Link from 'next/link';

const Navigation: NextPage = () => {
    return (
        <nav>
            <Link
                href="/"
            >
                <a>Home</a>
            </Link>
            <Link
                href="/clock"
            >
                <a>Clock</a>
            </Link>
        </nav>
    );
}

export default Navigation;
