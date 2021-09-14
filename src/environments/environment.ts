// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDq1kB201k3JwAQn16Cc87XUeiZkPOj4t8",
    authDomain: "confidu-app-test.firebaseapp.com",
    databaseURL: "https://confidu-app-test-default-rtdb.firebaseio.com",
    projectId: "confidu-app-test",
    storageBucket: "confidu-app-test.appspot.com",
    messagingSenderId: "862692374801",
    appId: "1:862692374801:web:6a0a2ec0ef4af53cfbb4b0",
    measurementId: "G-R2NPP4R9X8"
    // vapidKey: 'BMqCmorVeDKwwwQzRVEVSXU5UVnWkzZfB1k-cMr6acpoIhjJ3Q3S8c-VC_PDZtr7VUj_PW6Mev4ucRs6t50YCe4'
  },
  logo: '../assets/icons/logo_confid.svg',
  baseUrl: 'https://confidu-app-test-dot-confidu-app.appspot.com',
  homeButton: '../../assets/icons/home-button.svg',
  iconPath: '../assets/icons',
  shopware: {
    accessKey: 'SWSCTEPMOXFBVKO1BKPDDEJQCA'
  },
  storefrontUrl: 'https://confidu-app.firebaseapp.com'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
