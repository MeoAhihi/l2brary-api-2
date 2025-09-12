# Authentication Module

This module implements Passport.js authentication with JWT tokens and Google OAuth.

## Features

- **Login**: Email/password authentication with JWT access and refresh tokens
- **Register**: User registration with invite code validation
- **Google OAuth**: Google login integration
- **Token Refresh**: Refresh access tokens using refresh tokens
- **Protected Routes**: JWT authentication guard for protecting routes

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback

# Frontend URL for OAuth redirects
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register?inviteCode=<code>` - User registration
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `POST /auth/refresh` - Refresh access token
- `GET /auth/profile` - Get current user profile (protected)

### Request/Response Examples

#### Login
```json
POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "fullName": "John Doe",
    // ... other user fields
  }
}
```

#### Register
```json
POST /auth/register?inviteCode=ABC123
{
  "fullName": "John Doe",
  "internationalName": "John Doe",
  "gender": "male",
  "birthdate": "1990-01-01",
  "phoneNumber": "+1234567890",
  "email": "user@example.com",
  "password": "password123"
}

Response: Same as login response
```

#### Refresh Token
```json
POST /auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Response:
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Usage in Other Modules

To protect routes in other modules, use the `JwtAuthGuard`:

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getProtectedData(@Req() req: any) {
    // req.user contains the authenticated user
    return req.user;
  }
}
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs: `http://localhost:3000/auth/google/callback`
6. Copy Client ID and Client Secret to your `.env` file

## Token Configuration

- **Access Token**: 15 minutes expiration
- **Refresh Token**: 7 days expiration
- **Algorithm**: HS256 (HMAC with SHA-256)

## Security Notes

- Passwords are hashed using bcrypt with salt rounds of 10
- JWT secrets should be strong and unique
- Refresh tokens should be stored securely on the client side
- Consider implementing token blacklisting for logout functionality
