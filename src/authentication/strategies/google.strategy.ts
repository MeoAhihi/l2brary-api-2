// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { Strategy, VerifyCallback } from 'passport-google-oauth20';
// import { AuthenticationService } from '../authentication.service';
// import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } from '../constants/auth.constants';

// @Injectable()
// export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
//   constructor(private readonly authService: AuthenticationService) {
//     super({
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       callbackURL: GOOGLE_CALLBACK_URL,
//       scope: ['email', 'profile'],
//     } as any);
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: VerifyCallback,
//   ): Promise<any> {
//     const { name, emails, photos } = profile;
//     const user = {
//       email: emails[0].value,
//       fullName: name.givenName + ' ' + name.familyName,
//       internationalName: name.givenName + ' ' + name.familyName,
//       avatar: photos[0].value,
//       googleId: profile.id,
//     };
//     done(null, user);
//   }
// }
