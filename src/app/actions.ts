'use server';

import { ClaimData } from '@/components/ClaimCard';

const API_KEY = 'sk-default-ljt1NHnRW7ScjrKWI1XJSaN7kV8WPVxn';
const AGENT_ID = '68f4bbc4ef5b6c13ef9109d5';
const USER_ID = 'riddhizunjarrao669@gmail.com';

// Fallback mock data in case API fails
const FALLBACK_DATA: ClaimData[] = [
    {
        id: 'fallback-1',
        claim: 'A second earthquake of 7.1 magnitude has struck Mumbai.',
        verdict: 'False',
        confidence_score: 0.96,
        summary: 'IMD and NDTV confirm no second earthquake occurred. The report originated from an unverified account.',
        sources: [
            { name: 'IMD', url: 'https://mausam.imd.gov.in' },
            { name: 'NDTV', url: 'https://ndtv.com' }
        ],
        timestamp: new Date().toISOString()
    },
    {
        id: 'fallback-2',
        claim: 'The ABC Dam in River City has burst due to heavy rainfall.',
        verdict: 'False',
        confidence_score: 0.93,
        summary: 'City Water Authority confirms the dam is intact. Water levels are high but stable.',
        sources: [
            { name: 'Reuters', url: 'https://reuters.com' },
            { name: 'River City Gov', url: 'https://gov.rivercity' }
        ],
        timestamp: new Date().toISOString()
    },
    {
        id: 'fallback-3',
        claim: 'New virus strain "X-25" detected in public transport.',
        verdict: 'Unclear',
        confidence_score: 0.45,
        summary: 'Information currently inconclusive. Official statements from Health Ministry pending verification.',
        sources: [
            { name: 'Social Media', url: '#' }
        ],
        timestamp: new Date().toISOString()
    }
];

export async function fetchClaims(): Promise<ClaimData[]> {
    try {
        // Generate a unique session ID for each request
        const sessionId = `vero-session-${Date.now()}`;

        const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                user_id: USER_ID,
                agent_id: AGENT_ID,
                session_id: sessionId,
                message: `Today is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Search the internet RIGHT NOW for the 6 most recent trending claims, misinformation, or breaking news from the last 6 hours. Return REAL claims that are currently being discussed on social media, news sites, or fact-checking platforms. Each item must have: claim (string), verdict (True/False/Unclear based on current fact-checks), confidence_score (number 0-1), summary (concise explanation), sources (array of REAL, WORKING URLs from authoritative sites like Reuters, AP, WHO, Gov websites), timestamp (current ISO date). Focus on high-impact topics like health, politics, or natural disasters. Return ONLY the JSON array with REAL data, not examples.`,
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return FALLBACK_DATA;
        }

        const data = await response.json();
        console.log('Lyzr API Response:', data);

        // The agent returns the response in a 'response' field, potentially wrapped in markdown
        let content = data.response || '';

        // Clean up markdown code blocks if present
        content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const parsedClaims = JSON.parse(content);

            // Ensure it's an array
            if (Array.isArray(parsedClaims) && parsedClaims.length > 0) {
                // Add IDs if missing and ensure correct types
                return parsedClaims.map((claim: any, index: number) => ({
                    id: claim.id || `claim-${Date.now()}-${index}`,
                    claim: claim.claim || 'No claim text',
                    verdict: ['True', 'False', 'Unclear'].includes(claim.verdict) ? claim.verdict : 'Unclear',
                    confidence_score: typeof claim.confidence_score === 'number' ? claim.confidence_score : 0.5,
                    summary: claim.summary || 'No summary available',
                    sources: Array.isArray(claim.sources) ? claim.sources : [],
                    timestamp: claim.timestamp || new Date().toISOString(),
                }));
            } else {
                console.warn('Parsed claims is not a valid array, using fallback data');
                return FALLBACK_DATA;
            }
        } catch (parseError) {
            console.error('Failed to parse JSON from agent response:', content);
            console.error('Parse error:', parseError);
            return FALLBACK_DATA;
        }
    } catch (error) {
        console.error('Error fetching claims:', error);
        return FALLBACK_DATA;
    }
}

export async function verifyClaim(text: string): Promise<ClaimData | null> {
    try {
        const sessionId = `vero-verify-${Date.now()}`;

        const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                user_id: USER_ID,
                agent_id: AGENT_ID,
                session_id: sessionId,
                message: `Today is ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. Fact-check this claim RIGHT NOW by searching current, authoritative sources: "${text}". Return a JSON object (NOT an array) with: claim, verdict (True/False/Unclear based on CURRENT evidence), confidence_score (0-1), summary (explain what you found), sources (array of REAL, WORKING URLs from Reuters, WHO, Gov sites, etc. that you actually checked), timestamp (current ISO date). IMPORTANT: Search the internet NOW and cite at least 2 real, authoritative sources with valid URLs. Do not include markdown.`,
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return null;
        }

        const data = await response.json();
        let content = data.response || '';
        content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

        try {
            const parsedClaim = JSON.parse(content);

            // Handle if agent returns an array instead of object
            const claimObj = Array.isArray(parsedClaim) ? parsedClaim[0] : parsedClaim;

            return {
                id: `verify-${Date.now()}`,
                claim: claimObj.claim || text,
                verdict: ['True', 'False', 'Unclear'].includes(claimObj.verdict) ? claimObj.verdict : 'Unclear',
                confidence_score: typeof claimObj.confidence_score === 'number' ? claimObj.confidence_score : 0.5,
                summary: claimObj.summary || 'Analysis complete.',
                sources: Array.isArray(claimObj.sources) ? claimObj.sources : [],
                timestamp: new Date().toISOString(),
            };
        } catch (parseError) {
            console.error('Failed to parse verification response:', content);
            return null;
        }
    } catch (error) {
        console.error('Error verifying claim:', error);
        return null;
    }
}

export async function checkUpdates(claim: string, sources: { name: string, url: string }[]): Promise<string | null> {
    try {
        const sessionId = `vero-update-${Date.now()}`;
        const sourceList = sources.map(s => `${s.name}: ${s.url}`).join('\n');

        const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': API_KEY,
            },
            body: JSON.stringify({
                user_id: USER_ID,
                agent_id: AGENT_ID,
                session_id: sessionId,
                message: `Check for the latest updates on this claim: "${claim}". specifically by referencing these existing sources:\n${sourceList}\n\nHave any of these sources updated their information? Is there a new development? Return a concise summary of the latest status based ONLY on these sources.`,
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.response || 'No updates found.';
    } catch (error) {
        console.error('Error checking updates:', error);
        return null;
    }
}
