'use client';

import { useState } from 'react';
import './settings.css';

export default function Settings() {
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sms: false,
        weeklyReport: true,
    });

    const [preferences, setPreferences] = useState({
        autoVerify: true,
        confidenceThreshold: 70,
        language: 'en',
        theme: 'dark',
    });

    const [apiSettings, setApiSettings] = useState({
        apiKey: '••••••••••••••••',
        rateLimit: 1000,
        webhookUrl: '',
    });

    const handleSave = () => {
        console.log('Settings saved');
        // Handle save logic
    };

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1 className="settings-title">Settings</h1>
                <p className="settings-subtitle">Manage your account and application preferences</p>
            </div>

            <div className="settings-grid">
                {/* Account Settings */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon">👤</div>
                        <h2>Account Settings</h2>
                    </div>
                    <div className="settings-content">
                        <div className="setting-item">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                defaultValue="admin@vero.ai"
                                className="setting-input"
                            />
                        </div>
                        <div className="setting-item">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                defaultValue="admin@vero.ai"
                                className="setting-input"
                            />
                        </div>
                        <div className="setting-item">
                            <label htmlFor="role">Role</label>
                            <select id="role" className="setting-select">
                                <option>Administrator</option>
                                <option>Reviewer</option>
                                <option>Analyst</option>
                            </select>
                        </div>
                        <button className="change-password-btn">Change Password</button>
                    </div>
                </div>

                {/* Notification Settings */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon">🔔</div>
                        <h2>Notifications</h2>
                    </div>
                    <div className="settings-content">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-label">Email Notifications</span>
                                <span className="toggle-description">Receive updates via email</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.email}
                                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-label">Push Notifications</span>
                                <span className="toggle-description">Browser push notifications</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.push}
                                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-label">SMS Alerts</span>
                                <span className="toggle-description">Critical alerts via SMS</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.sms}
                                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-label">Weekly Report</span>
                                <span className="toggle-description">Summary of weekly activity</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={notifications.weeklyReport}
                                    onChange={(e) => setNotifications({ ...notifications, weeklyReport: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Verification Preferences */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon">⚙️</div>
                        <h2>Verification Preferences</h2>
                    </div>
                    <div className="settings-content">
                        <div className="toggle-item">
                            <div className="toggle-info">
                                <span className="toggle-label">Auto-Verify High Confidence</span>
                                <span className="toggle-description">Automatically verify claims above threshold</span>
                            </div>
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={preferences.autoVerify}
                                    onChange={(e) => setPreferences({ ...preferences, autoVerify: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="threshold">
                                Confidence Threshold: {preferences.confidenceThreshold}%
                            </label>
                            <input
                                type="range"
                                id="threshold"
                                min="50"
                                max="95"
                                value={preferences.confidenceThreshold}
                                onChange={(e) => setPreferences({ ...preferences, confidenceThreshold: parseInt(e.target.value) })}
                                className="setting-range"
                            />
                            <div className="range-labels">
                                <span>50%</span>
                                <span>95%</span>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="language">Default Language</label>
                            <select
                                id="language"
                                value={preferences.language}
                                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                className="setting-select"
                            >
                                <option value="en">English</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="de">German</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* API Settings */}
                <div className="settings-section">
                    <div className="section-header">
                        <div className="section-icon">🔑</div>
                        <h2>API Settings</h2>
                    </div>
                    <div className="settings-content">
                        <div className="setting-item">
                            <label htmlFor="apiKey">API Key</label>
                            <div className="api-key-wrapper">
                                <input
                                    type="password"
                                    id="apiKey"
                                    value={apiSettings.apiKey}
                                    readOnly
                                    className="setting-input"
                                />
                                <button className="regenerate-btn">Regenerate</button>
                            </div>
                        </div>
                        <div className="setting-item">
                            <label htmlFor="rateLimit">Rate Limit (requests/hour)</label>
                            <input
                                type="number"
                                id="rateLimit"
                                value={apiSettings.rateLimit}
                                onChange={(e) => setApiSettings({ ...apiSettings, rateLimit: parseInt(e.target.value) })}
                                className="setting-input"
                            />
                        </div>
                        <div className="setting-item">
                            <label htmlFor="webhook">Webhook URL</label>
                            <input
                                type="url"
                                id="webhook"
                                value={apiSettings.webhookUrl}
                                onChange={(e) => setApiSettings({ ...apiSettings, webhookUrl: e.target.value })}
                                placeholder="https://your-domain.com/webhook"
                                className="setting-input"
                            />
                        </div>
                        <button className="test-webhook-btn">Test Webhook</button>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="settings-section danger-zone">
                    <div className="section-header">
                        <div className="section-icon">⚠️</div>
                        <h2>Danger Zone</h2>
                    </div>
                    <div className="settings-content">
                        <div className="danger-item">
                            <div>
                                <h3>Clear All Data</h3>
                                <p>Remove all claims and verification history</p>
                            </div>
                            <button className="danger-btn">Clear Data</button>
                        </div>
                        <div className="danger-item">
                            <div>
                                <h3>Reset to Defaults</h3>
                                <p>Reset all settings to factory defaults</p>
                            </div>
                            <button className="danger-btn">Reset Settings</button>
                        </div>
                        <div className="danger-item">
                            <div>
                                <h3>Delete Account</h3>
                                <p>Permanently delete your account and all data</p>
                            </div>
                            <button className="danger-btn">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="settings-footer">
                <button onClick={handleSave} className="save-btn">
                    Save All Changes
                </button>
            </div>
        </div>
    );
}
