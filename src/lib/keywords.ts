export const COMMAND_KEYWORDS = {
    HELP: 'help',
    START: 'start',
    STOP: 'stop',
    CLEAR: 'clear',
    SETTINGS: 'settings',
    PROFILE: 'profile',
    LOGOUT: 'logout'
} as const;

export const RESPONSE_KEYWORDS = {
    GREETING: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    FAREWELL: ['goodbye', 'bye', 'see you', 'take care'],
    THANKS: ['thank you', 'thanks', 'appreciate it'],
    ERROR: ['error', 'sorry', 'problem', 'issue'],
    CONFIRMATION: ['yes', 'yeah', 'okay', 'ok', 'sure'],
    NEGATION: ['no', 'nope', 'not', 'never']
} as const;

export const INTENT_KEYWORDS = {
    WEATHER: ['weather', 'temperature', 'forecast', 'rain', 'sunny'],
    NEWS: ['news', 'headlines', 'latest', 'current events'],
    CALCULATOR: ['calculate', 'math', 'sum', 'addition', 'subtraction'],
    REMINDER: ['remind', 'reminder', 'schedule', 'calendar', 'appointment']
} as const; 