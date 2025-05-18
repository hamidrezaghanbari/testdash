import Cookies from 'js-cookie';
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://sso.lazytech.ir/',
  realm: 'services',
  clientId: 'web-analytics-panel',
});

const keycloakInit = keycloak.init({
  onLoad: 'login-required',
  checkLoginIframe: false,
});

keycloakInit
  .then((authenticated) => {
    if (authenticated) {
      const userUuid = keycloak.idTokenParsed?.sub;

      if (userUuid) {
        Cookies.set('userUuid', userUuid, {
          expires: 7,
          secure: true,
          sameSite: 'Strict',
        });
        Cookies.set('username', keycloak.tokenParsed?.preferred_username, {
          expires: 7,
          secure: true,
          sameSite: 'Strict', // CSRF protection
        });
      }
    } else {
      keycloak.login();
    }
  })
  .catch((err) => {
    console.error('Keycloak init failed', err);
  });

export { keycloak, keycloakInit };
