'use client'

import '@/app/styles/introduction.css';

import { useUser } from '@/app/context/UserContext';

export default function MainPage() {
    const session = useUser();
    return (
        <div className="container">
            <h1><span className="wave-hand">👋</span> Welcome, {session?.user?.name?.split(' ')?.[0]} </h1>
            <div className="intro-box">
                <h1>Introduction to the Technical Support System</h1>
                <div className="intro-desc">
                    <p>This application is developed to assist the DEV and CSE teams in handling daily support tasks efficiently.</p>
                </div>

                <div className="features">
                    <div className="feature">
                        <strong>Solution Feature</strong>
                        <span>Provides detailed guidance from experienced developers.</span>
                    </div>
                    <div className="feature">
                        <strong>Automatic Feature</strong>
                        <span>Performs simple operations such as adding confirm password fields, enabling multi-language support, and more.</span>
                    </div>
                </div>
                <div className="footer-introduction">
                    <a className="btn btn-sm btn-primary" href="/posts">Start with Solution</a>
                    <a className="btn btn-sm btn-success" href="/auto">Start with Automatic</a>
                </div>
            </div>
        </div>
    );
}
