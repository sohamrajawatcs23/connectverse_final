# Discover Page (discover.html)

## Overview
Find partners and navigate to the cosmic leaderboard.

## Controls
- "Join Cosmic Stream" button: Navigates to `leaderboard.html` with fade transition
- Notifications: Lightweight feedback on interactions

## Behavior
- Uses Anime.js for subtle transitions
- Shares global navbar logic via `main.js`

## Troubleshooting
- Button not navigating: Ensure `data-page="leaderboard.html"` and `main.js` is loaded with `defer`
