# Backend Integration Guide

## Overview

This guide explains how to integrate your Spring Security backend with this ReactJS frontend. The frontend expects specific API endpoints and response formats.

## Required API Endpoints

### 1. User Registration

**Endpoint**: `POST /auth/register`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400/401)**:
```json
{
  "message": "Email already exists",
  "status": 400
}
```

**Notes**:
- The response must contain either `token` or `access_token` field
- The token should be a valid JWT token
- Email should be validated (unique, valid format)
- Password should be validated (minimum length, complexity)

---

### 2. User Login

**Endpoint**: `POST /auth/login`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response (200 OK)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401)**:
```json
{
  "message": "Invalid email or password",
  "status": 401
}
```

**Notes**:
- Validate credentials against database
- Return JWT token on successful authentication
- Token should be valid for the user's session

---

## CORS Configuration

Your backend must allow CORS requests from the frontend. Add this configuration to your Spring Boot application:

### Spring Security CORS Configuration

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Allow requests from frontend origins
        configuration.setAllowedOrigins(
            "http://localhost:3000",           // Development
            "https://your-frontend-domain.com" // Production
        );
        
        // Allow these HTTP methods
        configuration.setAllowedMethods(
            "GET", "POST", "PUT", "DELETE", "OPTIONS"
        );
        
        // Allow these headers
        configuration.setAllowedHeaders("*");
        
        // Allow credentials (cookies, authorization headers)
        configuration.setAllowCredentials(true);
        
        // Cache preflight response for 1 hour
        configuration.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

### Spring Security Configuration

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors()  // Enable CORS
            .and()
            .csrf().disable()
            .authorizeRequests()
                .antMatchers("/auth/**").permitAll()  // Public endpoints
                .anyRequest().authenticated()
            .and()
            .httpBasic();
        
        return http.build();
    }
}
```

---

## JWT Token Implementation

### Token Structure

A JWT token consists of three parts separated by dots:
```
header.payload.signature
```

**Header**:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload** (should include):
```json
{
  "sub": "user@example.com",
  "iat": 1516239022,
  "exp": 1516242622,
  "email": "user@example.com"
}
```

**Signature**:
- Generated using your JWT secret key
- Used to verify token authenticity

### Token Generation (Java Example)

```java
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtTokenProvider {
    
    private String jwtSecret = "your-secret-key-min-256-bits";
    private int jwtExpirationMs = 86400000; // 24 hours
    
    public String generateToken(String email) {
        return Jwts.builder()
            .setSubject(email)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
    
    public String getEmailFromToken(String token) {
        return Jwts.parser()
            .setSigningKey(jwtSecret)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
    
    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
```

---

## Frontend Token Usage

The frontend automatically includes the JWT token in all API requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend Validation

Validate the token on every protected endpoint:

```java
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/protected")
    public ResponseEntity<?> getProtectedData(Authentication authentication) {
        // authentication contains the user info from the JWT token
        String email = authentication.getName();
        
        return ResponseEntity.ok(new ApiResponse("Data for " + email));
    }
}
```

---

## Testing the Integration

### 1. Test Registration

```bash
curl -X POST http://localhost:8080/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Test Login

```bash
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Test Protected Endpoint

```bash
curl -X GET http://localhost:8080/api/protected \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Common Issues and Solutions

### Issue: CORS Error

**Error**: "Access to XMLHttpRequest blocked by CORS policy"

**Solution**:
1. Ensure CORS configuration is added to your backend
2. Check that frontend origin is in allowed origins list
3. Verify preflight OPTIONS request is handled
4. Check browser console for specific error details

### Issue: Token Not Recognized

**Error**: "Invalid token" or "Unauthorized"

**Solution**:
1. Verify JWT secret key matches between frontend and backend
2. Check token expiration time
3. Ensure token is included in Authorization header
4. Verify token format: "Bearer {token}"

### Issue: Login Always Fails

**Error**: "Invalid email or password"

**Solution**:
1. Verify user exists in database
2. Check password hashing (use BCrypt or similar)
3. Verify email/password validation logic
4. Check database connection
5. Review backend logs for errors

### Issue: Session Not Persisting

**Error**: User logged out after page refresh

**Solution**:
1. Check localStorage is enabled in browser
2. Verify AuthContext is loading token on mount
3. Check that token is being stored correctly
4. Verify token expiration is not too short

---

## Security Best Practices

1. **Use HTTPS in Production**: Always use HTTPS for API calls
2. **Secure Token Storage**: Consider using httpOnly cookies instead of localStorage
3. **Token Expiration**: Implement short-lived tokens (15-30 minutes)
4. **Refresh Tokens**: Implement refresh token mechanism for long sessions
5. **Password Hashing**: Always hash passwords using BCrypt or Argon2
6. **Input Validation**: Validate all inputs on backend
7. **Rate Limiting**: Implement rate limiting on auth endpoints
8. **HTTPS Only**: Set Secure flag on cookies
9. **CSRF Protection**: Implement CSRF tokens for state-changing operations
10. **Logging**: Log authentication attempts for security monitoring

---

## Extending the API

### Adding Custom User Data

To return additional user information with the token:

```java
@PostMapping("/auth/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Authenticate user
    User user = authenticateUser(request.getEmail(), request.getPassword());
    
    // Generate token
    String token = jwtTokenProvider.generateToken(user.getEmail());
    
    // Return token with user data
    return ResponseEntity.ok(new AuthResponse(
        token,
        user.getId(),
        user.getEmail(),
        user.getName()
    ));
}
```

Frontend can then access this data:

```typescript
const response = await fetch("http://localhost:8080/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
console.log(data.id, data.name, data.token);
```

### Adding Protected API Endpoints

Create endpoints that require authentication:

```java
@GetMapping("/api/user/profile")
@PreAuthorize("isAuthenticated()")
public ResponseEntity<?> getUserProfile(Authentication authentication) {
    String email = authentication.getName();
    User user = userService.findByEmail(email);
    return ResponseEntity.ok(user);
}
```

Frontend can call this with token:

```typescript
import { apiGet } from "@/lib/api";

const profile = await apiGet("/api/user/profile");
```

---

## Support

For issues or questions about integration:
1. Check the troubleshooting section above
2. Review backend logs for error details
3. Verify all endpoints are implemented correctly
4. Test endpoints with curl or Postman first
5. Check that CORS is properly configured

