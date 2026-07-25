# Task Management Dashboard

A simple task management dashboard built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Supabase**. This application allows users to create tasks, view all existing tasks, and update their status through a clean and responsive interface.

## Features

- View all tasks
- Create new tasks
- Update task status (Todo, In Progress, Done)
- Data stored and managed using Supabase
- Responsive interface built with Tailwind CSS

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase

## Running the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/Glasswatch/task-management-dashboard
cd task-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

Add the following environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Live Demo

**Vercel Deployment**

https://your-vercel-url.vercel.app

## Database

The application uses a Supabase PostgreSQL database with a `tasks` table containing:

- `id` (UUID)
- `title`
- `description`
- `status`
- `created_at`

Row Level Security (RLS) is enabled. For this coding challenge, an anonymous read/write policy was created to simplify testing. In a production application, authentication and more restrictive RLS policies would be implemented.

## Technical Decisions

This project was built using Next.js with the App Router and TypeScript to create a simple and maintainable application. Since the challenge only requires a single dashboard page, the application's state and logic are managed within one page component. This keeps the code easy to understand while still following good React practices.

Supabase was chosen as the backend because it provides a PostgreSQL database along with an official JavaScript client that integrates well with Next.js. After creating or updating a task, the application fetches the latest data from the database to ensure the user interface always reflects the current state.

## AI Usage

AI was used as a learning and development assistant throughout this project. It helped explain unfamiliar concepts, review code, and suggest implementation approaches. All generated code was reviewed, tested, and understood before being included in the final submission.
