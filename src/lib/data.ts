export interface ChatMessage {
    id: string;
    content: string;
    timestamp: Date;
    sender: 'user' | 'bot';
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    preferences: UserPreferences;
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    language: string;
    notifications: boolean;
}

export interface ChatSession {
    id: string;
    userId: string;
    messages: ChatMessage[];
    startTime: Date;
    endTime?: Date;
    status: 'active' | 'completed' | 'archived';
}

export interface UserProfile {
    name: string[];
    about: string[];
    likes: string[];
    catnames: string[];
    dognames: string[];
    hobbies: string[];
    userType: string;
} 