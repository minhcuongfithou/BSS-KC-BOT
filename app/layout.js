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
                                <li><a href="./">Dashboard</a></li>
                                <li><a href="./posts">Solution</a></li>
                                <li><a href="./vahu">Vahu</a></li>
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
                            <p>❤️Made with by KC❤️</p>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
    );
}
