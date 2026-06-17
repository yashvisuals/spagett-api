# spagett-api

Backend for **Spagett** — a personalized, doge-themed AI chatbot, built with NestJS
and the Claude API. Streams replies token-by-token and keeps short-term conversation
memory.

## Stack
- NestJS + TypeScript
- Claude API (`@anthropic-ai/sdk`)

## Run locally
```bash
cp .env.example .env   # add your ANTHROPIC_API_KEY
npm install
npm run start:dev
```
Runs on http://localhost:4000.

## Endpoints
- `POST /conversations` — start a chat
- `POST /conversations/:id/messages` — send a message, streams the reply
- `GET /conversations/:id` — fetch a conversation

## Environment variables
| Key | Purpose |
|-----|---------|
| `ANTHROPIC_API_KEY` | Claude API key (required) |
| `PORT` | server port (host sets this in prod) |
| `CORS_ORIGIN` | allowed frontend origin (set to the deployed frontend URL) |
