# ConnectVerse — Cosmic Social Platform

## Overview
- **Purpose:** A cosmic-themed social platform for chatting, voice/video calling, discovering partners, and viewing global leaderboards.
- **Stack:** Multi-page HTML app using Tailwind CSS, Anime.js, p5.js, WebRTC, THREE.js, and Google Gemini AI (`gemini-2.0-flash`).
- **Architecture:** Central navigation and utilities in `main.js`; feature pages in `OKComputer_ConnectVerse 交互设计/*.html`.

## Key Features
- **Unified Navigation:** Navbar with `data-page` routes, handled by `main.js`.
- **AI Chat:** Context-aware chat powered by Gemini; resilient fallback responses when API unavailable.
- **Voice-to-AI:** Real-time speech recognition (Web Speech API) and synthesis for direct voice conversations with Gemini.
- **Video Calls:** WebRTC local camera/microphone overlay with draggable floating window.
- **3D Leaderboard:** THREE.js constellation visualization with rank filters (global/national/state/city).
- **Discover Partners:** Thematic discovery page and “Join Cosmic Stream” linking to leaderboard.
- **Cosmic UI:** Tailwind + Anime.js for polished, animated UI; persistent user state via `localStorage`.

## Project Structure
```
OKComputer_ConnectVerse 交互设计/
  connect.html          # Chatroom + AI + Voice/Video
  discover.html         # Partner discovery and navigation
  events.html           # Events page (static/extendable)
  index.html            # Landing page
  leaderboard.html      # 3D constellation map
  profile.html          # User profile (extendable)
  space.html            # Space-themed scene (static/extendable)
  main.js               # Navigation, audio gating, performance utilities
  resources/            # Assets (images/fonts/etc.)
```

## Pages and Behaviors
- `index.html`: Entry page with navbar; loads `main.js` with `defer`.
- `connect.html`: Chat UI, Gemini integration, speech recognition/synthesis voice chat, WebRTC video overlay, draggable camera window.
- `discover.html`: Discovery UI; “Join Cosmic Stream” navigates to `leaderboard.html`.
- `leaderboard.html`: THREE.js ES-module scene; constellation map with stars and ranks.
- `events.html`, `space.html`, `profile.html`: Thematic pages; share navbar and animations.

## Navigation System (`main.js`)
- **Routing:** Elements with `data-page="<file>.html"` navigate via `navigateToPage()`.
- **AudioContext gating:** Audio starts only after a user gesture to satisfy browser policies.
- **Performance timing:** Window `load` event with proper elapsed-time calculation; avoids negative times.

## AI Chat (Gemini)
- **SDK:** `@google/generative-ai@0.21.0` via importmap.
- **Model:** `gemini-2.0-flash` selected for speed and reliability.
- **Context:** Maintains last ~20 messages in `chatHistory`; includes system prompt for cosmic persona.
- **Fallback:** Mock responses when API errors occur (e.g., CORS, quota, connectivity).

### Configuration Snippet (in `connect.html`)
```
<script type="importmap">
{
  "imports": {
    "@google/generative-ai": "https://esm.run/@google/generative-ai@0.21.0"
  }
}
</script>
```

### Usage
- Enter a message and send; AI response appears with typing indicator.
- Voice chat: press the microphone button; speak; AI replies with synthesized speech and text.

## Voice-to-AI Chat
- **Recognition:** Web Speech API (`SpeechRecognition`/`webkitSpeechRecognition`).
- **Synthesis:** `window.speechSynthesis` with intelligent voice selection.
- **Flow:** When listening, your speech → transcript → Gemini reply → spoken back → auto-resume listening.
- **Reliability tweaks:** `continuous=false`, `interimResults=true`, auto-restart after end or recoverable errors.

## WebRTC Video Overlay
- **Capture:** `navigator.mediaDevices.getUserMedia({ audio: true, video: { width: {ideal:1280}, height:{ideal:720}, facingMode:'user' } })`.
- **Overlay:** Floating container (`#video-overlay`) added to `document.body`; smooth appearance via Anime.js.
- **Draggable:** Click/touch drag within viewport; movement constrained and animated.
- **Cleanup:** Tracks stopped on toggle off; overlay removed with exit animation.

