'use client'
import '@/app/styles/google-button.css'
import { signIn } from "next-auth/react";
import '@/app/styles/login.css';

export default function LoginPage() {
    return (
        <div className="container-login">
            <div>
                <h1 style={{ marginBottom: '1.5rem' }}>Chọn phương thức đăng nhập</h1>
                <button className="google-login-btn" onClick={() => signIn('google')}>
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google logo"
                        className="google-icon"
                    />
                    <span>Sign in with Google</span>
                </button>
            </div>
        </div >
    )
}
