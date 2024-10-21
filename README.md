# crud-api

This project is a simple CRUD API implemented in **TypeScript** using **Node.js**. The API allows you to perform basic operations on users, including creating, reading, updating, and deleting records.

### Features

- **GET** all users or a specific user by `userId`.
- **POST** a new user with validation for required fields.
- **PUT** to update an existing user's details.
- **DELETE** a user by `userId`.
- Comprehensive error handling for invalid input and non-existing resources.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-repo/crud-api.git
   cd crud-api
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following content:

   ```
   PORT=4000
   ```

4. **Run the development server**:

   ```bash
   npm run start:dev
   ```

### Scripts

- **`npm run start:dev`**: Runs the server in development mode using `ts-node-dev`.
- **`npm run start:prod`**: Runs the built project using Node.js.
