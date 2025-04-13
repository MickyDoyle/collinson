# TypeScript API with Docker

This project is a simple TypeScript API that runs inside a Docker container. It uses Express as the web framework and demonstrates how to set up a basic API structure with controllers and routes.

## Project Structure

```

├── src
│   ├── app.ts               # Entry point of the application
│   ├── controllers          # Contains controller files
│   │   └── index.ts         # Index controller
│   ├── routes               # Contains route files
│   │   └── index.ts         # Route definitions
│   └── types                # Contains type definitions
│       └── index.ts         # Request and Response interfaces
├── Dockerfile                # Dockerfile for building the image
├── docker-compose.yml        # Docker Compose configuration
├── package.json              # npm configuration and dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd typescript-api-docker
   ```

2. Build the Docker image:

   ```
   docker-compose build
   ```

3. Start the application:

   ```
   docker-compose up
   ```

### Usage

Once the application is running, you can access the API at `http://localhost:3000`. The root route will respond with a welcome message.

### Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.

### License

This project is licensed under the MIT License.
