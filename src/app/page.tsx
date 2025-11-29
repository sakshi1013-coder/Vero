'use client';

import React, { useState, useEffect } from 'react';
import ClaimCard, { ClaimData } from '@/components/ClaimCard';
import { fetchClaims, verifyClaim } from './actions';
import { Search, Send, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function Home() {
  const [claims, setClaims] = useState<ClaimData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [submitText, setSubmitText] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<ClaimData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleVerify = async () => {
    if (!submitText.trim()) return;

    setIsVerifying(true);
    try {
      const result = await verifyClaim(submitText);
      setVerificationResult(result);
    } catch (err) {
      console.error('Verification failed:', err);
    } finally {
      setIsVerifying(false);
    }
  };

  const loadClaims = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClaims();
      if (data.length > 0) {
        setClaims(data);
        setLastUpdated(new Date());
      } else {
        setError('No claims returned from the agent. Try refreshing.');
      }
    } catch (err) {
      setError('Failed to fetch claims.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClaims();

    // Auto-refresh every 30 seconds for real-time updates
    const intervalId = setInterval(() => {
      loadClaims();
    }, 30000); // 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Top Bar */}
      <header className="glass" style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(20px)',
        padding: '1rem 2rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Live Dashboard</h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ position: 'relative', width: '300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search rumors, topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.625rem 1rem 0.625rem 2.5rem',
                  background: 'var(--surface-highlight)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="animate-pulse animate-glow" style={{
                width: '0.625rem',
                height: '0.625rem',
                background: 'var(--success)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--success)'
              }}></span>
              <span className="text-sm font-mono" style={{ color: 'var(--success)', fontWeight: '600' }}>
                SYSTEM ACTIVE
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container" style={{ marginTop: '2rem' }}>
        {/* Stats Overview */}
        <section style={{ marginBottom: '2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Activity size={24} color="var(--accent)" />
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  1,248
                </div>
              </div>
              <div className="text-secondary text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Claims Monitored
              </div>
            </div>

            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <XCircle size={24} color="var(--danger)" />
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  342
                </div>
              </div>
              <div className="text-secondary text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Misinformation Blocked
              </div>
            </div>

            <div className="stat-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <CheckCircle size={24} color="var(--success)" />
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  856
                </div>
              </div>
              <div className="text-secondary text-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Verified Facts
              </div>
            </div>
          </div>
        </section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
          {/* Main Feed */}
          <section>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}>
              <div>
                <h2 style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  Live Verification Feed
                  <span className="animate-pulse" style={{
                    background: 'var(--danger)',
                    color: 'white',
                    fontSize: '0.6rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '0.25rem',
                    fontWeight: 'bold',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase'
                  }}>
                    LIVE
                  </span>
                </h2>
                <p className="text-secondary text-sm">
                  Real-time analysis from trusted sources
                  {lastUpdated && (
                    <span style={{ marginLeft: '0.5rem', color: 'var(--text-muted)' }}>
                      • Last updated: {lastUpdated.toLocaleTimeString()}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={loadClaims}
                disabled={loading}
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
              >
                {loading ? 'Scanning...' : 'Refresh Feed'}
              </button>
            </div>

            {loading && claims.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                color: 'var(--text-secondary)',
                background: 'var(--surface)',
                borderRadius: '1rem',
                border: '1px solid var(--border)'
              }}>
                <div className="spinner" style={{ width: '2rem', height: '2rem', borderWidth: '2px', margin: '0 auto 1rem' }}></div>
                <p>Scanning Information Streams...</p>
              </div>
            )}

            {error && (
              <div style={{
                padding: '1rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--danger)',
                borderRadius: '0.5rem',
                marginBottom: '1rem',
                color: 'var(--danger)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <AlertTriangle size={20} />
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {claims.map(claim => (
                <ClaimCard key={claim.id} data={claim} />
              ))}
            </div>
          </section>

          {/* Sidebar Widgets */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Submit Claim Widget */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Send size={18} color="var(--accent)" />
                Submit a Claim
              </h3>

              {!verificationResult ? (
                <>
                  <p className="text-sm text-secondary" style={{ marginBottom: '1rem' }}>
                    Paste a link, tweet, or text to verify instantly.
                  </p>
                  <textarea
                    placeholder="Paste text or URL here..."
                    value={submitText}
                    onChange={(e) => setSubmitText(e.target.value)}
                    disabled={isVerifying}
                    style={{
                      width: '100%',
                      height: '100px',
                      padding: '0.75rem',
                      background: 'var(--surface-highlight)',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      marginBottom: '1rem',
                      resize: 'none',
                      opacity: isVerifying ? 0.5 : 1
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={handleVerify}
                    disabled={!submitText.trim() || isVerifying}
                  >
                    {isVerifying ? (
                      <>
                        <span className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }}></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify Now'
                    )}
                  </button>
                </>
              ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4">
                  <div style={{
                    padding: '1rem',
                    background: 'var(--surface-highlight)',
                    borderRadius: '0.75rem',
                    marginBottom: '1rem',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span className="text-xs text-muted">Verdict</span>
                      <span className={`badge badge-${verificationResult.verdict === 'True' ? 'success' : verificationResult.verdict === 'False' ? 'danger' : 'warning'}`} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                        {verificationResult.verdict}
                      </span>
                    </div>

                    <h4 style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      &ldquo;{verificationResult.claim}&rdquo;
                    </h4>

                    <p className="text-sm" style={{ marginBottom: '0.75rem' }}>{verificationResult.summary}</p>

                    {/* Sources for Verification Result */}
                    {verificationResult.sources && verificationResult.sources.length > 0 && (
                      <div style={{ marginBottom: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                        <div className="text-xs text-muted" style={{ marginBottom: '0.5rem', fontWeight: '600' }}>SOURCES</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          {verificationResult.sources.map((source, idx) => (
                            <a
                              key={idx}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs"
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                color: 'var(--accent)',
                                textDecoration: 'none'
                              }}
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                              {source.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-muted">Confidence: {Math.round(verificationResult.confidence_score * 100)}%</div>
                  </div>
                  <button
                    className="btn"
                    style={{ width: '100%', justifyContent: 'center', background: 'var(--surface-highlight)' }}
                    onClick={() => {
                      setVerificationResult(null);
                      setSubmitText('');
                    }}
                  >
                    Verify Another
                  </button>
                </div>
              )}
            </div>

            {/* Agent Status Widget */}
            <div className="card" style={{ padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={18} color="var(--success)" />
                Agent Status
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }}></div>
                  <span>Monitoring {claims.reduce((acc, claim) => acc + claim.sources.length, 0)} sources...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent)', animationDelay: '0.2s' }}></div>
                  <span>Tracking {claims.length} active claims...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem' }}>
                  <div className="animate-pulse" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)', animationDelay: '0.4s' }}></div>
                  <span>Auto-refresh: Every 30s</span>
                </div>
                {lastUpdated && (
                  <div style={{
                    marginTop: '0.5rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border)',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                  }}>
                    Next update: {new Date(lastUpdated.getTime() + 30000).toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// Helper component for icons used in stats
function Activity({ size, color }: { size: number, color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  );
}
