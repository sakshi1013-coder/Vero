'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    TrendingUp,
    Search,
    PlusCircle,
    ShieldAlert,
    Activity,
    Users,
    Settings,
    Menu
} from 'lucide-react';

const NAV_ITEMS = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Trends & Analytics', href: '/trends', icon: TrendingUp },
    { name: 'Submit Claim', href: '/submit', icon: PlusCircle },
    { name: 'Search Knowledge', href: '/search', icon: Search },
    { name: 'Alerts', href: '/alerts', icon: ShieldAlert },
    { name: 'Human Review', href: '/human-review', icon: Users },
    { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    left: '1rem',
                    zIndex: 60,
                    padding: '0.5rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    display: 'none', // Hidden on desktop via CSS
                }}
            >
                <Menu size={24} />
            </button>

            <aside className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-container">
                        <div className="logo-icon">V</div>
                        <div className="logo-text">
                            <h1>VERO</h1>
                            <span>TRUTH GUARDIAN</span>
                        </div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{item.name}</span>
                                {isActive && <div className="active-indicator" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">A</div>
                        <div className="user-info">
                            <div className="name">Admin User</div>
                            <div className="role">Level 3 Access</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
