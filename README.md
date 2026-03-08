# GoalsBuddy: AI-Powered Goal Matching & Community Platform

This is a Next.js and TypeScript-based real-time community platform built to solve the "Accountability Bottleneck." It focuses on semantic AI matching using ai-sdk by vercel, instant messaging synchronization, and complex relational UI layouts using Drizzle ORM and Hono RPC to handle the backend and communication layers.

## Getting Started

To get started with the Slack Clone, follow these steps:

1. Clone the repository: `git clone [https://github.com/mrcoded/goals-buddy-app.git](https://github.com/mrcoded/goals-buddy-app.git)`
2. Install dependencies: `bun install` or `yarn install`
3. Create a `.env.local` file in the root directory and add the following environment variables:

# Database (PostgreSQL + Drizzle)

DATABASE_URL="postgresql://user:password@localhost:2020/dbname"

# Authentication & Billing (Clerk)

NEXT*PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test*..."
CLERK*SECRET_KEY="sk_test*..."

# AI Matching & Summary Generation Engine (Google Gemini)

GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

4. Sync your database schema: In your terminal,
   run: bunx drizzle-kit push

5. Run the development server: In your terminal, run: bun dev
6. Open http://localhost:3000 to view your workspace.

## Features

- **Semantic AI Matching**: Analyzes user goals using Gemini 2.5 Flash to pair partners based on intent rather than simple keyword overlap.

- **Type-Safe RPC Tunnel**: A seamless link between frontend and backend ensures your API payloads are always validated at compile-time.

- **Community Hubs**: Keep conversations and manage high-accountability groups with unique membership logic.

- **AI Conversation Summaries**: Generate Intelligent analysis of chat logs that generates structured overviews, key discussion points, and actionable takeaways.

- **Real-Time Match Chat**: Instant 1-on-1 messaging interface for matched users, and message persistence.

- **Pro User Tier**: Enhanced capability for power users to create their own branded communities and manage an unlimited number of concurrent learning goals and memberships.

- **Dashboard Overview**: A centralized command center providing a high-level view of active chats, goals, datas on matches and community activity feed.

## Usage

Here are some tips for using GoalsBuddy:

- **Defining Your Vision**: Use descriptive language when setting goals; the AI matching engine bridges the gap between your needs and the community's skills.

- **Leveraging Match Insights**: Use the "Generate" feature within a match conversation to generate a summary of your discussion, ensuring no plan or "key point" is lost.

- **Joining Communities**: Browse the community grid; action buttons are anchored at the bottom for consistent visual gravity regardless of content length..

- **Pro Community Creation**: Pro users can initialize their own communities, access to multiple ai usage including matches and adding learning goals.

- **Dashboard Overview**:

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
