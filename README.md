<<<<<<< HEAD
# Cupid Messenger

A real-time messaging application built with Next.js, Firebase, and Prisma.

## Features

- 🔐 Secure authentication with NextAuth
- 💬 Real-time messaging using Firebase Realtime Database
- 👥 Friend request system
- 🎨 Modern UI with Material UI and Tailwind CSS
- 📱 Responsive design
- 🔒 PIN-based security layer
- 🖼️ Profile image upload support
- 🚀 Optimized with Vercel Analytics and Speed Insights

## Tech Stack

- **Framework:** Next.js 14
- **Database:** MongoDB (with Prisma ORM)
- **Real-time Database:** Firebase Realtime Database
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS, Material UI
- **File Storage:** Firebase Storage
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Firebase project

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="your_mongodb_url"

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_DATABASE=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cupid-messenger.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Generate Prisma client:

```bash
npm run generate
```

4. Run the development server:
=======
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
>>>>>>> b55933d93a22cd983454805791200f6e64706820

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
<<<<<<< HEAD
# or
yarn dev
```
=======
>>>>>>> b55933d93a22cd983454805791200f6e64706820

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
<<<<<<< HEAD

```
├── app/                  # Next.js app directory
│   ├── _components/      # Reusable components
│   ├── _firebase/        # Firebase configuration
│   ├── _helper/          # Helper functions
│   ├── _lib/             # Library functions
│   ├── api/              # API routes
│   └── direct/           # Messaging routes
├── prisma/               # Prisma schema and configuration
├── public/               # Static files
└── auth.js               # Authentication configuration
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run generate` - Generate Prisma client


=======
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

>>>>>>> b55933d93a22cd983454805791200f6e64706820
