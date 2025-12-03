# Leaderboard Page (leaderboard.html)

## Overview
3D constellation map using THREE.js with ranking views.

## Setup
- ES Module import for THREE: `three.module.js`
- Initialize scene after DOM ready

## Scene Elements
- Camera, renderer, ambient/point lights
- Star field with positions and glow
- UI filters for rank scopes (global/national/state/city)

## Reliability Fixes
- Ensure proper closing tags (`</script></body></html>`) to prevent initialization hangs
- Log initialization steps for debugging

## Troubleshooting
- Scene stuck on "Initializing...": Confirm ES module import and DOM readiness
- Performance issues: Reduce star count or effects; check device GPU
