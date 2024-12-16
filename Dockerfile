# Use your preferred base image (assuming Node.js in this example)
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if you have them)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Copy the wait-for-it script into the container
COPY ./wait-for-it.sh /usr/local/bin/wait-for-it.sh

# Make sure it's executable
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Set the default command for the container
CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]