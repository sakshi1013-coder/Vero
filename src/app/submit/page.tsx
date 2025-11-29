'use client';

import { useState } from 'react';
import './submit.css';

export default function SubmitClaim() {
    const [claimText, setClaimText] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('normal');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const categories = [
        'Politics',
        'Health',
        'Science',
        'Technology',
        'Environment',
        'Finance',
        'Sports',
        'Entertainment',
        'Other'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after success
        setTimeout(() => {
            setClaimText('');
            setSource('');
            setCategory('');
            setPriority('normal');
            setSubmitSuccess(false);
        }, 3000);
    };

    return (
        <div className="submit-container">
            <div className="submit-header">
                <h1 className="submit-title">Submit a Claim</h1>
                <p className="submit-subtitle">Submit claims for verification by our AI-powered fact-checking system</p>
            </div>

            <div className="submit-layout">
                {/* Main Form */}
                <div className="form-section">
                    <form onSubmit={handleSubmit} className="claim-form">
                        <div className="form-group">
                            <label htmlFor="claim">Claim Statement *</label>
                            <textarea
                                id="claim"
                                value={claimText}
                                onChange={(e) => setClaimText(e.target.value)}
                                placeholder="Enter the claim you want to verify..."
                                required
                                rows={6}
                                className="form-textarea"
                            />
                            <div className="char-count">
                                {claimText.length} / 1000 characters
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="source">Source URL (Optional)</label>
                            <input
                                type="url"
                                id="source"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                placeholder="https://example.com/article"
                                className="form-input"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="category">Category *</label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="form-select"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="priority">Priority</label>
                                <select
                                    id="priority"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                    className="form-select"
                                >
                                    <option value="low">Low</option>
                                    <option value="normal">Normal</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                        </div>

                        <div className="priority-info">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="16" x2="12" y2="12" />
                                <line x1="12" y1="8" x2="12.01" y2="8" />
                            </svg>
                            <span>
                                {priority === 'urgent' && 'Urgent claims are processed within 1 hour'}
                                {priority === 'high' && 'High priority claims are processed within 4 hours'}
                                {priority === 'normal' && 'Normal claims are processed within 24 hours'}
                                {priority === 'low' && 'Low priority claims are processed within 48 hours'}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${submitSuccess ? 'success' : ''}`}
                            disabled={isSubmitting || submitSuccess}
                        >
                            {isSubmitting && (
                                <>
                                    <span className="spinner"></span>
                                    Submitting...
                                </>
                            )}
                            {submitSuccess && (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Submitted Successfully!
                                </>
                            )}
                            {!isSubmitting && !submitSuccess && 'Submit Claim'}
                        </button>
                    </form>
                </div>

                {/* Info Sidebar */}
                <div className="info-section">
                    <div className="info-card">
                        <div className="info-icon">⚡</div>
                        <h3>Fast Verification</h3>
                        <p>Our AI-powered system can verify most claims within minutes using advanced natural language processing.</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">🔍</div>
                        <h3>Multi-Source Analysis</h3>
                        <p>We cross-reference claims against multiple trusted sources to ensure accuracy and reliability.</p>
                    </div>

                    <div className="info-card">
                        <div className="info-icon">🛡️</div>
                        <h3>Transparent Process</h3>
                        <p>Every verification includes detailed sources and reasoning, so you can trust the results.</p>
                    </div>

                    <div className="tips-card">
                        <h3>💡 Tips for Better Results</h3>
                        <ul>
                            <li>Be specific and clear in your claim statement</li>
                            <li>Include source URLs when available</li>
                            <li>Choose the most relevant category</li>
                            <li>Avoid submitting duplicate claims</li>
                            <li>Use proper grammar and punctuation</li>
                        </ul>
                    </div>

                    <div className="stats-card">
                        <h3>Recent Activity</h3>
                        <div className="stat-row">
                            <span>Claims Today</span>
                            <span className="stat-value">247</span>
                        </div>
                        <div className="stat-row">
                            <span>Avg. Response Time</span>
                            <span className="stat-value">12 min</span>
                        </div>
                        <div className="stat-row">
                            <span>Accuracy Rate</span>
                            <span className="stat-value">94.2%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
