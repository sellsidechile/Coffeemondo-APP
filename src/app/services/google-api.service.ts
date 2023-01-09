import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

const oAuthConfig: AuthConfig = {
  issuer: 'accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId:
    '661225577781-0l62ursjv9jgo1fr2220qej4ehdb33s9.apps.googleusercontent.com',
  scope:
    'openid profile email /auth/userinfo.profile /auth/gmail.labels',
};

@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  constructor(private readonly oAuthService: OAuthService) {
    oAuthService.configure(oAuthConfig);
    oAuthService
      .loadDiscoveryDocument()
      .then(() => {
        oAuthService
          .tryLoginImplicitFlow()
          .then(() => {
            if (!oAuthService.hasValidAccessToken()) {
              oAuthService.initLoginFlow();
            } else {
              oAuthService
                .loadUserProfile()
                .then((userProfile) => {
                  console.log(JSON.stringify(userProfile));
                })
                .catch((err) => {
                  console.log(
                    '🚀 ~ file: google-api.service.ts ~ line 29 ~ GoogleApiService ~ oAuthService.loadUserProfile ~ err',
                    err
                  );
                });
            }
          })
          .catch((err) => {
            console.log(
              '🚀 ~ file: google-api.service.ts ~ line 34 ~ GoogleApiService ~ oAuthService.tryLoginImplicitFlow ~ err',
              err
            );
          });
      })
      .catch((err) => {
        console.log(
          '🚀 ~ file: google-api.service.ts ~ line 38 ~ GoogleApiService ~ oAuthService.loadDiscoveryDocument ~ err',
          err
        );
      });
  }
}
