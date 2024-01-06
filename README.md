# URL Shortener API with NestJS

## Overview

Welcome to the URL Shortener API, a powerful and efficient solution built with 
[NestJS](https://nestjs.com/) framework and [Prisma ORM](https://www.prisma.io/) 
for URL shortening. This project allows you to create short and easily shareable
versions of long URLs, simplifying link management and enhancing user experience.

## Features

- **Shorten URLs:** Convert long URLs into short, easy-to-remember links.
- **Redirects:** Seamless redirection from short links to their original destinations.
- **Analytics:** Track basic analytics, such as the number of clicks on each short URL.
- **Limiting:** Limit unauthorized users from using shortening ability.

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fujivara/url-shortener-nest-api.git

2. Install dependencies:

    ```bash
    npm install
   
### Configuration

1. Create a .env file based on the provided .env.example:

    ```bash
    cp .env.example .env
   
2. Update the database connection string and other configuration settings in the .env file.

### Database Setup
Set up the database as you need.

### Running the Application
1. Start the NestJS application:

    ```bash
    npm run start

The API will be available at http://localhost:3000. You can now use the URL shortening endpoints.
