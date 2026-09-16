# Multi-stage Dockerfile for Next.js with Prisma & PostgreSQL on Coolify
FROM node:22-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
RUN apk add --no-cache libc6-compat openssl

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
COPY prisma ./prisma/
RUN npm ci

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048"

COPY . .
RUN npx prisma generate
RUN npm run build

# Step 2. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3500
ENV HOSTNAME="0.0.0.0"

# OpenSSL & libc are required by Prisma query engine on Alpine
RUN apk add --no-cache libc6-compat openssl

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Prepare public uploads folder with write permissions
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set correct permissions
RUN mkdir -p .next && chown nextjs:nodejs .next
RUN chown -R nextjs:nodejs /app/public /app/prisma /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

USER nextjs

EXPOSE 3500

CMD ["./docker-entrypoint.sh"]
