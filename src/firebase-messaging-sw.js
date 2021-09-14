importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.4.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDq1kB201k3JwAQn16Cc87XUeiZkPOj4t8",
  projectId: "confidu-app-test",
  messagingSenderId: "862692374801",
  appId: "1:862692374801:web:6a0a2ec0ef4af53cfbb4b0",
});

const messaging = firebase.messaging();
