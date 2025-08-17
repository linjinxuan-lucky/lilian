#!/bin/bash

# Install dependencies
npm install

# Create data directory and file if they don't exist
mkdir -p data
touch participants.json

echo "Build completed successfully"