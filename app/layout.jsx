import NavLink from './components/NavLink';
import './styles/global.css';
export default function RootLayout({ children, title }) {
    return (
        <html lang="vi">
            <head>
                <title>KC</title>
            </head>
            <body>
                <div className="layout">
                    <aside className="sidebar">
                        <h2 className="logo">KC BOT</h2>
                        <nav>
                            <ul>
                                <NavLink href="/introduction">Introduction</NavLink>
                                <NavLink href="/posts">Solution</NavLink>
                                <NavLink href="/vahu">Vahu</NavLink>
                                <NavLink href="/timeline">Timeline</NavLink>
                            </ul>
                        </nav>
                    </aside>
                    <div className="main">
                        <header className="header">
                            <h1>{title}</h1>
                        </header>
                        <section className="content">
                            {children}
                        </section>
                        <footer className="footer">
                            <p>Please contact cuongnm@bsscommerce.com (っ◕‿◕)っ</p>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
    );
}
