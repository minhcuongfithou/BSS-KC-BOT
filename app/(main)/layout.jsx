import '@/app/styles/global.css';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from 'next-auth/react';
import NavLink from '@/app/components/NavLink';
import UserDropdown from '@/app/components/UserDropdown'
import UserProvider from '../context/UserProvider';
import Script from 'next/script';

export default async function RootLayout({ children, title }) {
    const session = await auth();
    if (!session?.user) {
        return redirect("/login");
    }

    return (
        <html lang="vi">
            <head>
                <title>KC</title>
                <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap" rel="stylesheet"></link>
            </head>
            <body>
                <div className="layout">
                    <aside className="sidebar">
                        <img className="logo" src="/images/logo.png"></img>
                        <nav>
                            <ul>
                                <NavLink href="/">Introduction</NavLink>
                                <NavLink href="/posts">Solution</NavLink>
                                <NavLink href="/auto">Automatic</NavLink>
                                <NavLink href="/timeline">Timeline</NavLink>
                            </ul>
                        </nav>
                    </aside>
                    <div className="main">
                        <header>
                            <UserDropdown user={session?.user} />
                        </header>
                        <section className="content">
                            <UserProvider session={session}>{children}</UserProvider>
                            <button id="scrollTopBtn" aria-label="Scroll to top" style={{
                                position: 'fixed',
                                bottom: '20px',
                                right: '20px',
                                background: 'white',
                                border: '1px solid #ccc',
                                borderRadius: '50%',
                                padding: '10px',
                                cursor: 'pointer',
                                display: 'none',
                                zIndex: 999,
                                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" width="20" height="20">
                                    <polyline points="18 15 12 9 6 15" />
                                </svg>
                            </button>

                            <Script id="scroll-top-script" strategy="afterInteractive">
                                {`
          const btn = document.getElementById('scrollTopBtn');
          window.addEventListener('scroll', () => {
            if (window.scrollY > 200) {
              btn.style.display = 'flex';
            } else {
              btn.style.display = 'none';
            }
          });
          btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
        `}
                            </Script>
                        </section>
                        <footer className="footer">
                            <p>Please contact <a className="mailTo" href="mailto:cuongnm@bsscommerce.com">cuongnm@bsscommerce.com</a> (っ◕‿◕)っ</p>
                        </footer>
                    </div>
                </div>
            </body>
        </html>
    );
}