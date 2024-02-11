# Step 1: Use an official Node runtime as a parent image for the build stage
FROM node:20-alpine as builder

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the project directory contents into the container at /usr/src/app
# Assuming the 'docker' directory is at the same level as your project files
COPY package.json package-lock.json* /usr/src/app/

# Install dependencies, including 'devDependencies' since they might be needed for the build
RUN npm install

# Copy the rest of your app's source code from the parent directory
COPY . .

# Step 4: Build your Next.js application
RUN npm run build

# Step 5: Start a new, final image to reduce size
FROM node:20-alpine as production

# Set the working directory in the container
WORKDIR /usr/src/app

# Only copy the production dependencies necessary to run the app
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.env ./.env

# Step 6: Make port 3000 available to the world outside this container
EXPOSE 3000

# Step 7: Define environment variable
ENV NODE_ENV production

# Step 8: Define the command to run the app
CMD ["npm", "start"]
