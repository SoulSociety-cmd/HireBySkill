FROM node:20-alpine

# Install system deps for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    nodejs \
    yarn

# Install ESLint globally or via npm
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=false

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S tester -u 1001

# Copy test runner script
COPY runner.js /app/runner.js
COPY eslint.config.js /app/eslint.config.js

USER tester

EXPOSE 3000

CMD ["node", "runner.js"]

