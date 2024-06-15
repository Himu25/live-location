# Live Location Sharing Project

## Overview

The Live Location Sharing Project enables users to share their live location with consumers in real-time. Leveraging Redis streams, this project ensures efficient data streaming and storage with high throughput. The live location data can be saved to any database of your choice.

## Features

- **Real-time Location Sharing**: Instantly share live location data with consumers.
- **High Throughput**: Efficient data streaming using Redis streams.
- **Database Agnostic**: Save live location data to any preferred database.
- **Scalable**: Easily scale producers and consumers as needed.

## Getting Started

### Prerequisites

- Node.js
- Redis server

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Himu25/live-location.git
   cd live-location-sharing
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the Redis server:
   ```sh
   redis-server
   ```

### Running the Application

#### Starting the Producer

The producer generates live location data and writes it to the Redis stream.

```sh
npm run producer
```

#### Starting a Consumer

Consumers read the live location data from the Redis stream.

```sh
npm run consumer <consumer_name>
```

Replace `<consumer_name>` with a unique name for each consumer.

## Project Structure

```
live-location-sharing/
├── producer.js
├── consumer.js
├── client.js
├── keys.ts
├── package.json
└── README.md
```

- **producer.js**: Contains the logic for the location data producer.
- **consumer.js**: Contains the logic for the location data consumer.
- **key.ts**: Configuration and keys for the project.

Enjoy sharing live locations with high efficiency and scalability!
