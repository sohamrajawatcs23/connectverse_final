# ConnectVerse - Interaction Design

## Core User Journey Flow

### 1. Entry Portal (Login/Onboarding)
**Primary Interaction**: New user registration and cosmic identity creation
- **Auto-generated Private ID**: Displayed as glowing cosmic code
- **Public Username**: Text input with space-themed placeholder
- **Interests Selection**: Multi-select tag system with cosmic categories (Astral Projection, Cosmic Meditation, Stargazing, etc.)
- **Avatar Selection**: Floating 3D character icons that rotate and glow on hover
- **Mood Palette**: Color picker that changes entire UI theme in real-time
- **Begin Journey Button**: Ripple animation that dissolves into Discover page

### 2. Discovery Universe (Random Chat)
**Primary Interaction**: Randomized video/audio chat connections
- **Split Circular Layout**: Left side shows partner video feed, right side shows user's camera as floating orb
- **Holographic Profile Cards**: Swipeable cards with partner information and aura colors
- **Control Panel**: 
  - Next button (smooth transition to new partner)
  - M toggle (audio mute with visual feedback)
  - Audio Only mode (video fade-out effect)
  - Report button (safety feature with confirmation)
- **Aura Matching**: Background morphs to blend both users' selected mood colors
- **Special Connection Prompt**: "Found Someone Special?" overlay with sparkle animation

### 3. Connect Mode (1:1 Bond Chat)
**Primary Interaction**: Deep conversation and bonding system
- **Dual Aura Background**: Animated gradient blending both users' mood colors
- **Glowing Message Bubbles**: Text chat with cosmic particle effects
- **Floating Action Buttons**:
  - Voice call (microphone icon with pulse animation)
  - Video call (camera icon with glow effect)
  - Send Bond Request (heart icon that beats faster over time)
  - Report/Block (shield icon for safety)
- **Reaction System**: Emoji reactions that float up as colorful orbs
- **Bond Formation**: Pulsing "Form Bond" button that appears after interaction time threshold
- **Bond Animation**: Two orbiting rings that merge into one when bond is accepted

### 4. Tune Space (Community Hub)
**Primary Interaction**: Shared community spaces for bonded users
- **Space Header**: Custom name with banner gradient, live XP rank badge that glows
- **Central Feed**: Mixed content stream (posts, voice threads, live polls)
- **Active Members Panel**: User avatars orbiting in circular motion
- **Quick Access Toolbar**: 
  - Chat (opens group conversation)
  - Post (create new content)
  - Event (schedule activities)
  - Leaderboard (view rankings)
- **Micro-animations**: Glowing edges on hover, floating particles around active content
- **Create Event**: Orb button that expands into event creation form
- **Invite Friends**: Floating invite orbs that can be dragged to spaces

### 5. Leaderboard Map (Galactic Hierarchy)
**Primary Interaction**: 3D visualization of user rankings and achievements
- **3D Constellation View**: Interactive star map with clickable region clusters
- **Zoom System**: 
  - Global view (entire galaxy)
  - National view (country constellations)
  - State view (regional star groups)
  - City view (local star clusters)
- **Ranking Titles**: Visual hierarchy with cosmic titles (Emperor, King, Ruler, Leader)
- **XP Display**: Animated counters with particle effects
- **Token Counters**: Glowing currency displays
- **Join Event**: Context-sensitive event buttons based on selected region

### 6. Events Interface (Live Challenges)
**Primary Interaction**: Real-time community events and competitions
- **Live Event Banner**: Current event with countdown timer and particle effects
- **Participant Feed**: Orbiting avatars around central event icon
- **Region Tabs**: Global/National/Local event filtering with smooth transitions
- **Join Event**: Animated button that triggers voice room entry
- **XP Tracker**: Real-time XP gain with rising particle animations
- **Reward System**: Animated pop-ups for completed challenges
- **Return Flow**: Smooth transition back to Tune Space after event completion

### 7. Profile/Wallet (Identity Evolution)
**Primary Interaction**: Personal dashboard and progression tracking
- **Avatar Centerpiece**: 3D avatar with XP ring and dynamic aura
- **Aura Color Selector**: Real-time color changing with preview
- **Tab System**:
  - Profile: Basic info, mood status, customization
  - Wallet: Token balance, transaction history, purchase options
  - Achievements: Animated showcase of earned titles and badges
  - Settings: Privacy controls, notification preferences, Mood AI toggle
- **XP Ring**: Animated progress indicator that glows and pulses
- **Back to Discover**: Dissolve transition that returns to random chat

### 8. Cosmic Compass (Navigation System)
**Primary Interaction**: Universal floating radial navigation
- **Radial Dock**: Circular menu with 5 morphing icons at bottom-center
- **Icon System**:
  - 🔮 Discover (crystal ball with swirl animation)
  - 💬 Connect (speech bubble with connecting dots)
  - 🌐 Spaces (planet with orbiting moons)
  - ⚔️ Rank (crossed swords with sparkle effects)
  - 🪙 You (user icon with personal aura)
- **Active States**: Glowing and gentle morphing animations for current page
- **Transition System**: Orbiting rotation animations between sections
- **Persistent Component**: Always visible, semi-transparent holographic appearance

## Multi-turn Interaction Loops

### Discovery → Connection Loop
1. User enters Discover mode
2. System matches with random partner
3. User can swipe through multiple partners
4. Special connection prompt appears for compatible matches
5. Transition to Connect Mode for deeper interaction
6. Option to form permanent bond and create Tune Space
7. Return to Discover for more connections

### Community Engagement Loop
1. User creates or joins Tune Space
2. Participates in community activities and events
3. Earns XP and tokens through engagement
4. Rises in leaderboard rankings
5. Unlocks new customization options and titles
6. Creates events to engage community further
7. Continuous cycle of participation and reward

### Progression System Loop
1. User completes onboarding with initial mood selection
2. Engages in random chats to find connections
3. Forms bonds and creates community spaces
4. Participates in events to earn XP and tokens
5. Unlocks achievements and cosmetic upgrades
6. Customizes profile and aura appearance
7. Higher rankings unlock new social features
8. Continuous engagement drives further progression

## Technical Interaction Requirements

### Real-time Features
- WebRTC for video/audio streaming
- Supabase Realtime for messaging and presence
- Live XP and token updates
- Real-time event participation tracking

### Animation Systems
- Framer Motion for React-based transitions
- Three.js for 3D leaderboard visualization
- CSS animations for particle effects and glowing
- Smooth page transitions with dissolve effects

### Data Persistence
- Supabase Auth for user authentication
- Real-time database for chat messages and user presence
- Local storage for mood preferences and UI settings
- Session storage for temporary chat data

This interaction design creates a cohesive, immersive experience where users can seamlessly flow between different modes of engagement while maintaining the cosmic theme throughout their journey in ConnectVerse.