'use client';

import { useState } from 'react';
import './trends.css';

interface TrendingTopic {
    id: string;
    topic: string;
    claims: number;
    verificationRate: number;
    trend: 'rising' | 'falling' | 'stable';
    category: string;
}

export default function TrendsAnalytics() {
    const [timeRange, setTimeRange] = useState('7d');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const trendingTopics: TrendingTopic[] = [
        { id: '1', topic: 'Climate Change', claims: 1247, verificationRate: 87, trend: 'rising', category: 'Environment' },
        { id: '2', topic: 'AI Technology', claims: 892, verificationRate: 72, trend: 'rising', category: 'Technology' },
        { id: '3', topic: 'Healthcare', claims: 654, verificationRate: 91, trend: 'stable', category: 'Health' },
        { id: '4', topic: 'Politics', claims: 543, verificationRate: 65, trend: 'falling', category: 'Politics' },
        { id: '5', topic: 'Economy', claims: 421, verificationRate: 78, trend: 'rising', category: 'Finance' },
        { id: '6', topic: 'Space Exploration', claims: 312, verificationRate: 94, trend: 'stable', category: 'Science' },
    ];

    const categories = ['all', 'Environment', 'Technology', 'Health', 'Politics', 'Finance', 'Science'];

    const filteredTopics = selectedCategory === 'all'
        ? trendingTopics
        : trendingTopics.filter(t => t.category === selectedCategory);

    return (
        <div className="trends-container">
            <div className="trends-header">
                <div>
                    <h1 className="trends-title">Trends & Analytics</h1>
                    <p className="trends-subtitle">Discover patterns and insights from claim verification data</p>
                </div>
                <div className="header-controls">
                    <select
                        className="time-range-select"
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                    >
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                        </svg>
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Trending Topics</div>
                        <div className="metric-value">247</div>
                        <div className="metric-change positive">+18% from last period</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #00ff88 0%, #00cc66 100%)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Avg. Verification Rate</div>
                        <div className="metric-value">81.4%</div>
                        <div className="metric-change positive">+3.2% from last period</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #ff00ff 0%, #cc00cc 100%)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Active Users</div>
                        <div className="metric-value">12.4K</div>
                        <div className="metric-change positive">+24% from last period</div>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon" style={{ background: 'linear-gradient(135deg, #ffaa00 0%, #ff8800 100%)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="1" x2="12" y2="23" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                    </div>
                    <div className="metric-content">
                        <div className="metric-label">Misinformation Detected</div>
                        <div className="metric-value">342</div>
                        <div className="metric-change negative">-12% from last period</div>
                    </div>
                </div>
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                <h3>Filter by Category</h3>
                <div className="category-pills">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat === 'all' ? 'All Categories' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Trending Topics */}
            <div className="trending-section">
                <h2>Trending Topics</h2>
                <div className="topics-grid">
                    {filteredTopics.map((topic) => (
                        <div key={topic.id} className="topic-card">
                            <div className="topic-header">
                                <div>
                                    <h3 className="topic-name">{topic.topic}</h3>
                                    <span className="topic-category">{topic.category}</span>
                                </div>
                                <div className={`trend-indicator trend-${topic.trend}`}>
                                    {topic.trend === 'rising' && '↗'}
                                    {topic.trend === 'falling' && '↘'}
                                    {topic.trend === 'stable' && '→'}
                                </div>
                            </div>

                            <div className="topic-stats">
                                <div className="stat-item">
                                    <span className="stat-label">Total Claims</span>
                                    <span className="stat-value">{topic.claims.toLocaleString()}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Verification Rate</span>
                                    <span className="stat-value">{topic.verificationRate}%</span>
                                </div>
                            </div>

                            <div className="verification-bar">
                                <div
                                    className="verification-fill"
                                    style={{ width: `${topic.verificationRate}%` }}
                                ></div>
                            </div>

                            <button className="explore-btn">
                                Explore Topic →
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Insights Section */}
            <div className="insights-section">
                <h2>Key Insights</h2>
                <div className="insights-grid">
                    <div className="insight-card">
                        <div className="insight-icon">💡</div>
                        <h3>Peak Activity Hours</h3>
                        <p>Most claims are submitted between 2 PM - 6 PM EST, with verification requests peaking at 4 PM.</p>
                    </div>
                    <div className="insight-card">
                        <div className="insight-icon">🎯</div>
                        <h3>High Accuracy Topics</h3>
                        <p>Science and Healthcare categories show the highest verification accuracy at 92% and 91% respectively.</p>
                    </div>
                    <div className="insight-card">
                        <div className="insight-icon">⚠️</div>
                        <h3>Misinformation Hotspots</h3>
                        <p>Political claims have the highest false claim rate at 35%, requiring extra scrutiny and fact-checking.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