## 3D Leaderboard (THREE.js)
- **Module:** ES module import `three.module.js`.
- **Scene:** Camera, renderer, lights, and star field; error-handling guards.
- **Fixes:** Proper closing tags; initialization only after DOM ready; logging for debug.

## Styling and Animations
- **Tailwind CSS:** CDN-loaded; warnings suppressed via config.
- **Anime.js:** Button pulses, overlay fades/scales, micro-interactions.
- **Fonts:** Orbitron + Inter from Google Fonts; cosmic palette via CSS variables.

## Data Persistence
- **LocalStorage:** Stores lightweight user state (e.g., preferences, counts).
- **Chat History:** In-memory `chatHistory`; persisted storage optional.

## Security & Privacy
- **API Key:** Do not ship production keys client-side. Move Gemini calls server-side or use a proxy; store keys via environment variables.
- **Media Permissions:** Microphone/camera only accessed after user gesture; clear user indicators when active.
- **CORS:** Avoid direct `fetch` to Gemini; prefer official SDK or server proxy.

## Troubleshooting
- **Gemini 404 / model errors:** Confirm `gemini-2.0-flash`. SDK `@google/generative-ai@0.21.0`. Check quota and billing.
- **CORS failures:** Use SDK from browser; otherwise set a backend proxy.
- **AudioContext blocked:** Initialize audio on user click; don’t auto-play.
- **Negative page load time:** Use `window.load` and correct start/end timestamps.
- **THREE.js map stuck:** Ensure ES module import, correct canvas init, and closed tags.
- **Speech recognition “no voice recognized”:** Use `continuous=false`, `interimResults=true`, speak clearly, watch console logs; auto-restarts enabled.
- **WebRTC not capturing:** Check permissions; HTTPS required for camera/mic on many browsers.

## Development Tips
- Test pages individually with a local server over HTTPS for mic/cam.
- Use browser devtools: Console for logs; Network for Gemini calls; Media tab for WebRTC.
- Keep animations subtle; avoid heavy DOM reflows.

## Roadmap
- Add signaling server for real peer-to-peer calls.
- Secure backend for AI calls and chat synchronization.
- Replace CDN Tailwind with built build pipeline.
- WebSocket-based real-time messaging and presence.
- Persist chat history and user profiles.

## Quick Start
1. Open `index.html` in a modern browser (Chrome recommended).
2. Ensure internet connectivity for CDNs and Gemini SDK.
3. For voice/video, run via HTTPS. Example (PowerShell):

```powershell
# Option A: Use VS Code Live Server (recommended)
# - Install "Live Server" extension, open folder, right-click index.html → Open with Live Server

# Option B: Node HTTPS static server (requires Node.js)
npm init -y; npm install http-server -D
npx http-server . -p 8443 --ssl --cert ./localhost.crt --key ./localhost.key
# Generate a self-signed cert if needed (Windows, PowerShell as Admin):
# Install OpenSSL or use mkcert, then place cert/key in workspace root.

# Option C: Python HTTPS server (requires Python 3)
# Create certs, then:
python -m http.server 8443 --bind 127.0.0.1
```

## Page Details
- **`connect.html`:**
  - Buttons: `#voice-btn` starts AI voice chat; `#video-btn` shows draggable camera overlay; `#heart-btn` sends bond request animation.
  - AI: Uses `gemini-2.0-flash` via `@google/generative-ai`; chat history retained within session.
  - Voice: Web Speech API recognition with auto-restart; synthesis speaks replies.
  - Detailed guide: See `docs/connect.md`.

- **`discover.html`:**
  - "Join Cosmic Stream" navigates to `leaderboard.html` with a fade transition.
  - Notification and subtle animations for discovery interactions.
  - Detailed guide: See `docs/discover.md`.

- **`leaderboard.html`:**
  - THREE.js starfield; ranks and filters rendered in scene.
  - Ensure ES module import is available and page fully closed with proper tags.
  - Detailed guide: See `docs/leaderboard.md`.

- **`profile.html`, `events.html`, `space.html`, `index.html`:**
  - Share navbar and theme; extend content and actions as needed.
  - Detailed guides: See `docs/profile.md`, `docs/events.md`, `docs/space.md`, `docs/index.md`.


## Notes
- Browsers differ in speech API availability; Chrome has best support.
- If speech synthesis voice list is empty initially, call `speechSynthesis.getVoices()` after a small delay.
