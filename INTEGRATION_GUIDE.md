# Vero Dashboard - Integration Guide

## ✅ What's Working

The **Vero Truth Guardian Dashboard** is now fully operational with the following features:

### 🎨 UI Components
- **Dark Mode Design**: Premium glassmorphism aesthetic with deep navy backgrounds
- **Live Feed Display**: Real-time claim cards with verdict badges (✅ True, ❌ False, ⚠️ Unclear)
- **Confidence Scores**: Visual confidence percentage with color-coded indicators
- **Source Citations**: Clickable links to verification sources
- **Stats Dashboard**: Claims monitored, misinformation blocked, and verified facts counters
- **Refresh Button**: Manual trigger to fetch new claims from the Lyzr agent

### 🔌 Lyzr AI Integration
- **API Connection**: Successfully integrated with your Lyzr agent (`68f4bbc4ef5b6c13ef9109d5`)
- **Server Actions**: Next.js server-side API calls to Lyzr inference endpoint
- **Response Parsing**: Automatic JSON extraction from agent responses (handles markdown wrapping)
- **Fallback Data**: Graceful degradation with mock data if API fails
- **Dynamic Sessions**: Unique session IDs generated per request

### 📊 Current Status
The dashboard is **live at http://localhost:3000** and displays:
- 3 verification claims (from Lyzr API or fallback data)
- Each claim shows: statement, verdict, confidence score, summary, and sources
- Responsive layout that works on all screen sizes

---

## 🔧 Technical Architecture

### File Structure
```
vero-web/
├── src/
│   ├── app/
│   │   ├── actions.ts          # Server action for Lyzr API calls
│   │   ├── globals.css         # Design system & theme
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main dashboard page
│   └── components/
│       └── ClaimCard.tsx       # Claim display component
```

### API Integration Details

**Endpoint**: `https://agent-prod.studio.lyzr.ai/v3/inference/chat/`

**Request Format**:
```json
{
  "user_id": "riddhizunjarrao669@gmail.com",
  "agent_id": "68f4bbc4ef5b6c13ef9109d5",
  "session_id": "vero-session-{timestamp}",
  "message": "Provide 3 example verified claims as a JSON array..."
}
```

**Response Handling**:
1. Extract `response` field from API response
2. Strip markdown code blocks (```json ... ```)
3. Parse JSON array
4. Map to `ClaimData` interface
5. Fallback to mock data if parsing fails

---

## 🚀 How to Use

### Running the Dashboard
```bash
cd vero-web
npm run dev
```
Access at: **http://localhost:3000**

### Fetching New Claims
1. Click the **"Refresh Feed"** button in the dashboard
2. The system calls your Lyzr agent with a new session ID
3. Claims are parsed and displayed automatically
4. If the API fails, fallback mock data is shown

### Customizing the Agent Prompt
Edit the `message` field in `src/app/actions.ts` (line 62) to change what the agent returns:

```typescript
message: "Your custom prompt here. Ask for specific claim types, formats, etc."
```

---

## 🎯 Next Steps & Enhancements

### Recommended Improvements

1. **Real-Time Updates**
   - Add WebSocket connection for live claim streaming
   - Auto-refresh every 30 seconds
   - Push notifications for high-priority claims

2. **Advanced Filtering**
   - Filter by verdict type (True/False/Unclear)
   - Search claims by keyword
   - Date range filtering

3. **Analytics Dashboard**
   - Charts showing misinformation trends
   - Source reliability scores
   - Geographic distribution of claims

4. **User Interaction**
   - Submit new claims for verification
   - Upvote/downvote claim relevance
   - Share verified claims on social media

5. **Agent Enhancements**
   - Connect to live news APIs (NewsAPI, Google News)
   - Integrate fact-checking databases (Snopes, PolitiFact)
   - Add sentiment analysis for claim urgency

### Production Deployment

Before deploying to production:

1. **Environment Variables**: Move API credentials to `.env.local`
   ```bash
   LYZR_API_KEY=sk-default-ljt1NHnRW7ScjrKWI1XJSaN7kV8WPVxn
   LYZR_AGENT_ID=68f4bbc4ef5b6c13ef9109d5
   LYZR_USER_ID=riddhizunjarrao669@gmail.com
   ```

2. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

3. **Deploy to Vercel** (recommended for Next.js)
   ```bash
   vercel deploy
   ```

---

## 📝 Agent Configuration

Your Lyzr agent is configured with:
- **Model**: GPT-4o-mini
- **Temperature**: 0.7 (balanced creativity/accuracy)
- **Top P**: 0.9
- **Response Format**: Text (with JSON extraction)

The agent follows the **Vero system prompt** you defined, which includes:
- Claim extraction and verification
- Evidence-based reasoning
- Confidence scoring
- Source citation requirements
- Ethical guidelines for misinformation handling

---

## 🐛 Troubleshooting

### Claims Not Loading
- Check browser console for API errors
- Verify Lyzr API key is valid
- Ensure agent ID is correct
- Fallback data should still display

### Styling Issues
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `npm run dev`

### API Rate Limits
- Lyzr may have rate limits on the free tier
- Implement caching to reduce API calls
- Use fallback data during high traffic

---

## 📞 Support

For Lyzr-specific issues:
- Documentation: https://docs.lyzr.ai
- API Reference: https://agent-prod.studio.lyzr.ai/docs

For Next.js issues:
- Documentation: https://nextjs.org/docs

---

**Built for Mumbai Hacks 2025** 🚀
**Vero - Truth Guardian AI**
