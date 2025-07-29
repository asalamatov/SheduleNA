import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import config from '@/public/assets/json/chat-config.json'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  // Add system prompt and knowledge base context
  const systemMessage = {
    role: "system",
    content: `${config.system_prompt}\n\nKnowledge Base:\n${config.knowledge_base.join("\n")}`
  };

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const responseStream = await client.responses.create({
          model: 'gpt-4o',
          input: [
            systemMessage,
            ...messages.map((m: any) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          stream: true,
        });

        for await (const event of responseStream) {
          if (event.type === 'response.output_text.delta') {
            controller.enqueue(event.delta);
          } else if (event.type === 'response.completed') {
            controller.close();
          }
        }
      } catch (err) {
        console.error('Streaming error:', err);
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}