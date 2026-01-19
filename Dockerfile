FROM node:18-alpine

WORKDIR /app

# 1. Copy package files
COPY package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy Prisma schema
COPY prisma ./prisma/

COPY .env* ./

# 4. Generate Prisma client
RUN npx prisma generate

# 5. Copy TypeScript config
COPY tsconfig.json ./

# 6. Copy source code
COPY src ./src/
COPY prisma.config.ts ./

# 7. Build TypeScript
RUN npm run build

# 8. Debug: Check files were created
RUN echo "=== Checking dist folder ===" && \
    ls -la dist/ 2>/dev/null

EXPOSE 5000

CMD ["node", "dist/server.js"]