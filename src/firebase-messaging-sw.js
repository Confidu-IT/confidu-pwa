importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyDRiHrFLubf7mqQoykAl216RPOh4lnzGP0',
  projectId: 'confidu-app',
  messagingSenderId: '944987547095',
  appId: '1:944987547095:web:73f32524698d702a0f1792',
});

const messaging = firebase.messaging();
