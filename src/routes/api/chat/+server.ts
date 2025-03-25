import { json, type RequestHandler } from "@sveltejs/kit";
import { Ollama } from "ollama";

export const POST: RequestHandler = async ({ request }) => {
  const ollama = new Ollama({ host: "http://localhost:11434" });

  const body = await request.json();
  const chatMessage = body.chat || "";

  const user = {
    name: ["Jade Viñas"],
    about: ["Jade is a Computer Science student at Gordon College. She is currently in her 3rd year and is struggling to survive this academic year due to thesis writing."],
    likes: ["black coffee", "books", "poetry", "comedy shows", "manhwa", "gore genre", "horror","cats", "dogs"],
    catnames: ["Odin" , "Ginger", "Turmeric"],
    dognames: ["Nigel", "Niggae", "Loki", "Mocha"],
    hobbies: ["Reading Manwha", "Listening to text-to-speech novel reading", "writing poems", "sleeping"],
    userType: "user",
  };

  try {
    const chat = await ollama.chat({
      model: "deepseek-r1:7b",
      messages: [
        {
          role: "system",
          content: `Here is the data of my user: ${JSON.stringify(user)}
                   
                   When responding to questions about the user, please format your response in two parts:
                   
                   1. THINKING: First, analyze the data and think about what information is relevant to the question.
                   2. ANSWER: Then provide a concise final answer based only on the data provided.
                   
                   Always structure your response with these two clearly labeled sections.`,
        },
        {
          role: "user",
          content: chatMessage,
        },
      ],
    });

    // Extract the message content for easier access in the frontend
    return json({
      success: true,
      message: chat.message.content
    });
  } catch (error) {
    console.error('Error calling Ollama API:', error);
    return json({
      success: false,
      message: 'Failed to get response from AI model'
    }, { status: 500 });
  }
}; 