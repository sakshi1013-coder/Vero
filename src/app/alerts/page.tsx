'use client';

import { useState } from 'react';
import './alerts.css';

interface Alert {
    id: string;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    actionRequired: boolean;
}

export default function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: '1',
            type: 'critical',
            title: 'High Volume of False Claims Detected',
            message: 'Unusual spike in misinformation related to healthcare topics. Immediate review recommended.',
            timestamp: '5 minutes ago',
            read: false,
            actionRequired: true
        },
        {
            id: '2',
            type: 'warning',
            title: 'Verification Delay',
            message: 'Current processing time is 25% higher than average due to increased claim submissions.',
            timestamp: '1 hour ago',
            read: false,
            actionRequired: false
        },
        {
            id: '3',
            type: 'info',
            title: 'New Source Added',
            message: 'Reuters fact-checking database has been integrated into the verification system.',
            timestamp: '3 hours ago',
            read: true,
            actionRequired: false
        },
        {
            id: '4',
            type: 'success',
            title: 'System Update Complete',
            message: 'AI model updated to version 2.4.1 with improved accuracy for political claims.',
            timestamp: '5 hours ago',
            read: true,
            actionRequired: false
        },
        {
            id: '5',
            type: 'warning',
            title: 'Low Confidence Results',
            message: '12 claims require human review due to low confidence scores.',
            timestamp: '8 hours ago',
            read: true,
            actionRequired: true
        },
    ]);

    const [filter, setFilter] = useState<'all' | 'unread' | 'action-required'>('all');

    const filteredAlerts = alerts.filter(alert => {
        if (filter === 'unread') return !alert.read;
        if (filter === 'action-required') return alert.actionRequired;
        return true;
    });

    const markAsRead = (id: string) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, read: true } : alert
        ));
    };

    const markAllAsRead = () => {
        setAlerts(alerts.map(alert => ({ ...alert, read: true })));
    };

    const deleteAlert = (id: string) => {
        setAlerts(alerts.filter(alert => alert.id !== id));
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'critical':
                return '🚨';
            case 'warning':
                return '⚠️';
            case 'info':
                return 'ℹ️';
            case 'success':
                return '✅';
            default:
                return '📢';
        }
    };

    const unreadCount = alerts.filter(a => !a.read).length;
    const actionRequiredCount = alerts.filter(a => a.actionRequired).length;

    return (
        <div className="alerts-container">
            <div className="alerts-header">
                <div>
                    <h1 className="alerts-title">Alerts & Notifications</h1>
                    <p className="alerts-subtitle">Stay informed about system events and important updates</p>
                </div>
                {unreadCount > 0 && (
                    <button onClick={markAllAsRead} className="mark-all-btn">
                        Mark All as Read
                    </button>
                )}
            </div>

            {/* Stats */}
            <div className="alert-stats">
                <div className="stat-box">
                    <div className="stat-value">{unreadCount}</div>
                    <div className="stat-label">Unread</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">{actionRequiredCount}</div>
                    <div className="stat-label">Action Required</div>
                </div>
                <div className="stat-box">
                    <div className="stat-value">{alerts.length}</div>
                    <div className="stat-label">Total Alerts</div>
                </div>
            </div>

            {/* Filters */}
            <div className="alert-filters">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Alerts
                </button>
                <button
                    className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
                    onClick={() => setFilter('unread')}
                >
                    Unread ({unreadCount})
                </button>
                <button
                    className={`filter-btn ${filter === 'action-required' ? 'active' : ''}`}
                    onClick={() => setFilter('action-required')}
                >
                    Action Required ({actionRequiredCount})
                </button>
            </div>

            {/* Alerts List */}
            <div className="alerts-list">
                {filteredAlerts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">🔔</div>
                        <h3>No Alerts</h3>
                        <p>You're all caught up! No {filter !== 'all' ? filter.replace('-', ' ') : ''} alerts at the moment.</p>
                    </div>
                ) : (
                    filteredAlerts.map(alert => (
                        <div
                            key={alert.id}
                            className={`alert-card alert-${alert.type} ${!alert.read ? 'unread' : ''}`}
                        >
                            <div className="alert-indicator"></div>
                            <div className="alert-icon">{getAlertIcon(alert.type)}</div>
                            <div className="alert-content">
                                <div className="alert-header-row">
                                    <h3 className="alert-title">{alert.title}</h3>
                                    {alert.actionRequired && (
                                        <span className="action-badge">Action Required</span>
                                    )}
                                </div>
                                <p className="alert-message">{alert.message}</p>
                                <div className="alert-footer">
                                    <span className="alert-time">{alert.timestamp}</span>
                                    <div className="alert-actions">
                                        {!alert.read && (
                                            <button
                                                onClick={() => markAsRead(alert.id)}
                                                className="action-btn"
                                            >
                                                Mark as Read
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteAlert(alert.id)}
                                            className="action-btn delete"
                                        >
                                            Dismiss
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
