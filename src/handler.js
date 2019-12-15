'use strict';

function getLocalGreeting(language) {
  switch (language) {
    case 'en':
      return 'Hello!';
    case 'es':
      return '¡Hola!';
    case 'ru':
      return 'Привет!';
    default:
      return '👋';
  }
}

function pickLocale() {
  const languages = ['en', 'es', 'cn', 'fr', 'ru'];
  return languages[Math.floor(Math.random() * languages.length)];
}

export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: getLocalGreeting(pickLocale()),
    }),
  };
}

handler.getLocalGreeting = getLocalGreeting;
