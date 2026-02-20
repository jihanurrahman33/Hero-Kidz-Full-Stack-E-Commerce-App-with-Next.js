# Hero Kidz 🧸 

![Hero Kidz Banner](https://i.ibb.co.com/6c4wD9r9/Screenshot-2025-02-19-140656.png)

🔗 **Live Demo:** [https://hero-kidz-orpin.vercel.app/](https://hero-kidz-orpin.vercel.app/)

A modern, full-stack single-vendor e-commerce platform dedicated to children's educational toys and products. Built for speed, delightful user experiences, and seamless administration using the latest Next.js App Router features.

## ✨ Key Features

- 🛍️ **Dynamic Product Catalog**: Browse products with instant skeleton loading states and advanced categorization.
- 🔐 **Robust Authentication**: Secure sign-in/up via Credentials and Google OAuth powered by NextAuth.
- 🛒 **Streamlined Cart & Checkout**: Protected checkout flows using Next.js Middleware and Server Actions.
- 📬 **Automated Email Receipts**: Nodemailer integration sends instant HTML invoice emails upon confident order placement.
- 📊 **Dedicated Admin Dashboard**: A protected admin panel for visualizing metrics and managing products, orders, and users.
- ⚡ **High Performance & SEO**: Leverages React Server Components (RSC) and built-in Next.js metadata optimization.
- 🎨 **Beautiful UI/UX**: Designed with a soft, engaging, borderless aesthetic utilizing Tailwind CSS v4 and DaisyUI.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) + [React 19](https://react.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Official Node Driver)
- **Authentication**: [NextAuth.js (v4)](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Alerts**: [SweetAlert2](https://sweetalert2.github.io/)
- **Email**: [Nodemailer](https://nodemailer.com/)

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have Node.js (v18.x or above) installed.

### 1. Clone & Install
Clone the repository and install dependency packages:
```bash
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root of your project and configure the following variables:

```env
# Database
MONGODB_URI="your_mongodb_connection_string"
DBNAME="hero_kidz_db"

# Authentication (NextAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_generated_secret_string" # Generate using: openssl rand -base64 32

# Google OAuth (Optional, for Google Login)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# Email Configuration (Nodemailer via Gmail app passwords)
EMAIL_USER="your_email@gmail.com"
EMAIL_PASS="your_gmail_app_password"
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 💻 Available Scripts

- `npm run dev` — Starts the development server with hot-reloading.
- `npm run build` — Creates an optimized production build of the application.
- `npm start` — Runs the compiled production server.
- `npm run lint` — Runs ESLint to find and fix styling/code issues.

## 📁 Architecture Overview

Here are some key paths within the `src` directory to help you navigate the codebase:

- **`src/app/`**: Next.js App Router definitions.
  - `(auth)`: Login & Register layouts/pages.
  - `dashboard`: Protected Admin layout and pages.
  - `products`: Product listing and dynamic dynamic details `[id]` routing.
- **`src/features/`**: Domain-driven feature slicing (e.g., `admin`, `auth`, `cart`, `checkout`, `products`). Each contains its own specific Actions, Components, and Hooks. 
- **`src/components/`**: Reusable shared UI layout components (Navbar, Footers, Loaders).
- **`src/lib/`**: Core utilities, including `dbConnect.js`, `authOptions.js`, and `sendEmail.js`.

## 🔒 Security & Middleware

Protected routes—including `/cart`, `/checkout`, `/profile`, and `/dashboard`—are strictly guarded by the root `middleware.js` using NextAuth JWT tokens ensuring unauthenticated users are seamlessly redirected to the login flow. Role-based access control (RBAC) securely restricts the `dashboard` to `admin` accounts.

## 📜 License

Project assets, design, and specific code implementations are proprietary properties of **Hero Kidz**. Open-source dependencies are subject to their respective licenses.
