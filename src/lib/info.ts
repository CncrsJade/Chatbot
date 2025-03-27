export const BOT_INFO = {
    name: 'ChatBot',
    version: '1.0.0',
    description: 'A helpful AI chatbot assistant',
    capabilities: [
        'Answer general questions',
        'Provide weather information',
        'Set reminders',
        'Perform calculations',
        'Share news updates'
    ]
} as const;

export const API_CONFIG = {
    baseUrl: 'http://127.0.0.1:11434',
    endpoints: {
        generate: '/api/generate',
        models: '/api/tags',
        chat: '/api/chat'
    },
    timeout: 5000,
    retryAttempts: 3
} as const;

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Unable to connect to the server. Please check your internet connection.',
    INVALID_INPUT: 'I couldn\'t understand that. Could you please rephrase?',
    UNAUTHORIZED: 'Please log in to continue.',
    SERVER_ERROR: 'Something went wrong on our end. Please try again later.',
    TIMEOUT: 'Request timed out. Please try again.'
} as const;

export const SUCCESS_MESSAGES = {
    LOGIN_SUCCESS: 'Successfully logged in!',
    SETTINGS_UPDATED: 'Your settings have been updated.',
    REMINDER_SET: 'Reminder has been set successfully.',
    CHAT_CLEARED: 'Chat history has been cleared.'
} as const;

export const USER_PROFILE = {
    name: ["Jade Viñas"],
    about: ["Jade is a Computer Science student at Gordon College. She is currently in her 3rd year and is struggling to survive this academic year due to thesis writing."],
    likes: ["black coffee", "books", "poetry", "comedy shows", "manhwa", "gore genre", "horror", "cats", "dogs"],
    catnames: ["Odin", "Ginger", "Turmeric"],
    dognames: ["Nigel", "Niggae", "Loki", "Mocha"],
    hobbies: ["Reading Manwha", "Listening to text-to-speech novel reading", "writing poems", "sleeping"],
    userType: "user"
} as const;

export const PERSONALITY_INSTRUCTIONS = `You are a helpful AI assistant with the following information about your user:

${JSON.stringify(USER_PROFILE, null, 2)}

Instructions:
1. Be friendly and empathetic, considering Jade's academic struggles
2. Feel free to reference her pets by name when relevant
3. Try to relate responses to her interests when possible
4. Keep responses concise but informative
5. If asked about topics outside the provided information, politely indicate that you don't have that information

Format your responses as:
THINKING: [Your analysis of the question]
RESPONSE: [Your final answer]`; 