import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com/',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '313404942414-llsvcmel7h1hemblmjrp1s34h1ji6qvj.apps.googleusercontent.com',
  scope: 'openid profile email /auth/userinfo.profile /auth/gmail.labels /auth/gmail.send /auth/gmail.readonly',

}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  constructor(private readonly oAuthService: OAuthService) 
  {
   oAuthService.configure(oAuthConfig)
   oAuthService.loadDiscoveryDocument().then( () => {
    oAuthService.tryLoginImplicitFlow().then( () => {
      if(!oAuthService.hasValidAccessToken()){
        oAuthService.initLoginFlow()
      } else {
        oAuthService.loadUserProfile().then( (userProfile) => {
          console.log(JSON.stringify(userProfile))
        })
      }
    })
   })
  }
}