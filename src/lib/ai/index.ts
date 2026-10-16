import { ModelProvider } from "./provider";
import { OllamaProvider } from "./ollama-provider";
import { HostedProvider } from "./hosted-provider";

export * from "./provider";
export * from "./prompts";
export * from "./ollama-provider";
export * from "./hosted-provider";

export function getModelProvider(): ModelProvider {
  const providerType = (process.env.AI_PROVIDER || "").toLowerCase().trim();

  if (providerType === "hosted" || (process.env.HOSTED_AI_API_KEY && providerType !== "ollama")) {
    return new HostedProvider();
  }

  // Default to local Ollama provider
  return new OllamaProvider();
}
