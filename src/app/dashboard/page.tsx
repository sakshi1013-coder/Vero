'use client';

import { useState, useEffect } from 'react';
import './dashboard.css';

interface ClaimStat {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
}

interface RecentClaim {
    id: string;
    text: string;
    status: 'verified' | 'false' | 'unverified';
    timestamp: string;
    confidence: number;
}

export default function Dashboard() {
    const [stats, setStats] = useState<ClaimStat[]>([
        { label: 'Total Claims Verified', value: '1,247', trend: '+12%', trendUp: true },
        { label: 'False Claims Detected', value: '89', trend: '-8%', trendUp: false },
        { label: 'Pending Review', value: '34', trend: '+5%', trendUp: true },
        { label: 'Accuracy Rate', value: '94.2%', trend: '+2.1%', trendUp: true },
    ]);

    const [recentClaims, setRecentClaims] = useState<RecentClaim[]>([
        {
            id: '1',
            text: 'Climate change is causing increased frequency of extreme weather events',
            status: 'verified',
            timestamp: '2 hours ago',
            confidence: 92
        },
        {
            id: '2',
            text: 'New vaccine shows 100% effectiveness in trials',
            status: 'false',
            timestamp: '4 hours ago',
            confidence: 15
        },
        {
            id: '3',
            text: 'Stock market reached all-time high yesterday',
            status: 'verified',
            timestamp: '6 hours ago',
            confidence: 88
        },
        {
            id: '4',
            text: 'AI will replace all jobs by 2025',
            status: 'false',
            timestamp: '8 hours ago',
            confidence: 12
        },
    ]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">Dashboard</h1>
                    <p className="dashboard-subtitle">Real-time claim verification overview</p>
                </div>
                <div className="header-actions">
                    <button className="refresh-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                        </svg>
                        Refresh
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <div className="stat-header">
                            <span className="stat-label">{stat.label}</span>
                            <span className={`stat-trend ${stat.trendUp ? 'trend-up' : 'trend-down'}`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Activity Chart */}
            <div className="chart-section">
                <div className="chart-card">
                    <div className="chart-header">
                        <h2>Verification Activity</h2>
                        <select className="time-filter">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div className="chart-placeholder">
                        <div className="chart-bars">
                            {[65, 45, 78, 52, 88, 72, 95].map((height, i) => (
                                <div key={i} className="chart-bar-wrapper">
                                    <div className="chart-bar" style={{ height: `${height}%` }}></div>
                                    <span className="chart-label">Day {i + 1}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Claims */}
            <div className="recent-section">
                <div className="section-header">
                    <h2>Recent Claims</h2>
                    <a href="/claim" className="view-all-link">View all →</a>
                </div>
                <div className="claims-list">
                    {recentClaims.map((claim) => (
                        <div key={claim.id} className="claim-item">
                            <div className="claim-content">
                                <div className="claim-text">{claim.text}</div>
                                <div className="claim-meta">
                                    <span className={`claim-status status-${claim.status}`}>
                                        {claim.status === 'verified' ? '✓ Verified' :
                                            claim.status === 'false' ? '✗ False' : '⊙ Unverified'}
                                    </span>
                                    <span className="claim-time">{claim.timestamp}</span>
                                    <span className="claim-confidence">
                                        Confidence: {claim.confidence}%
                                    </span>
                                </div>
                            </div>
                            <div className="claim-actions">
                                <button className="action-btn">View Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
