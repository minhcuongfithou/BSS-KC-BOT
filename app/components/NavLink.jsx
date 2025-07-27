'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children }) {
    const pathname = usePathname();

    const isActive = ((href === '/' && pathname === '/')
        || (href.startsWith('/posts') && pathname.startsWith('/posts'))
        || (href.startsWith('/auto') && pathname.startsWith('/auto'))
        || (href === '/timeline' && pathname === '/timeline')
    );
    return (
        <li>
            <Link
                href={href}
                className={isActive ? 'nav-link active' : 'nav-link'}
            >
                {children}
            </Link>
        </li>
    );
}
