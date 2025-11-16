# Components & Pages Guide

## Pages

### Home (`client/src/pages/Home.tsx`)

**Purpose**: Public landing page that introduces the application

**Features**:
- Navigation bar with Sign In/Sign Up buttons
- Hero section with call-to-action
- Feature cards (Secure, Fast, Protected)
- "How It Works" section with 4-step process
- Footer

**Accessible to**: Everyone (public)

**Route**: `/`

---

### Login (`client/src/pages/Login.tsx`)

**Purpose**: User login page

**Features**:
- Email input field
- Password input field
- Sign In button with loading state
- Error message display
- Link to registration page
- Form validation

**Accessible to**: Unauthenticated users

**Route**: `/login`

**Form Validation**:
- Email and password required
- Shows error messages from backend

**On Success**: Redirects to `/dashboard`

---

### Register (`client/src/pages/Register.tsx`)

**Purpose**: New user registration page

**Features**:
- Email input field
- Password input field
- Confirm Password input field
- Sign Up button with loading state
- Error message display
- Link to login page
- Form validation

**Accessible to**: Unauthenticated users

**Route**: `/register`

**Form Validation**:
- All fields required
- Password must be at least 6 characters
- Passwords must match
- Shows error messages from backend

**On Success**: Redirects to `/dashboard`

---

### Dashboard (`client/src/pages/Dashboard.tsx`)

**Purpose**: Protected user dashboard showing account information

**Features**:
- Header with welcome message and logout button
- User email display
- Authentication status indicator
- JWT token preview
- Protected resources information
- Feature cards explaining the system

**Accessible to**: Authenticated users only

**Route**: `/dashboard`

**Protected**: Yes - redirects to `/login` if not authenticated

**On Logout**: Clears token and redirects to `/login`

---

### NotFound (`client/src/pages/NotFound.tsx`)

**Purpose**: 404 error page

**Accessible to**: Everyone

**Route**: Any undefined route

---

## Components

### ProtectedRoute (`client/src/components/ProtectedRoute.tsx`)

**Purpose**: Wrapper component that protects routes from unauthenticated access

**Usage**:
```tsx
<Route path="/dashboard">
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
</Route>
```

**Behavior**:
- Checks if user is authenticated
- If not authenticated, redirects to `/login`
- If authenticated, renders the wrapped component

**Props**:
- `children`: React component to protect

---

### ErrorBoundary (`client/src/components/ErrorBoundary.tsx`)

**Purpose**: Catches React errors and displays error UI

**Usage**: Wraps the entire app in `App.tsx`

**Behavior**:
- Catches JavaScript errors in child components
- Displays error UI instead of crashing
- Logs errors to console

---

## Contexts

### AuthContext (`client/src/contexts/AuthContext.tsx`)

**Purpose**: Manages authentication state and provides auth functions

**Exports**:
- `AuthProvider`: Context provider component
- `useAuth()`: Hook to access auth state and functions

**State**:
```typescript
{
  user: { email: string, token: string } | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
```

**Functions**:
- `login(email, password)`: Authenticate user
- `register(email, password)`: Create new account
- `logout()`: Clear authentication

**Usage**:
```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  // Use auth state and functions
}
```

---

### ThemeContext (`client/src/contexts/ThemeContext.tsx`)

**Purpose**: Manages light/dark theme

**Exports**:
- `ThemeProvider`: Context provider component
- `useTheme()`: Hook to access theme state

**State**:
```typescript
{
  theme: "light" | "dark",
  toggleTheme: () => void,
  switchable: boolean
}
```

**Usage**:
```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
}
```

---

## UI Components (from shadcn/ui)

The project includes pre-built UI components from shadcn/ui:

- `Button`: Styled button component
- `Input`: Text input field
- `Card`: Container with border and shadow
- `Alert`: Alert message box
- `Dialog`: Modal dialog
- `Tooltip`: Tooltip component
- And many more...

**Import Example**:
```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
```

---

## Styling

### Global Styles (`client/src/index.css`)

Contains:
- CSS custom properties (variables) for colors
- Base styles for HTML elements
- Tailwind CSS directives

### Tailwind Configuration (`tailwind.config.ts`)

Defines:
- Color palette
- Typography scale
- Spacing scale
- Breakpoints for responsive design

### Component Styling

All components use Tailwind CSS utility classes:
```tsx
<div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
  <span className="text-sm font-medium">Label</span>
  <button className="px-4 py-2 bg-blue-600 text-white rounded">
    Action
  </button>
</div>
```

---

## Data Flow

### Authentication Flow

```
User Input
    ↓
Login/Register Component
    ↓
useAuth() hook
    ↓
AuthContext (login/register function)
    ↓
API Request to Backend
    ↓
Backend Response with JWT Token
    ↓
Store Token in localStorage
    ↓
Update Auth State
    ↓
Redirect to Dashboard
```

### Protected Route Flow

```
User Navigates to /dashboard
    ↓
ProtectedRoute Component
    ↓
Check useAuth().isAuthenticated
    ↓
If false → Redirect to /login
If true → Render Dashboard
```

---

## Common Tasks

### Add a New Protected Page

1. Create new file in `client/src/pages/NewPage.tsx`
2. Add route in `App.tsx`:
```tsx
<Route path="/new-page">
  <ProtectedRoute>
    <NewPage />
  </ProtectedRoute>
</Route>
```

### Access User Info in Component

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user } = useAuth();
  return <div>Welcome, {user?.email}</div>;
}
```

### Make API Call with JWT Token

```tsx
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

### Show Loading State

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

function MyComponent() {
  const { isLoading } = useAuth();
  
  return (
    <button disabled={isLoading}>
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          Loading...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
}
```

### Display Error Message

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

function MyComponent() {
  const { error } = useAuth();
  
  return (
    error && (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  );
}
```

