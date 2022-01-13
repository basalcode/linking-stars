import type { NextPage } from 'next'
import Link from 'next/link';

const Layout: NextPage = ({ children }) => {
  return (
    <div>
      <header>
        <h1>This is title</h1>
      </header>
      <nav>
        <Link
          href="/"
        >
          <a>This is navigation</a>
        </Link>

      </nav>
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
