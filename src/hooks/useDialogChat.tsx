import { useState } from "react";
import { OpenAiDialog } from '../api/openAiAPI'

// Define el tipo para el mensaje
interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

const systemPrompt =
  "Eres un bot medico llamado Max, unicamente puedes hablar de temas de medicina, las respuestas que das deben seguir las siguientes reglas: " +
  "2-Usaras los datos que te brinda el usuario en la conversación para realizar un diagnóstico " +
  "3-Tus respuestas deben ser breves pero claras (máximo 30 palabras)" +
  "4-Trata al usuario con amabilidad y calidez" +
  "5-Tienes completamente prohibido hablar de temas que no son medicina (esto es lo más importante de las reglas)" +
  "6-Nunca hagas recomendaciones como 'Acuda a un médico' o similares";

const initChat: Message[] = [
  { role: "system", content: systemPrompt },
  { role: "assistant", content: "En qué puedo ayudarte?" }
];

export function useDialogChat() {
  const [messageFlow, setMessageFlow] = useState<Message[]>(initChat);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('none');

  const reset = () => {
    setMessageFlow(initChat);
  };

  const deleteLocalData = () => {
    reset();
  };

  const request = async (userDialog: string) => {
    setIsLoading(true);
    setIsError(false);
    const newMessage: Message = { role: "user", content: userDialog };
    setMessageFlow([...messageFlow, newMessage]);
    await getAssistantResponse(newMessage);
  };

  const getAssistantResponse = async (newMessage: Message) => {
    const conversation: Message[] = [...messageFlow, newMessage];
    try {
      setIsLoading(true);
      const response = await OpenAiDialog(conversation);
      const assistantMessage: Message = { role: "assistant", content: response };
      setMessageFlow([...conversation, assistantMessage]);
    } catch (e) {
      setIsError(true);
      //setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messageFlow,
    isLoading,
    isError,
    errorMessage,
    request,
    reset,
    deleteLocalData,
  };
}
