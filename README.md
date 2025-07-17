# NotesNest

NotesNest is a full-stack, feature-rich note-taking application built with modern web technologies. It provides a seamless and intuitive platform for users to create, manage, and organize their thoughts and ideas. With a clean interface and real-time data synchronization, NotesNest ensures that your notes are always accessible and up-to-date.

## Features

- **User Authentication**: Secure login and registration system powered by Firebase Authentication.
- **Forgot Password**: Users can securely reset their password via an email link.
- **Create & Edit Notes**: A powerful and intuitive editor allows you to create and modify notes with ease.
- **Markdown Support**: Write notes in Markdown and see them beautifully rendered in the viewer.
- **Real-Time Database**: All notes are stored and synchronized in real-time using Firestore, ensuring your data is always current across devices.
- **Responsive Design**: A mobile-first design ensures a great user experience on desktops, tablets, and smartphones.
- **Note Management**: Easily browse, select, and delete notes through a sleek side navigation panel.
- **Instant UI Updates**: The interface updates instantly upon creating or deleting notes, without needing a page refresh.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/)
- **Frontend**: [React](https://reactjs.org/)
- **Backend & Database**: [Firebase](https://firebase.google.com/) (Firestore & Firebase Authentication)
- **Styling**: CSS Modules & Global Styles
- **Libraries**:
  - `markdown-to-jsx`: For rendering Markdown content.
  - `react-icons`: For including high-quality icons.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/codex-blip/next-js.git
    cd next-js
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the root of your project and add your Firebase project's configuration keys. You can find these in your Firebase project console.

    ```env
    NEXT_PUBLIC_FIREBASE_APIKEY=your_api_key
    NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=your_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECTID=your_project_id
    NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=your_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=your_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APPID=your_app_id
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This application is ready for deployment on [Vercel](https://vercel.com/), the platform from the creators of Next.js.

1.  Push your code to your GitHub repository.
2.  Sign up or log in to your Vercel account.
3.  Import your GitHub repository.
4.  Add your Firebase environment variables in the Vercel project settings.
5.  Deploy! Vercel will automatically build and deploy your Next.js application.

## Acknowledgements

This project was inspired by the work of [jamezmca](https://github.com/jamezmca).
