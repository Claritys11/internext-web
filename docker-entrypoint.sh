#!/bin/sh
set -e

echo "🚀 [Internext] Container booting up..."

# Ensure uploads directory exists
mkdir -p /app/public/uploads 2>/dev/null || true

# If DATABASE_URL is configured, push the Prisma schema and run seed check
if [ -n "$DATABASE_URL" ]; then
  echo "📦 [Internext] DATABASE_URL detected. Synchronizing Prisma PostgreSQL schema..."
  npx prisma db push --skip-generate || echo "⚠️ [Internext] Prisma db push completed with warnings, continuing..."

  echo "🌱 [Internext] Running database seed check..."
  node prisma/seed-runner.js || echo "⚠️ [Internext] Seed runner completed with warnings, continuing..."
else
  echo "ℹ️ [Internext] No DATABASE_URL provided. Running with in-memory fallbacks."
fi

echo "✨ [Internext] Starting Next.js server on port ${PORT:-3500}..."
exec node server.js
