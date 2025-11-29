'use client';

import { useState } from 'react';
import './human-review.css';

interface ReviewItem {
    id: string;
    claim: string;
    category: string;
    aiConfidence: number;
    aiVerdict: 'verified' | 'false' | 'unverified';
    sources: number;
    submittedAt: string;
    priority: 'low' | 'normal' | 'high' | 'urgent';
}

export default function HumanReview() {
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [filter, setFilter] = useState<'all' | 'urgent' | 'high' | 'low-confidence'>('all');

    const reviewQueue: ReviewItem[] = [
        {
            id: 'REV-001',
            claim: 'New economic policy will reduce inflation by 50% within 6 months',
            category: 'Politics',
            aiConfidence: 45,
            aiVerdict: 'unverified',
            sources: 3,
            submittedAt: '2 hours ago',
            priority: 'urgent'
        },
        {
            id: 'REV-002',
            claim: 'Study shows coffee consumption linked to increased longevity',
            category: 'Health',
            aiConfidence: 62,
            aiVerdict: 'verified',
            sources: 8,
            submittedAt: '4 hours ago',
            priority: 'normal'
        },
        {
            id: 'REV-003',
            claim: 'Tech company announces breakthrough in quantum computing',
            category: 'Technology',
            aiConfidence: 58,
            aiVerdict: 'verified',
            sources: 5,
            submittedAt: '6 hours ago',
            priority: 'high'
        },
        {
            id: 'REV-004',
            claim: 'Climate change causing unprecedented weather patterns globally',
            category: 'Environment',
            aiConfidence: 88,
            aiVerdict: 'verified',
            sources: 15,
            submittedAt: '8 hours ago',
            priority: 'normal'
        },
    ];

    const filteredQueue = reviewQueue.filter(item => {
        if (filter === 'urgent') return item.priority === 'urgent';
        if (filter === 'high') return item.priority === 'high';
        if (filter === 'low-confidence') return item.aiConfidence < 70;
        return true;
    });

    const handleApprove = (id: string) => {
        console.log('Approved:', id);
        // Handle approval logic
    };

    const handleReject = (id: string) => {
        console.log('Rejected:', id);
        // Handle rejection logic
    };

    const handleRequestMoreInfo = (id: string) => {
        console.log('Request more info:', id);
        // Handle request more info logic
    };

    return (
        <div className="review-container">
            <div className="review-header">
                <div>
                    <h1 className="review-title">Human Review Queue</h1>
                    <p className="review-subtitle">Review claims flagged for human verification</p>
                </div>
                <div className="queue-stats">
                    <div className="stat-pill urgent">
                        <span className="stat-count">{reviewQueue.filter(i => i.priority === 'urgent').length}</span>
                        <span className="stat-label">Urgent</span>
                    </div>
                    <div className="stat-pill high">
                        <span className="stat-count">{reviewQueue.filter(i => i.priority === 'high').length}</span>
                        <span className="stat-label">High</span>
                    </div>
                    <div className="stat-pill total">
                        <span className="stat-count">{reviewQueue.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="review-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Items
                </button>
                <button
                    className={`filter-btn ${filter === 'urgent' ? 'active' : ''}`}
                    onClick={() => setFilter('urgent')}
                >
                    Urgent Only
                </button>
                <button
                    className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
                    onClick={() => setFilter('high')}
                >
                    High Priority
                </button>
                <button
                    className={`filter-btn ${filter === 'low-confidence' ? 'active' : ''}`}
                    onClick={() => setFilter('low-confidence')}
                >
                    Low Confidence (&lt;70%)
                </button>
            </div>

            {/* Review Queue */}
            <div className="review-queue">
                {filteredQueue.map(item => (
                    <div key={item.id} className={`review-item priority-${item.priority}`}>
                        <div className="review-item-header">
                            <div className="item-meta">
                                <span className="item-id">{item.id}</span>
                                <span className={`priority-badge priority-${item.priority}`}>
                                    {item.priority.toUpperCase()}
                                </span>
                                <span className="item-category">{item.category}</span>
                            </div>
                            <span className="item-time">{item.submittedAt}</span>
                        </div>

                        <div className="claim-text">{item.claim}</div>

                        <div className="ai-analysis">
                            <div className="analysis-row">
                                <div className="analysis-item">
                                    <span className="analysis-label">AI Verdict:</span>
                                    <span className={`verdict-badge verdict-${item.aiVerdict}`}>
                                        {item.aiVerdict === 'verified' && '✓ Verified'}
                                        {item.aiVerdict === 'false' && '✗ False'}
                                        {item.aiVerdict === 'unverified' && '⊙ Unverified'}
                                    </span>
                                </div>
                                <div className="analysis-item">
                                    <span className="analysis-label">Confidence:</span>
                                    <div className="confidence-bar-wrapper">
                                        <div className="confidence-bar">
                                            <div
                                                className={`confidence-fill confidence-${item.aiConfidence >= 70 ? 'high' : item.aiConfidence >= 50 ? 'medium' : 'low'
                                                    }`}
                                                style={{ width: `${item.aiConfidence}%` }}
                                            ></div>
                                        </div>
                                        <span className="confidence-value">{item.aiConfidence}%</span>
                                    </div>
                                </div>
                                <div className="analysis-item">
                                    <span className="analysis-label">Sources:</span>
                                    <span className="sources-count">{item.sources} sources</span>
                                </div>
                            </div>
                        </div>

                        <div className="review-actions">
                            <button
                                onClick={() => handleApprove(item.id)}
                                className="action-btn approve"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Approve
                            </button>
                            <button
                                onClick={() => handleReject(item.id)}
                                className="action-btn reject"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                                Reject
                            </button>
                            <button
                                onClick={() => handleRequestMoreInfo(item.id)}
                                className="action-btn info"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="16" x2="12" y2="12" />
                                    <line x1="12" y1="8" x2="12.01" y2="8" />
                                </svg>
                                More Info
                            </button>
                            <button className="action-btn details">
                                View Details →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredQueue.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">✅</div>
                    <h3>No Items to Review</h3>
                    <p>All caught up! There are no items matching your filter criteria.</p>
                </div>
            )}
        </div>
    );
}
