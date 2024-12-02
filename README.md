# Cupid - Real-Time Chat Application

Cupid is a modern real-time chat application built with Next.js, Firebase, and Material-UI. It provides a seamless messaging experience with features like emoji support, real-time message updates, and friend requests.

## Features

- 💬 Real-time messaging
- 👥 Friend requests system  
- 🔐 Secure authentication
- 😊 Emoji message support
- 📱 Responsive design
- 🖼️ Profile image upload
- 🔍 User search functionality
- 💫 Smooth animations and transitions

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Database & Real-time**: Firebase Realtime Database
- **Storage**: Firebase Storage
- **Authentication**: NextAuth.js
- **UI Components**: Material-UI (MUI)
- **Styling**: Tailwind CSS
- **Form Validation**: Zod
- **Deployment**: [Your deployment platform]

## Getting Started

1. Clone the repository:
bash-
git clone https://github.com/yourusername/cupid-chat.git

2. Install dependencies:

bash
cd cupid-chat
npm install


3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
NEXT_PUBLIC_FIREBASE_API_KEY=

NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

NEXT_PUBLIC_FIREBASE_PROJECT_ID=

NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=

NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=

NEXT_PUBLIC_FIREBASE_APP_ID=

NEXT_PUBLIC_BASE_URL=

NEXTAUTH_SECRET=

NEXTAUTH_URL=

5. Run the development server:
bash
npm run dev

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
cupid-chat/
├── app/
│ ├── components/ # Reusable components
│ ├── firebase/ # Firebase configuration
│ ├── helper/ # Helper functions
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ └── actions/ # Server actions
├── public/ # Static assets
└── ...


## Key Features Explained

### Real-time Messaging
- Messages are delivered instantly using Firebase Realtime Database
- Support for text and emoji messages
- Message history persistence
- Read receipts (coming soon)

### Authentication
- Secure email/password authentication
- Social authentication (coming soon)
- Protected routes and API endpoints

### User Experience
- Mobile-responsive design
- Keyboard-aware input on mobile devices
- Smooth animations and transitions
- Intuitive user interface


## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Material-UI](https://mui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

