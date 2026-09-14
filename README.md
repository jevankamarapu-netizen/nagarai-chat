# NAGARAI — ChatGPT-style Version 1

A simple working AI chat application built with Next.js, React and the OpenAI Responses API.

## Features

- ChatGPT-style sidebar
- New chat
- Conversation history for the current browser session
- Chat screen
- Message composer
- Enter to send / Shift+Enter for a new line
- Loading animation
- OpenAI API connection
- Responsive mobile layout

## Requirements

Install Node.js 18+.

## Setup

1. Extract this project.
2. Open a terminal in the project folder.
3. Run:

   npm install

4. Copy `.env.example` to `.env.local`.
5. Put your OpenAI API key in `.env.local`:

   OPENAI_API_KEY=your_key_here

6. Optionally change the model:

   OPENAI_MODEL=gpt-5.6-luna

7. Start the website:

   npm run dev

8. Open:

   http://localhost:3000

## Important

Never put your OpenAI API key inside `app/page.js` or other browser-side code. The key belongs in `.env.local` and is used by `app/api/chat/route.js`.

## Next upgrades

- Streaming responses
- Persistent chat history with Supabase/PostgreSQL
- Login/signup
- File and image uploads
- Markdown rendering
- Voice input
- Admin dashboard
- Usage limits
- Production deployment
