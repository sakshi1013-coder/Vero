'use client';

import { useState, useEffect } from 'react';
import './agent-status.css';

interface AgentMetric {
    label: string;
    value: string;
    status: 'healthy' | 'warning' | 'error';
}

export default function AgentStatus() {
    const [uptime, setUptime] = useState('99.8%');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const metrics: AgentMetric[] = [
        { label: 'System Status', value: 'Operational', status: 'healthy' },
        { label: 'API Response Time', value: '142ms', status: 'healthy' },
        { label: 'Model Accuracy', value: '94.2%', status: 'healthy' },
        { label: 'Queue Size', value: '23', status: 'healthy' },
        { label: 'Processing Rate', value: '847/hr', status: 'healthy' },
        { label: 'Error Rate', value: '0.3%', status: 'healthy' },
    ];

    const services = [
        { name: 'Claim Verification Engine', status: 'healthy', uptime: '99.9%', latency: '120ms' },
        { name: 'Natural Language Processing', status: 'healthy', uptime: '99.8%', latency: '85ms' },
        { name: 'Source Validation Service', status: 'healthy', uptime: '99.7%', latency: '200ms' },
        { name: 'Database Connection', status: 'healthy', uptime: '100%', latency: '15ms' },
        { name: 'Cache Layer', status: 'healthy', uptime: '99.9%', latency: '5ms' },
        { name: 'External API Gateway', status: 'warning', uptime: '98.2%', latency: '450ms' },
    ];

    const recentLogs = [
        { time: '11:09:15', level: 'info', message: 'Claim verification completed successfully', id: 'CLM-1247' },
        { time: '11:08:42', level: 'info', message: 'New source added to knowledge base', id: 'SRC-892' },
        { time: '11:07:33', level: 'warning', message: 'High latency detected on external API', id: 'API-445' },
        { time: '11:06:18', level: 'info', message: 'Model inference completed', id: 'MDL-334' },
        { time: '11:05:05', level: 'info', message: 'Cache refreshed successfully', id: 'CCH-221' },
    ];

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsRefreshing(false);
    };

    return (
        <div className="agent-status-container">
            <div className="status-header">
                <div>
                    <h1 className="status-title">Agent Status</h1>
                    <p className="status-subtitle">Real-time monitoring of AI agent performance and health</p>
                </div>
                <button onClick={handleRefresh} className={`refresh-btn ${isRefreshing ? 'refreshing' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                    </svg>
                    Refresh
                </button>
            </div>

            {/* Overall Status */}
            <div className="overall-status">
                <div className="status-indicator healthy">
                    <div className="status-pulse"></div>
                    <div className="status-dot"></div>
                </div>
                <div className="status-info">
                    <h2>All Systems Operational</h2>
                    <p>Uptime: {uptime} | Last updated: Just now</p>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                {metrics.map((metric, index) => (
                    <div key={index} className="metric-card">
                        <div className="metric-header">
                            <span className="metric-label">{metric.label}</span>
                            <span className={`status-badge status-${metric.status}`}>
                                {metric.status === 'healthy' && '●'}
                                {metric.status === 'warning' && '▲'}
                                {metric.status === 'error' && '✕'}
                            </span>
                        </div>
                        <div className="metric-value">{metric.value}</div>
                    </div>
                ))}
            </div>

            {/* Services Status */}
            <div className="services-section">
                <h2>Service Health</h2>
                <div className="services-list">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div className="service-header">
                                <div className="service-name-row">
                                    <span className={`service-indicator status-${service.status}`}></span>
                                    <h3>{service.name}</h3>
                                </div>
                                <span className={`service-status status-${service.status}`}>
                                    {service.status === 'healthy' ? 'Healthy' :
                                        service.status === 'warning' ? 'Warning' : 'Error'}
                                </span>
                            </div>
                            <div className="service-metrics">
                                <div className="service-metric">
                                    <span className="metric-label">Uptime</span>
                                    <span className="metric-value">{service.uptime}</span>
                                </div>
                                <div className="service-metric">
                                    <span className="metric-label">Latency</span>
                                    <span className="metric-value">{service.latency}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Activity Logs */}
            <div className="logs-section">
                <h2>Recent Activity</h2>
                <div className="logs-container">
                    {recentLogs.map((log, index) => (
                        <div key={index} className={`log-entry log-${log.level}`}>
                            <span className="log-time">{log.time}</span>
                            <span className={`log-level level-${log.level}`}>{log.level.toUpperCase()}</span>
                            <span className="log-message">{log.message}</span>
                            <span className="log-id">{log.id}</span>
                        </div>
                    ))}
                </div>
                <button className="view-all-logs-btn">View Full Logs →</button>
            </div>
        </div>
    );
}
