# Support Desk MERN App

Welcome to the Support Desk MERN (MongoDB, Express, React, Node.js) application! This project aims to provide a support ticket management system using the MERN stack.

## Live Demo

Check out the live demo of the application [here](https://vaibhav-support-desk.onrender.com/).

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Description

The Support Desk MERN App is a web application that allows users to submit support tickets for issues they encounter. It helps in managing and tracking support requests efficiently. The app is built using the MERN stack, providing a smooth and seamless user experience.

## Features

- User authentication and authorization
- Create, view, and manage support tickets
- Assign tickets to team members
- Real-time updates on ticket status
- User-friendly interface
- Mobile-responsive design

## Installation

To run the application locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/mvaibhav77/support-desk-react.git
```

2. Navigate to the project directory:

```bash
cd support-desk-react
```

3. Install the dependencies for both the server and the client:

```bash
# Install server dependencies
npm install

# Install client dependencies
cd ./client
npm install
```

4. Set up the environment variables:

   - Rename `.env.example` to `.env` in both the `server` and `client` directories.
   - Fill in the required environment variables in the `.env` files.
  ```bash
  JWT_SECRET = something
  MONGO_URI
  ```
    

5. Start the development server:

```bash
# Start the server (from the server directory)
npm run start

# Start the client (from the client directory)
npm run start
```

The app will be available at [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Register or login to access the support ticket dashboard.
- Click on "Create Ticket" to submit a new support ticket.
- View and manage existing tickets from the dashboard.
- Assign tickets to team members for resolution.
- Receive real-time updates on ticket status changes.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Socket.IO (for real-time updates)
- ... (add any other technologies or libraries you have used)

## Contributing

Contributions to this project are welcome! If you find any issues or want to add new features, please submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out the Support Desk MERN App! If you have any questions or suggestions, feel free to [open an issue](https://github.com/mvaibhav77/support-desk-react/issues). Happy coding!