FROM node:18-bullseye

# Install dependencies required for Playwright
RUN apt-get update && \
    apt-get install -y \
    chromium \
    fonts-noto-color-emoji \
    libnss3 \
    libxss1 \
    libasound2 \
    libxtst6 \
    xvfb \
    && rm -rf /var/lib/apt/lists/*

# Set environment variable to use system Chromium
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium