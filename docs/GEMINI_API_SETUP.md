# Gemini AI Chat Setup Guide

## Overview
The ConnectVerse chat feature in `connect.html` is powered by Google's Gemini AI, providing intelligent, contextual, and engaging cosmic conversations.

## Features
✨ **AI-Powered Conversations**: Natural, contextual responses aligned with ConnectVerse's cosmic theme
🧠 **Memory**: Maintains conversation history for coherent, flowing dialogue
🌌 **Cosmic Personality**: AI companion with mystical, spiritual, and empathetic personality
🔄 **Automatic Fallback**: Uses mock responses if API key is not configured

## Setup Instructions

### Step 1: Get Your Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your new API key

### Step 2: Add API Key to Your Project
1. Open `connect.html` in your code editor
2. Find the line (around line 478):
   ```javascript
   const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';
   ```
3. Replace `'YOUR_GEMINI_API_KEY_HERE'` with your actual API key:
   ```javascript
   const API_KEY = 'AIzaSyC1234567890abcdefghijklmnopqrstuv'; // Your actual key
   ```
4. Save the file

### Step 3: Test the Chat
1. Open `connect.html` in your browser
2. Look for the AI status indicator in the chat header:
   - 🤖 **AI Active** = Gemini AI is working
   - ⚠️ **Mock Mode** = Using fallback responses (check your API key)
3. Send a message and watch the AI respond!

## How It Works

### AI Personality
The AI is configured with a cosmic personality that:
- Believes in spiritual connections and destiny
- Discusses astrology, crystals, and cosmic energy
- Keeps responses concise (1-3 sentences)
- Maintains a warm, empathetic, and mystical tone

### Features
- **Contextual Responses**: AI remembers the last 10 message exchanges
- **Spontaneous Messages**: AI occasionally initiates conversation
- **Typing Indicators**: Shows when AI is "thinking"
- **Error Handling**: Automatically falls back to mock responses if API fails

## Cost Information
- Gemini API offers a **free tier** with generous limits
- Free tier: 60 requests per minute
- Perfect for development and moderate usage
- Check [Google AI Pricing](https://ai.google.dev/pricing) for latest info

## Troubleshooting

### "Mock Mode" Still Shows After Adding Key
- Make sure you saved the file
- Check that there are no extra spaces in the API key
- Verify the key is wrapped in quotes: `'AIza...'`
- Refresh your browser (hard refresh: Ctrl+Shift+R)

### API Key Not Working
- Ensure you copied the complete key
- Check if the key is enabled in Google AI Studio
- Verify you have no billing or quota issues

### Console Errors
- Open browser DevTools (F12) and check the Console tab
- Common errors:
  - `API key not valid` - Check your key
  - `Quota exceeded` - Wait or check your limits
  - `CORS error` - Make sure you're using `type="module"` in the script tag

## Security Best Practices

⚠️ **Important**: Never commit API keys to public repositories!

### For Development:
- Keep the key in the HTML file for local testing
- Use mock mode when sharing the project

### For Production:
- Move API key to environment variables
- Use a backend server to proxy API requests
- Implement rate limiting and user authentication

## Customization

### Adjust AI Personality
Edit the `systemPrompt` variable (around line 485) to change the AI's behavior:
```javascript
const systemPrompt = `Your custom personality here...`;
```

### Change Response Length
Modify `maxOutputTokens` in the `generationConfig`:
```javascript
generationConfig: {
    maxOutputTokens: 150, // Increase for longer responses
    temperature: 0.9,     // Higher = more creative (0-1)
}
```

### Adjust Chat History
Change how much context the AI remembers:
```javascript
if (chatHistory.length > 20) {  // Change 20 to your preferred number
    chatHistory = chatHistory.slice(-20);
}
```

## Need Help?
- 📚 [Gemini API Documentation](https://ai.google.dev/docs)
- 💬 [Google AI Community](https://discuss.ai.google.dev/)
- 🐛 Check browser console for error messages

---

**Ready to enable cosmic conversations?** Follow the steps above and start chatting with your AI companion! ✨🌌
