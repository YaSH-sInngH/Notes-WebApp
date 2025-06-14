# NotesHub – User Management & Notes Web App

NotesHub is a modern, full-stack web application for managing users and their notes. It features a beautiful, responsive UI, color-coded notes, markdown support, note sharing, and essential user authentication features.

#### Link: https://notes-web-app-phi.vercel.app/
---

## Features

- **User Authentication:** Register, login, and secure your notes.
- **Forgot/Reset Password:** Easily reset your password via email.
- **Dashboard:** View, search, and filter all your notes in a clean, organized layout.
- **Color-Coded Notes:** Assign colors to notes for easy categorization.
- **Markdown Support:** Write notes using Markdown and see them beautifully rendered.
- **Pin, Archive, Trash:** Organize notes by pinning, archiving, or moving them to trash.
- **Note Sharing:** Share notes via a read-only link with anyone.
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile devices.

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Email:** Nodemailer (or SendGrid/Mailgun for production)
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel/Render/Netlify (frontend), Render/Heroku (backend)

---

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/noteshub.git
cd noteshub
```

### 2. Backend Setup

- Go to the backend directory:
  ```sh
  cd backend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Create a `.env` file with the following variables:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  EMAIL=your_email@example.com
  EMAIL_PASSWORD=your_email_password_or_app_password
  CLIENT_URL=http://localhost:5173
  ```
- Start the backend server:
  ```sh
  npm start
  ```

### 3. Frontend Setup

- Go to the frontend directory:
  ```sh
  cd ../frontend
  ```
- Install dependencies:
  ```sh
  npm install
  ```
- Start the frontend development server:
  ```sh
  npm run dev
  ```

- The app will be available at [http://localhost:5173](http://localhost:5173).

---

## Key Functionalities

### Notes Management

- **Create/Edit/Delete Notes:** Add new notes, edit existing ones, or move them to trash.
- **Pin/Unpin:** Pin important notes to keep them at the top.
- **Archive/Unarchive:** Move notes to archive for later reference.
- **Trash/Restore:** Deleted notes go to trash and can be restored or permanently deleted.

### Markdown Support

- Write notes using Markdown syntax.
- Live preview and beautiful rendering of Markdown content.

### Note Sharing

- Click the share icon on any note to copy a public, read-only link.
- Anyone with the link can view the note (no login required).

### Password Reset

- Forgot your password? Request a reset link via email.
- Secure token-based password reset flow.

---

## Security

- Passwords are hashed using bcrypt.
- JWT is used for secure authentication