# JWT Authentication Frontend - Setup Guide

## Overview

This is a complete ReactJS frontend for JWT authentication with Spring Security backend. The application includes login, registration, protected routes, and a secure dashboard.

## Features

- **User Authentication**: Login and registration with JWT tokens
- **Protected Routes**: Dashboard accessible only to authenticated users
- **Token Management**: Automatic JWT token storage and retrieval
- **Session Persistence**: User session maintained across page refreshes
- **Error Handling**: Clear error messages for failed operations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Public landing page
│   │   ├── Login.tsx         # Login form
│   │   ├── Register.tsx      # Registration form
│   │   ├── Dashboard.tsx     # Protected dashboard
│   │   └── NotFound.tsx      # 404 page
│   ├── components/
│   │   ├── ProtectedRoute.tsx # Route protection wrapper
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── contexts/
│   │   ├── AuthContext.tsx   # Authentication state management
│   │   └── ThemeContext.tsx  # Theme management
│   ├── App.tsx               # Main app with routing
│   ├── main.tsx              # React entry point
│   └── index.css             # Global styles
└── public/                   # Static assets
```

## Configuration

### 1. Backend API URL

The frontend needs to know where your Spring Security backend is running. Set the API URL in one of these ways:

**Option A: Environment Variable (Recommended)**

Create a `.env` file in the project root:

```bash
VITE_API_URL=http://localhost:8080
```

Or for production:

```bash
VITE_API_URL=https://your-backend-domain.com
```

**Option B: Default Configuration**

If no environment variable is set, the frontend defaults to `http://localhost:8080`.

### 2. CORS Configuration (Backend)

Your Spring Security backend must allow CORS requests from the frontend. Add this to your backend configuration:

```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/auth/**")
                    .allowedOrigins("http://localhost:3000", "https://your-frontend-domain.com")
                    .allowedMethods("GET", "POST", "PUT", "DELETE")
                    .allowedHeaders("*")
                    .allowCredentials(true);
            }
        };
    }
}
```

## Running the Application

### Development

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## API Endpoints Expected

The frontend expects these endpoints from your Spring Security backend:

### 1. Register User

**Endpoint**: `POST /auth/register`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User

**Endpoint**: `POST /auth/login`

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## How Authentication Works

### 1. Registration Flow

1. User fills in email and password on `/register`
2. Frontend sends POST request to `/auth/register`
3. Backend validates credentials and returns JWT token
4. Frontend stores token in `localStorage`
5. User is redirected to `/dashboard`

### 2. Login Flow

1. User enters credentials on `/login`
2. Frontend sends POST request to `/auth/login`
3. Backend validates credentials and returns JWT token
4. Frontend stores token in `localStorage`
5. User is redirected to `/dashboard`

### 3. Protected Routes

1. Dashboard route checks if user is authenticated
2. If no token in localStorage, user is redirected to `/login`
3. If token exists, dashboard is displayed
4. Token is available in `useAuth()` hook for API requests

### 4. Logout

1. User clicks logout button on dashboard
2. Frontend clears token from localStorage
3. User is redirected to `/login`

## Using the Authentication Context

The `useAuth()` hook provides access to authentication state and functions:

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();

  // user: { email: string, token: string } | null
  // isAuthenticated: boolean
  // login: (email: string, password: string) => Promise<void>
  // logout: () => void
  // isLoading: boolean
  // error: string | null
}
```

## Extending the Application

### Adding Protected Pages

1. Create a new page component in `client/src/pages/`
2. Wrap it with `<ProtectedRoute>` in `App.tsx`:

```typescript
<Route path="/new-page">
  <ProtectedRoute>
    <NewPage />
  </ProtectedRoute>
</Route>
```

### Making API Calls with JWT Token

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user } = useAuth();

  const fetchData = async () => {
    const response = await fetch("http://localhost:8080/api/data", {
      headers: {
        "Authorization": `Bearer ${user?.token}`
      }
    });
    const data = await response.json();
  };
}
```

### Customizing Styling

- Global styles: Edit `client/src/index.css`
- Tailwind config: Edit `tailwind.config.ts`
- Theme colors: Modify CSS variables in `index.css`

## Troubleshooting

### CORS Errors

**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**: Ensure your backend has CORS configured correctly (see CORS Configuration section above)

### Token Not Persisting

**Problem**: User is logged out after page refresh

**Solution**: Check that localStorage is not being cleared. The AuthContext loads the token on mount.

### Login/Register Not Working

**Problem**: Form submission fails silently

**Solution**: 
1. Check browser console for errors
2. Verify backend is running and accessible
3. Check that `VITE_API_URL` is set correctly
4. Verify backend endpoints match expected paths

### 404 on Protected Routes

**Problem**: Redirected to 404 when accessing `/dashboard`

**Solution**: Make sure you're logged in. The ProtectedRoute component redirects unauthenticated users to `/login`.

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For production, consider using httpOnly cookies
2. **Token Expiration**: Implement token refresh logic if your backend uses short-lived tokens
3. **HTTPS**: Always use HTTPS in production
4. **Input Validation**: The frontend validates email and password format
5. **Error Messages**: Avoid exposing sensitive information in error messages

## Next Steps

1. Configure your backend API URL
2. Ensure CORS is enabled on your backend
3. Test the registration flow
4. Test the login flow
5. Verify protected routes work correctly
6. Deploy to production

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify backend is running and accessible
4. Check network requests in browser DevTools

