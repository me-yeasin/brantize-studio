declare module "groq-sdk" {
  export interface GroqOptions {
    apiKey: string | undefined;
  }

  export interface Message {
    role: "system" | "user" | "assistant";
    content: string;
  }

  export interface CompletionChoice {
    message: Message;
    finish_reason: string;
    index: number;
    delta?: {
      content: string;
    };
  }

  export interface CompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: CompletionChoice[];
  }

  export default class Groq {
    constructor(options: GroqOptions);
    chat: {
      completions: {
        create(options: {
          messages: Message[];
          model: string;
          temperature?: number;
          max_tokens?: number;
          max_completion_tokens?: number;
          top_p?: number;
          stream?: boolean;
          stop?: string | string[];
        }): Promise<CompletionResponse>;
      };
    };
  }
}
