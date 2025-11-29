'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, AlertTriangle, CheckCircle, XCircle, ExternalLink, Activity, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';
import { checkUpdates } from '@/app/actions';

// Mock data for demonstration - in a real app, this would be fetched based on the ID
const MOCK_CLAIM_DETAILS = {
    id: '1',
    claim: 'A second earthquake of 7.1 magnitude has struck Mumbai.',
    verdict: 'False',
    confidence_score: 0.96,
    summary: 'IMD and NDTV confirm no second earthquake occurred. The report originated from an unverified account.',
    full_report: `
    At approximately 16:30 IST on October 19, 2025, social media reports began circulating claiming a second earthquake of magnitude 7.1 had struck the Mumbai region.
    
    Vero's automated systems immediately cross-referenced this claim with real-time data from the Indian Meteorological Department (IMD) and the National Center for Seismology.
    
    **Findings:**
    1. No seismic activity was recorded by any monitoring station in the region during the specified timeframe.
    2. The initial source of the claim was traced to a bot network on X (formerly Twitter).
    3. Official channels (NDTV, Times of India) have issued denials.
    
    **Conclusion:**
    The claim is categorically false and appears to be a coordinated misinformation attempt to cause panic.
  `,
    sources: [
        { name: 'IMD', url: 'https://mausam.imd.gov.in', trust_score: 98 },
        { name: 'NDTV', url: 'https://ndtv.com', trust_score: 92 },
        { name: 'National Center for Seismology', url: 'https://seismo.gov.in', trust_score: 99 }
    ],
    timestamp: '2025-10-19T16:30:00',
    trend_activity: 'High',
    affected_regions: ['Mumbai', 'Pune', 'Nashik']
};

export default function ClaimDetailPage() {
    const params = useParams();
    // In a real implementation, use params.id to fetch data
    const data = MOCK_CLAIM_DETAILS;

    const [latestUpdate, setLatestUpdate] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const handleCheckUpdates = async () => {
        setIsChecking(true);
        try {
            const update = await checkUpdates(data.claim, data.sources);
            setLatestUpdate(update);
        } catch (error) {
            console.error('Failed to check updates:', error);
        } finally {
            setIsChecking(false);
        }
    };

    const formattedDate = new Date(data.timestamp).toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    const confidencePercent = Math.round(data.confidence_score * 100);

    return (
        <div className="container" style={{ padding: '2rem 0 4rem' }}>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <ArrowLeft size={20} />
                Back to Dashboard
            </Link>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                {/* Main Content */}
                <div>
                    <div className="card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                            <VerdictBadge verdict={data.verdict as any} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span className="text-sm text-secondary font-mono">{formattedDate}</span>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                                    <Share2 size={16} />
                                    Share Verified Info
                                </button>
                            </div>
                        </div>

                        <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                            &ldquo;{data.claim}&rdquo;
                        </h1>

                        <div style={{
                            padding: '1.5rem',
                            background: 'var(--surface-highlight)',
                            borderRadius: '1rem',
                            marginBottom: '2rem',
                            borderLeft: '4px solid var(--accent)'
                        }}>
                            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Executive Summary</h3>
                            <p style={{ lineHeight: '1.6' }}>{data.summary}</p>
                        </div>

                        {/* Latest Update Section */}
                        {latestUpdate && (
                            <div className="animate-in fade-in slide-in-from-top-4" style={{
                                padding: '1.5rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                borderRadius: '1rem',
                                marginBottom: '2rem',
                                border: '1px solid var(--success)'
                            }}>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <RefreshCw size={18} /> Latest Update from Sources
                                </h3>
                                <p style={{ lineHeight: '1.6' }}>{latestUpdate}</p>
                            </div>
                        )}

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', margin: 0 }}>AI Verification Report</h3>
                                <button
                                    onClick={handleCheckUpdates}
                                    disabled={isChecking}
                                    className="btn"
                                    style={{ background: 'var(--surface-highlight)', fontSize: '0.875rem' }}
                                >
                                    {isChecking ? (
                                        <>
                                            <span className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }}></span>
                                            Checking Sources...
                                        </>
                                    ) : (
                                        <>
                                            <RefreshCw size={16} /> Check for Updates
                                        </>
                                    )}
                                </button>
                            </div>
                            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                                {data.full_report}
                            </div>
                        </div>

                        <div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Evidence Sources</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {data.sources.map((source, index) => (
                                    <div key={index} style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        background: 'var(--surface)',
                                        border: '1px solid var(--border)',
                                        borderRadius: '0.75rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '2.5rem',
                                                height: '2.5rem',
                                                background: 'var(--surface-highlight)',
                                                borderRadius: '0.5rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold'
                                            }}>
                                                {source.name[0]}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: '600' }}>{source.name}</div>
                                                <div className="text-xs text-secondary">Trust Score: {source.trust_score}%</div>
                                            </div>
                                        </div>
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--surface-highlight)', padding: '0.5rem 1rem' }}>
                                            View Source <ExternalLink size={14} style={{ marginLeft: '0.5rem' }} />
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Confidence Score */}
                    <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div className="text-sm text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                            Confidence Score
                        </div>
                        <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto 1rem' }}>
                            <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="var(--surface-highlight)"
                                    strokeWidth="3"
                                />
                                <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={confidencePercent > 80 ? 'var(--success)' : 'var(--warning)'}
                                    strokeWidth="3"
                                    strokeDasharray={`${confidencePercent}, 100`}
                                />
                            </svg>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                fontSize: '2rem',
                                fontWeight: 'bold'
                            }}>
                                {confidencePercent}%
                            </div>
                        </div>
                        <p className="text-sm text-secondary">
                            Based on cross-referencing 3 authoritative sources.
                        </p>
                    </div>

                    {/* Trend Activity */}
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Activity size={18} color="var(--danger)" />
                            Trend Activity
                        </h3>
                        <div style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span className="text-sm">Viral Velocity</span>
                                <span className="text-sm font-bold text-danger">High</span>
                            </div>
                            <div style={{ height: '6px', background: 'var(--surface-highlight)', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ width: '85%', height: '100%', background: 'var(--danger)' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-secondary" style={{ marginBottom: '0.5rem' }}>Affected Regions:</div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {data.affected_regions.map(region => (
                                    <span key={region} className="badge" style={{ background: 'var(--surface-highlight)', color: 'var(--text-primary)', border: 'none' }}>
                                        {region}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const VerdictBadge = ({ verdict }: { verdict: 'True' | 'False' | 'Unclear' }) => {
    switch (verdict) {
        case 'True':
            return (
                <span className="badge badge-success" style={{ padding: '0.75rem 1.25rem', fontSize: '1rem' }}>
                    <CheckCircle size={20} /> Verified True
                </span>
            );
        case 'False':
            return (
                <span className="badge badge-danger" style={{ padding: '0.75rem 1.25rem', fontSize: '1rem' }}>
                    <XCircle size={20} /> Likely False
                </span>
            );
        case 'Unclear':
            return (
                <span className="badge badge-warning" style={{ padding: '0.75rem 1.25rem', fontSize: '1rem' }}>
                    <AlertTriangle size={20} /> Unclear
                </span>
            );
        default:
            return null;
    }
};
