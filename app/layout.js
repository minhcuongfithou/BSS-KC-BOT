import './styles/global.css';

export default function RootLayout({ children }) {
    return (
        <html lang="vi">
            <body>
                <main className="container">
                    <header>
                        <h1>Quản lý Bài viết</h1>
                    </header>
                    {children}
                    <footer style={{ marginTop: '4rem' }}>
                        <hr />
                        <p style={{ fontSize: '0.8rem' }}>© 2025 - CRUD App</p>
                    </footer>
                </main>
            </body>
        </html>
    )
}
