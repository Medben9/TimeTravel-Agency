type MistralMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

type DestinationContext = {
  title: string;
  period: string;
  startingPrice: string;
  summary: string;
};

type RequestMistralReplyParams = {
  apiKey: string;
  model: string;
  userInput: string;
  history: MistralMessage[];
  destinations: DestinationContext[];
};

export async function requestMistralReply({
  apiKey,
  model,
  userInput,
  history,
  destinations,
}: RequestMistralReplyParams): Promise<string> {
  const destinationContext = destinations
    .map(
      (destination) =>
        `- ${destination.title} (${destination.period}) | From ${destination.startingPrice} | ${destination.summary}`
    )
    .join('\n');

  const systemPrompt = `You are the virtual assistant of TimeTravel Agency, a luxury time-travel agency.
Tone: professional, warm, historically passionate, enthusiastic but never casual.
You are an expert in these destinations:\n${destinationContext}

Capabilities:
- Answer destination questions
- Provide coherent fictional luxury pricing guidance
- Help users choose the right era from their interests
- Answer FAQ about the agency in a credible way

Rules:
- Keep answers concise (2-4 sentences)
- If asked about safety, mention guided and secure protocols
- If unclear request, ask one clarifying question
- Never claim real-world certainty for fictional travel details.`;

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.5,
      max_tokens: 260,
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: userInput },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Mistral request failed: ${response.status}`);
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = payload.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('Empty Mistral response');
  }

  return content;
}
