# 🔐 Authentication with JWT, Spring Security & ReactJS

> A comprehensive full-stack authentication system demonstrating secure user authentication using JSON Web Tokens (JWT), Spring Boot backend, and React frontend.

## 📹 Demo Video

https://github.com/user-attachments/assets/d278716a-60a8-46c6-8162-4a7f52f2796c

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Authentication Flow](#authentication-flow)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This project demonstrates a production-ready authentication system using **JWT (JSON Web Tokens)** for securing RESTful APIs. It showcases best practices for implementing authentication and authorization in a modern full-stack application with Spring Boot as the backend and React as the frontend.

### What is JWT?

JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

---

## ✨ Features

- ✅ **User Registration** - New users can create an account with email validation
- ✅ **User Login** - Secure authentication with JWT token generation
- ✅ **JWT Token Management** - Automatic token generation and validation
- ✅ **Protected Routes** - Frontend route protection for authenticated users only
- ✅ **Secure Password Storage** - Passwords encrypted using BCrypt
- ✅ **Token Expiration** - Automatic token expiration and refresh mechanism
- ✅ **Role-Based Access Control** - Different access levels for different user roles
- ✅ **CORS Configuration** - Properly configured Cross-Origin Resource Sharing
- ✅ **HTTP-Only Cookies** - Secure token storage (optional implementation)
- ✅ **Logout Functionality** - Secure user logout with token invalidation

---

## 🏗️ Architecture

The application follows a client-server architecture:

```
┌─────────────────┐           ┌──────────────────┐
│                 │           │                  │
│  React Client   │  ◄─────►  │  Spring Boot API │
│   (Frontend)    │   HTTP    │    (Backend)     │
│                 │   + JWT   │                  │
└─────────────────┘           └──────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │                 │
                              │    Database     │
                              │  (MySQL/H2)     │
                              │                 │
                              └─────────────────┘
```

### Backend Architecture

```
┌────────────────────────────────────────────────────┐
│                   Spring Boot API                  │
├────────────────────────────────────────────────────┤
│  Controllers  │  Services  │  Repositories  │ Entities │
├────────────────────────────────────────────────────┤
│              Spring Security + JWT                 │
├────────────────────────────────────────────────────┤
│         JwtAuthenticationFilter                    │
├────────────────────────────────────────────────────┤
│              Database (JPA/Hibernate)              │
└────────────────────────────────────────────────────┘
```

---

## 🛠️ Technologies

### Backend
- **Java 11+** - Programming language
- **Spring Boot 2.x/3.x** - Application framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Data persistence
- **JWT (jjwt)** - Token generation and validation
- **MySQL/H2** - Database
- **Maven** - Dependency management
- **Lombok** - Reduce boilerplate code

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **JavaScript (ES6+)** - Programming language
- **CSS3** - Styling
- **npm/yarn** - Package management

---

## 📦 Prerequisites

Before running this application, make sure you have the following installed:

- **Java Development Kit (JDK) 11 or higher**
- **Node.js** (v14 or higher) and **npm**
- **Maven** 3.6+
- **MySQL** (optional, H2 can be used for development)
- **Git**

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/malakzaidi/authentication-with-Jwt-spring-security-reactJs.git
cd authentication-with-Jwt-spring-security-reactJs
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
mvn clean install

# Or skip tests during installation
mvn clean install -DskipTests
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or
yarn install
```

---

## ⚙️ Configuration

### Backend Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server Port
server.port=8080

# Database Configuration (MySQL Example)
spring.datasource.url=jdbc:mysql://localhost:3306/jwt_auth_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Configuration
jwt.secret=YourSecretKeyHere
jwt.expiration=86400000

# For H2 Database (Development)
# spring.datasource.url=jdbc:h2:mem:testdb
# spring.datasource.driverClassName=org.h2.Driver
# spring.h2.console.enabled=true
```

### Frontend Configuration

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🏃 Running the Application

### Start Backend Server

```bash
cd backend
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080`

### Start Frontend Development Server

```bash
cd frontend
npm start
# or
yarn start
```

The React application will start on `http://localhost:3000`

---

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user and get JWT token | Public |
| POST | `/api/auth/logout` | Logout current user | Protected |
| GET | `/api/auth/user` | Get current user details | Protected |

### Request/Response Examples

#### Register User

**Request:**
```json
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "success": true
}
```
<img width="1709" height="860" alt="Screenshot 2025-11-15 233610" src="https://github.com/user-attachments/assets/5f262b9e-3a78-498f-9805-27037438665d" />

#### Login

**Request:**
```json
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "type": "Bearer",
  "username": "johndoe",
  "email": "john@example.com"
}
```
<img width="1732" height="901" alt="image" src="https://github.com/user-attachments/assets/bed84c69-9abf-4fe3-9fd7-9b7222074e12" />



#### Access Protected Resource

**Request:**
```http
GET /api/auth/user
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📁 Project Structure

```
authentication-with-Jwt-spring-security-reactJs/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/auth/jwt/
│   │   │   │       ├── config/           # Security configuration
│   │   │   │       ├── controller/       # REST controllers
│   │   │   │       ├── dto/              # Data Transfer Objects
│   │   │   │       ├── entity/           # JPA entities
│   │   │   │       ├── repository/       # Data repositories
│   │   │   │       ├── security/         # JWT utilities & filters
│   │   │   │       └── service/          # Business logic
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/          # React components
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── services/            # API services
    │   │   └── authService.js
    │   ├── utils/               # Utility functions
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env
```

---

## 🔄 Authentication Flow

### Registration Flow

1. User fills registration form
2. Frontend sends POST request to `/api/auth/register`
3. Backend validates input data
4. Password is encrypted using BCrypt
5. User is saved to database
6. Success message returned to frontend

### Login Flow

1. User enters credentials
2. Frontend sends POST request to `/api/auth/login`
3. Backend validates credentials
4. JWT token is generated with user details
5. Token is returned to frontend
6. Frontend stores token (localStorage/sessionStorage)
7. User is redirected to dashboard

### Accessing Protected Resources

1. Frontend includes JWT token in `Authorization` header
2. Backend `JwtAuthenticationFilter` intercepts request
3. Token is validated and user details extracted
4. If valid, request proceeds to controller
5. If invalid, 401 Unauthorized response returned

### Logout Flow

1. User clicks logout button
2. Frontend removes JWT token from storage
3. Optional: Backend invalidates token (blacklist)
4. User is redirected to login page

---

## 🔒 Security

### Security Features Implemented

- **Password Encryption**: BCrypt hashing algorithm
- **JWT Token**: Signed tokens with expiration
- **CORS Protection**: Configured allowed origins
- **CSRF Protection**: Disabled for stateless JWT authentication
- **SQL Injection Prevention**: JPA/Hibernate parameterized queries
- **XSS Prevention**: Input validation and sanitization
- **HTTP-Only Cookies**: Option for secure token storage

### Best Practices

- Never store sensitive data in JWT payload
- Use HTTPS in production
- Implement token refresh mechanism
- Set appropriate token expiration time
- Validate all user inputs
- Implement rate limiting
- Use environment variables for secrets

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Malak Zaidi**

- GitHub: [@malakzaidi](https://github.com/malakzaidi)
- LinkedIn: [Your LinkedIn Profile]

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React.js Documentation
- JWT.io
- Spring Security Reference
- Community tutorials and resources

---

## 📞 Support

If you have any questions or issues, please:
- Open an issue on GitHub
- Contact: [malakzaidi815@gmail.com]

---

**⭐ If you find this project helpful, please give it a star!**
