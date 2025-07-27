'use client'
import { signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react'
import '@/app/styles/user-dropdown.css'
import Image from 'next/image';

export default function UserDropdown({ user }) {
    const [open, setOpen] = useState(false)
    const dropdownRef = useRef()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!user) return <></>
    return (
        <div className="user-dropdown" ref={dropdownRef}>
            <button className="user-btn" onClick={() => setOpen(!open)}>
                <Image
                    src={user.image}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="avatar"
                />
                <span className="username">{user.name}</span>
                <span className="arrow">{open ? '▲' : '▼'}</span>
            </button>

            {open && (
                <div className="dropdown-menu">
                    <p className="user-email">{user.email}</p>
                    <button className="logout-btn" onClick={() => signOut()}>
                        Đăng xuất
                    </button>
                </div>
            )}
        </div>
    )
}
