'use client';

import { useState } from 'react';
import './search.css';

interface SearchResult {
    id: string;
    title: string;
    content: string;
    category: string;
    verified: boolean;
    confidence: number;
    sources: number;
    date: string;
}

export default function SearchKnowledge() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedFilter, setSelectedFilter] = useState('all');

    const mockResults: SearchResult[] = [
        {
            id: '1',
            title: 'Climate Change and Global Warming',
            content: 'Scientific consensus shows that climate change is primarily caused by human activities, particularly the emission of greenhouse gases...',
            category: 'Environment',
            verified: true,
            confidence: 95,
            sources: 12,
            date: '2024-11-28'
        },
        {
            id: '2',
            title: 'COVID-19 Vaccine Effectiveness',
            content: 'Multiple peer-reviewed studies demonstrate that COVID-19 vaccines significantly reduce the risk of severe illness and hospitalization...',
            category: 'Health',
            verified: true,
            confidence: 92,
            sources: 18,
            date: '2024-11-27'
        },
        {
            id: '3',
            title: 'Artificial Intelligence in Healthcare',
            content: 'AI technologies are increasingly being used in medical diagnosis, drug discovery, and personalized treatment plans...',
            category: 'Technology',
            verified: true,
            confidence: 88,
            sources: 8,
            date: '2024-11-26'
        },
    ];

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setResults(mockResults);
        setIsSearching(false);
    };

    const filters = ['all', 'verified', 'unverified', 'high-confidence'];

    return (
        <div className="search-container">
            <div className="search-header">
                <h1 className="search-title">Search Knowledge Base</h1>
                <p className="search-subtitle">Search through verified claims and fact-checked information</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                    <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for claims, topics, or keywords..."
                        className="search-input"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="clear-btn"
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button type="submit" className="search-btn" disabled={isSearching}>
                    {isSearching ? 'Searching...' : 'Search'}
                </button>
            </form>

            {/* Filters */}
            <div className="filters-section">
                <div className="filter-pills">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            className={`filter-pill ${selectedFilter === filter ? 'active' : ''}`}
                            onClick={() => setSelectedFilter(filter)}
                        >
                            {filter.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            {results.length > 0 && (
                <div className="results-section">
                    <div className="results-header">
                        <h2>Search Results</h2>
                        <span className="results-count">{results.length} results found</span>
                    </div>

                    <div className="results-list">
                        {results.map(result => (
                            <div key={result.id} className="result-card">
                                <div className="result-header">
                                    <div className="result-title-row">
                                        <h3 className="result-title">{result.title}</h3>
                                        {result.verified && (
                                            <span className="verified-badge">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    <span className="result-category">{result.category}</span>
                                </div>

                                <p className="result-content">{result.content}</p>

                                <div className="result-meta">
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 11l3 3L22 4" />
                                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                                        </svg>
                                        <span>Confidence: {result.confidence}%</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                                        </svg>
                                        <span>{result.sources} sources</span>
                                    </div>
                                    <div className="meta-item">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                        <span>{result.date}</span>
                                    </div>
                                </div>

                                <button className="view-details-btn">
                                    View Full Details →
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {results.length === 0 && !isSearching && (
                <div className="empty-state">
                    <div className="empty-icon">🔍</div>
                    <h3>Start Your Search</h3>
                    <p>Enter keywords, topics, or claims to search our verified knowledge base</p>

                    <div className="popular-searches">
                        <h4>Popular Searches</h4>
                        <div className="search-tags">
                            <button className="search-tag" onClick={() => setSearchQuery('climate change')}>Climate Change</button>
                            <button className="search-tag" onClick={() => setSearchQuery('vaccines')}>Vaccines</button>
                            <button className="search-tag" onClick={() => setSearchQuery('AI technology')}>AI Technology</button>
                            <button className="search-tag" onClick={() => setSearchQuery('economy')}>Economy</button>
                            <button className="search-tag" onClick={() => setSearchQuery('space exploration')}>Space Exploration</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
