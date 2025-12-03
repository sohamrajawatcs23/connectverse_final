# Connect Page (connect.html)

## Overview
Core chat experience with Gemini AI, voice-to-AI, and WebRTC video overlay.

## Controls
- `#voice-btn`: Start/stop AI voice conversation
- `#video-btn`: Start/stop camera overlay (draggable)
- `#heart-btn`: Send bond request (animation)
- Input field + send button for text chat

## AI Chat
- Model: `gemini-2.0-flash` via `@google/generative-ai@0.21.0`
- History: Last ~20 messages retained in `chatHistory`
- Fallback: Mock responses when SDK/API issues occur

## Voice-to-AI
- Recognition: Web Speech API (`SpeechRecognition`/`webkitSpeechRecognition`)
- Synthesis: `window.speechSynthesis` with voice selection
- Behavior:
  - `continuous=false`, `interimResults=true` for reliability
  - Auto-restart after end or recoverable errors
  - Pauses listening while AI speaks, then resumes

## Video Overlay
- Capture: `getUserMedia({ audio: true, video: { width:{ideal:1280}, height:{ideal:720}, facingMode:'user' } })`
- Overlay: Floating `#video-overlay` with Anime.js appearance
- Draggable: Mouse/touch drag within viewport, constrained
- Cleanup: Stops tracks and removes overlay on toggle off

## Troubleshooting
- No voice recognized: Check mic permissions; watch console logs; speaking pauses should end recognition
- Camera blocked: Requires HTTPS; allow permissions
- AI errors: Verify model name and SDK version; consider server-side proxy
