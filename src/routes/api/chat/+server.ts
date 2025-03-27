import { json, type RequestHandler } from "@sveltejs/kit";
import { PERSONALITY_INSTRUCTIONS } from "$lib/info.js";

// Types for API request/response
interface ChatRequest {
    chat: string;
    model?: string;
    stream?: boolean;
}

interface OllamaResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { chat: message, model = 'deepseek-r1', stream = false } = await request.json() as ChatRequest;

        if (!message?.trim()) {
            return json({ 
                success: false, 
                message: 'Message cannot be empty' 
            }, { status: 400 });
        }

        const response = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                prompt: `${PERSONALITY_INSTRUCTIONS}\n\nUser: ${message}\nAssistant:`,
                stream,
                temperature: 0.7,
                top_k: 40,
                top_p: 0.9,
                repeat_penalty: 1.1
            })
        });

        if (!response.ok) {
            throw new Error(`Ollama API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json() as OllamaResponse;
        
        return json({ 
            success: true,
            message: data.response.trim(),
            model: data.model
        });
        
    } catch (error) {
        console.error('Error in chat API:', error);
        
        return json({ 
            success: false,
            message: error instanceof Error ? error.message : 'Failed to get response from Ollama',
        }, { status: 500 });
    }
}; 