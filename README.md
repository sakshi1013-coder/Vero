# Vero | Truth Guardian

**Vero** is an agentic AI system designed to safeguard truth in times of uncertainty. This dashboard provides a real-time interface for monitoring verified information streams, detecting misinformation, and communicating verified updates.

## 🚀 Features

-   **Live Verification Feed**: Real-time stream of claims with verification verdicts.
-   **Verdict System**: Clear indicators for ✅ Verified True, ❌ Likely False, and ⚠️ Unclear.
-   **Confidence Scores**: Transparent AI confidence metrics.
-   **Source Citations**: Direct links to verified sources for every claim.
-   **Premium Design**: Dark mode aesthetic for high-trust environments.

## 🛠️ Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Language**: TypeScript
-   **Styling**: CSS Modules / Global CSS (Custom Design System)
-   **Icons**: Geist Font

## 🏃‍♂️ Getting Started

1.  Install dependencies:
    ```bash
    npm install
    ```

2.  Run the development server:
    ```bash
    npm run dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔌 Integration with Lyzr.ai

To connect this dashboard to your Lyzr.ai agent:

1.  Navigate to `src/app/page.tsx`.
2.  Locate the `useEffect` hook.
3.  Replace the `MOCK_DATA` assignment with a `fetch` call to your agent's API.

```typescript
useEffect(() => {
  async function fetchClaims() {
    const response = await fetch('YOUR_LYZR_AGENT_API_ENDPOINT');
    const data = await response.json();
    setClaims(data);
  }
  fetchClaims();
}, []);
```

## 📄 License

MIT
