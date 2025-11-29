import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export type Verdict = 'True' | 'False' | 'Unclear';

export interface Source {
  name: string;
  url: string;
}

export interface ClaimData {
  id: string;
  claim: string;
  verdict: Verdict;
  confidence_score: number;
  summary: string;
  sources: Source[];
  timestamp: string;
}

interface ClaimCardProps {
  data: ClaimData;
}

const VerdictBadge = ({ verdict }: { verdict: Verdict }) => {
  switch (verdict) {
    case 'True':
      return (
        <span className="badge badge-success">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          Verified True
        </span>
      );
    case 'False':
      return (
        <span className="badge badge-danger">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          Likely False
        </span>
      );
    case 'Unclear':
      return (
        <span className="badge badge-warning">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Unclear
        </span>
      );
    default:
      return null;
  }
};

export default function ClaimCard({ data }: ClaimCardProps) {
  const formattedDate = new Date(data.timestamp).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  const confidencePercent = Math.round(data.confidence_score * 100);

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <VerdictBadge verdict={data.verdict} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          <span className="text-xs text-muted font-mono">{formattedDate}</span>
        </div>
      </div>

      <h3 style={{
        fontSize: '1.25rem',
        marginBottom: '1rem',
        lineHeight: '1.5',
        fontWeight: '600',
        color: 'var(--text-primary)'
      }}>
        &ldquo;{data.claim}&rdquo;
      </h3>

      <p style={{
        marginBottom: '1.5rem',
        color: 'var(--text-secondary)',
        lineHeight: '1.7'
      }}>
        {data.summary}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        gap: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)'
      }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <h4 className="text-xs text-muted" style={{
            marginBottom: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: '600'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '0.5rem', verticalAlign: 'middle' }}>
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            Sources
          </h4>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {data.sources.map((source, index) => {
              const isTrusted = /gov|org|reuters|apnews|bbc|who|un\.org/.test(source.url);
              return (
                <a
                  key={index}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                  style={{
                    color: 'var(--accent)',
                    textDecoration: 'none',
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(59, 130, 246, 0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.2s ease',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {source.name}
                  {isTrusted && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--success)" stroke="none" style={{ marginLeft: '2px' }}>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  )}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
          <div style={{
            textAlign: 'right',
            padding: '1rem 1.5rem',
            background: 'var(--surface-highlight)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border)'
          }}>
            <div className="text-xs text-muted" style={{ marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Confidence
            </div>
            <div style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-geist-mono)',
              background: confidencePercent > 80
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : confidencePercent > 50
                  ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                  : 'linear-gradient(135deg, #ef4444, #dc2626)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {confidencePercent}%
            </div>
          </div>

          <Link href={`/claim/${data.id}`} className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
            View Full Report <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
