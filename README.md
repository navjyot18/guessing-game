# 🌍 Guessing Game

A fun and interactive guessing game where users enter a username to start playing. Players guess locations based on clues, and when they guess correctly, confetti appears, and their score increases. Players can share their game link via WhatsApp, allowing others to join and compare scores.

## 🚀 Features
- **Username Input:** Users enter a username to begin the game.
- **Guessing Mechanism:** Players guess locations based on provided clues.
- **Score Tracking:** Score increases when a correct guess is made.
- **Confetti Celebration:** Displays confetti animation on correct guesses.
- **Game Sharing:** Users can share their game link via WhatsApp.
- **Leaderboard:** Invited players can see the scores of those who invited them.

## 🛠️ Tech Stack
- **Frontend:** React (SPA - Single Page Application)
- **UI Components:** Radix UI (for built-in accessible components)
- **Confetti:** Used for visual celebration of correct answers
- **State Management:** React Hooks
- **Testing:** React Testing Library
- **Backend:** Firebase (Firestore for storing city, country, facts & clues)
- **Deployment:** Firebase Hosting

## 📂 Project Structure
```
📦 guessing-game
├── 📁 src
│   ├── 📁 components  # React UI Components
│   ├── 📁 repo        # Services handling game logic
│   ├── 📁 constants   # Constant values for the game
│   ├── App.tsx       # Main App component
│   ├── firebaseConfig.js # Firebase setup
│   ├── index.tsx     # Entry point
├── 📁 public         # Static assets
├── .gitignore        # Git ignored files (including .env)
├── package.json      # Project dependencies
├── README.md         # Project documentation
```

## 🏗️ Setup & Installation
### 1️⃣ Clone the Repository


### 2️⃣ Install Dependencies
```sh
 npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the project root and add:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the Development Server
```sh
 npm run start
```

### 5️⃣ Run Tests
```sh
 npm test
```

## 🚀 Deployment
### Firebase Hosting Deployment
1. Build the project:
   ```sh
   npm run build
   ```
2. Deploy to Firebase:
   ```sh
   firebase deploy
   ```

## 🎯 Future Enhancements
- Add more animations & sound effects.
- Improve game logic with timed challenges.
- Implement authentication for personalized leaderboards.

## 🤝 Contribution
Feel free to fork the repository, submit issues, or create pull requests to enhance the game!

## 🛡️ License
Navjyot Bhele

---
### 🎮 Have fun guessing and competing with friends! 🎉

