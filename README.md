# ReelRealm

ReelRealm is a full-stack web application for managing a movie library, developed as part of a course project for the Software Engineering course at the National Technical University of Ukraine "Igor Sikorsky Kyiv Polytechnic Institute".

## Table of Contents
- [Introduction](#introduction)
- [Technical Requirements](#technical-requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The objective of this project is to solidify theoretical knowledge and practical skills in designing, modeling, developing, and testing software. The project focuses on developing a web application, "ReelRealm", which is a movie library. This application allows users to interact with a collection of movies, including creating, updating, and deleting entries, as well as managing user authentication and roles.

## Technical Requirements

- **Backend**: NestJs, Sequelize ORM, PostgreSQL
- **Frontend**: ReactJs

## Project Structure

The project is divided into two main parts:

1. **Backend**: Manages the server-side operations using NestJs.
2. **Frontend**: Manages the client-side operations using ReactJs.

### Backend Structure

- **Users Module**: Manages user information and roles.
- **Auth Module**: Handles user registration and authentication.
- **Movies Module**: Manages movie information including CRUD operations.
- **Genres Module**: Manages genre information including CRUD operations.
- **Bookmarks & Liked Modules**: Manages user interactions with movies.

### Frontend Structure

- Uses JSX components for rendering UI.
- Services for interacting with the backend.
- Custom components and hooks for various functionalities.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/BadOfficer/Movie-Library.git
    cd Movie-Library
    ```

2. **Backend Setup**

    ```bash
    cd backend
    npm install
    ```

3. **Frontend Setup**

    ```bash
    cd frontend
    npm install
    ```

## Usage

1. **Running the Backend**

    ```bash
    cd backend
    npm run start:dev
    ```

2. **Running the Frontend**

    ```bash
    cd frontend
    npm run dev
    ```

3. Access the application at `http://localhost:3000`.

## Features

- **User Management**: Registration, authentication, and role-based access control.
- **Movie Management**: CRUD operations for movies.
- **Genre Management**: CRUD operations for genres.
- **User Interactions**: Bookmarking and liking movies.
- **Filtering, Pagination, and Search**: Enhanced movie browsing experience.
- **Responsive Design**: Adapts to various screen sizes.

## Testing

Testing is performed using a systematic approach to ensure the application works as expected. Key functionalities tested include:

- User registration and authentication
- Adding and removing movies from favorites and bookmarks
- Updating user details
- Managing genres and movies

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
