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

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

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
