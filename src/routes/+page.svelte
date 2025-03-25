<script lang="ts">
  

    interface Message {
      role: 'user' | 'assistant' | 'system';
      content: string;
      thinking?: string;
      answer?: string;
    }
  
    let chatInput = '';
    let messages: Message[] = [];
    let loading = false;
  
    // Function to parse AI response into thinking and answer sections
    function parseAIResponse(content: string): { thinking: string, answer: string } {
      // Default values
      let thinking = '';
      let answer = '';
      
      // Check if the response contains the THINKING and ANSWER sections
      const thinkingMatch = content.match(/THINKING:(.+?)(?=ANSWER:|$)/s);
      const answerMatch = content.match(/ANSWER:(.+?)$/s);
      
      if (thinkingMatch) {
        thinking = thinkingMatch[1].trim();
      }
      
      if (answerMatch) {
        answer = answerMatch[1].trim();
      }
      
      // If no structured format is found, use the whole content as the answer
      if (!thinking && !answer) {
        answer = content;
      }
      
      return { thinking, answer };
    }
  
    async function sendMessage() {
      if (!chatInput.trim()) return;
      
      // Add user message to chat
      messages = [...messages, { role: 'user', content: chatInput }];
      const userMessage = chatInput;
      chatInput = '';
      loading = true;
  
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ chat: userMessage })
        });
  
        const data = await response.json();
        
        // Add AI response to chat
        if (data.success) {
          const { thinking, answer } = parseAIResponse(data.message);
          messages = [...messages, { 
            role: 'assistant', 
            content: data.message,
            thinking,
            answer
          }];
        } else {
          messages = [...messages, { 
            role: 'system', 
            content: data.message || 'Error: Failed to get response from AI model. Please try again.' 
          }];
        }
      } catch (error) {
        console.error('Error sending message:', error);
        messages = [...messages, { 
          role: 'system', 
          content: 'Error: Could not connect to the chatbot. Please check if the server is running.' 
        }];
      } finally {
        loading = false;
      }
    }
  
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    }
  </script>
  
  
  
  
  <div class="max-w-4xl mx-auto p-5 flex flex-col h-screen box-border">
    <header class="text-center mb-5">
      <h1 class="mb-4 text-3xl font-bold text-[#077773]">Chatter Bot</h1>
      <p class="text-gray-600">Chatter Bot is a chatbot that can answer questions related to Jade.</p>
    </header>
  
    <div class="flex-1 overflow-y-auto p-3 bg-gray-100 rounded-lg border border-[#3feded] mb-5 flex flex-col">
      {#if messages.length === 0}
        <div class="text-center p-5 text-[#34b0c9] italic">
          <p>Hello! Ask me anything about Jade's likes, hobbies, or preferences!</p>
        </div>
      {:else}
        {#each messages as message}
          <div class="flex items-end gap-2 mb-4 {message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}">
            <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 {message.role === 'user' ? 'bg-[#074457]' : 'bg-[#077773]'} flex items-center justify-center">
              {#if message.role === 'user'}
                <img src="/User-Avatar.png" alt="user" class="w-full h-full object-cover p-0.1" style="background: #077773;" />
              {:else}
                <img src="/ChatBot-Avatar.png" alt="AI Assistant" class="w-full h-full object-cover p-0.3" style="background: #077773;" />
              {/if}
            </div>
            <div class="message max-w-[80%] p-3 rounded-2xl animate-fadeIn {message.role === 'user' ? 'bg-[#074457] text-white rounded-br-sm' : message.role === 'assistant' ? 'bg-gray-200 text-gray-800 rounded-bl-sm' : 'bg-red-100 text-red-800 text-sm'}">
              {#if message.role === 'assistant' && (message.thinking || message.answer)}
                {#if message.thinking}
                  <div class="mb-2 border-b border-gray-300 pb-2">
                    <div class="font-bold mb-1 text-sm">Thinking Process:</div>
                    <div class="italic text-gray-600 text-sm">{message.thinking}</div>
                  </div>
                {/if}
                {#if message.answer}
                  <div class="mb-2">
                    <div class="font-bold mb-1 text-sm">Answer:</div>
                    <div class="font-medium">{message.answer}</div>
                  </div>
                {/if}
              {:else}
                <div class="break-words">
                  {message.content}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      {/if}
      
      {#if loading}
        <div class="flex items-end gap-2">
          <div class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-[#077773] flex items-center justify-center">
            <img src="/ChatBot-Avatar.png" alt="AI Assistant" class="w-full h-full object-cover p-0.3" style="background: #077773;" />
          </div>
          <div class="message bg-gray-200 text-gray-800 rounded-2xl rounded-bl-sm">
            <div class="flex items-center justify-center h-10 w-15">
              <span class="h-2 w-2 bg-[#188a9b] rounded-full inline-block mx-0.5 animate-bounce"></span>
              <span class="h-2 w-2 bg-[#188a9b] rounded-full inline-block mx-0.5 animate-bounce [animation-delay:0.2s]"></span>
              <span class="h-2 w-2 bg-[#188a9b] rounded-full inline-block mx-0.5 animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        </div>
      {/if}
    </div>
  
    <div class="flex gap-2.5">
      <textarea 
        bind:value={chatInput} 
        on:keydown={handleKeyDown}
        placeholder="Ask something about Jade..."
        rows="1"
        class="flex-1 p-3 border border-gray-300 rounded-full resize-none font-inherit text-base outline-none transition-colors focus:border-[#2ec0a5] focus:border-2"
      ></textarea>
      <button 
        on:click={sendMessage} 
        disabled={loading || !chatInput.trim()}
        class="px-5 bg-[#0d6260] text-white border-none rounded-full cursor-pointer font-bold transition-colors hover:bg-[#0099cc] disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </div>
  </div>
  
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-in-out;
    }
  </style>
  