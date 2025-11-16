# JWT Authentication Frontend

A complete ReactJS frontend application for JWT-based authentication with Spring Security backend. This project provides a production-ready authentication system with login, registration, and protected routes.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Spring Security backend running (default: `http://localhost:8080`)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 📋 Features

✅ **User Authentication**
- Registration with email and password
- Login with JWT token
- Automatic token storage and retrieval

✅ **Protected Routes**
- Dashboard accessible only to authenticated users
- Automatic redirect to login for unauthenticated users
- Session persistence across page refreshes

✅ **User Experience**
- Clean, modern UI with Tailwind CSS
- Form validation with error messages
- Loading states for async operations
- Responsive design for all devices

✅ **Security**
- JWT token-based authentication
- Secure token storage in localStorage
- CORS-enabled for backend communication
- Error handling and user feedback

## 📁 Project Structure

```
jwt_auth_frontend/
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx          # Landing page
│   │   │   ├── Login.tsx         # Login form
│   │   │   ├── Register.tsx      # Registration form
│   │   │   ├── Dashboard.tsx     # Protected dashboard
│   │   │   └── NotFound.tsx      # 404 page
│   │   ├── components/
│   │   │   ├── ProtectedRoute.tsx # Route protection
│   │   │   └── ErrorBoundary.tsx  # Error handling
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx   # Auth state management
│   │   │   └── ThemeContext.tsx  # Theme management
│   │   ├── lib/
│   │   │   └── api.ts            # API utilities
│   │   ├── App.tsx               # Main app with routing
│   │   └── index.css             # Global styles
│   └── public/                   # Static assets
├── SETUP_GUIDE.md                # Detailed setup instructions
├── COMPONENTS_GUIDE.md           # Component documentation
├── BACKEND_INTEGRATION.md        # Backend integration guide
└── README.md                     # This file
```

## 🔧 Configuration

### Backend API URL

Set your backend API URL in the Management Dashboard:

1. Open **Management Dashboard** → **Settings** → **Secrets**
2. Add/update the `VITE_API_URL` variable:
   - **Development**: `http://localhost:8080`
   - **Production**: `https://api.yourdomain.com`

### Environment Variables

The application uses these environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API base URL | `http://localhost:8080` |
| `VITE_APP_TITLE` | Application title | `JWT Auth` |
| `VITE_APP_LOGO` | Application logo URL | (from settings) |

## 🔐 API Endpoints

The frontend expects these endpoints from your backend:

### POST /auth/register
Register a new user
```json
Request: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token_here" }
```

### POST /auth/login
Authenticate a user
```json
Request: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt_token_here" }
```

See `BACKEND_INTEGRATION.md` for detailed API documentation.

## 🎯 Usage

### Authentication Flow

1. **Register**: User creates account → receives JWT token → redirected to dashboard
2. **Login**: User enters credentials → receives JWT token → redirected to dashboard
3. **Protected Routes**: Dashboard checks authentication → redirects to login if needed
4. **Logout**: User clears token → redirected to login

### Using Authentication in Components

```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout, isLoading, error } = useAuth();
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.email}</p>}
      {error && <p>Error: {error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
}
```

### Making API Calls with JWT Token

```typescript
import { apiGet, apiPost } from "@/lib/api";

// GET request with token
const data = await apiGet("/api/user/profile");

// POST request with token
const result = await apiPost("/api/data", { key: "value" });
```

## 📖 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup and configuration
- **[COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)** - Component documentation
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** - Backend integration guide

## 🧪 Testing

### Manual Testing Checklist

- [ ] Registration with valid email/password
- [ ] Registration with invalid email format
- [ ] Registration with duplicate email
- [ ] Login with correct credentials
- [ ] Login with incorrect password
- [ ] Login with non-existent email
- [ ] Dashboard accessible after login
- [ ] Dashboard redirects to login when not authenticated
- [ ] Logout clears session and redirects
- [ ] Session persists after page refresh
- [ ] Token sent in API requests

### Testing with curl

```bash
# Register
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Protected endpoint
curl -X GET http://localhost:8080/api/protected \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deploy to Production

1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting provider
3. Update `VITE_API_URL` to your production backend URL
4. Ensure CORS is configured on your backend

## 🔒 Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For enhanced security, consider using httpOnly cookies.
2. **HTTPS**: Always use HTTPS in production.
3. **Token Expiration**: Implement token refresh logic if using short-lived tokens.
4. **CORS**: Ensure your backend only allows requests from your frontend domain.
5. **Input Validation**: The frontend validates inputs; backend validation is also required.

## 🐛 Troubleshooting

### CORS Error
**Problem**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**: 
- Ensure backend has CORS enabled
- Check that frontend origin is in allowed origins
- Verify backend is running on correct port

### Login Not Working
**Problem**: Login form submission fails

**Solution**:
- Check browser console for errors
- Verify backend is running
- Ensure `VITE_API_URL` is set correctly
- Check backend logs for errors

### Token Not Persisting
**Problem**: User logged out after page refresh

**Solution**:
- Check localStorage is enabled
- Verify token is being stored
- Check token expiration time

See `SETUP_GUIDE.md` for more troubleshooting tips.

## 📚 Technology Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **shadcn/ui** - UI components
- **Wouter** - Client-side routing
- **Vite** - Build tool

## 📝 License

This project is provided as-is for educational and development purposes.

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review the browser console for errors
3. Verify backend is running and accessible
4. Check network requests in browser DevTools

## 🎓 Learning Resources

- [JWT.io](https://jwt.io) - JWT documentation
- [Spring Security](https://spring.io/projects/spring-security) - Backend security
- [React Documentation](https://react.dev) - React guide
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

**Happy coding!** 🚀

