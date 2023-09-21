import React, { useState } from 'react';
import { withTranslation } from "react-i18next";
import { useDialogChat } from '../../../hooks/useDialogChat';
import { FaCopy, FaTrash } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { Slide } from 'react-awesome-reveal';
import { Button, Checkbox } from 'antd';

import {
  ScreenContainer,
  ChatContainer,
  UserDialog,
  BootDialog,
  ErrorDialog,
  LoadingDialog,
  TypingContainer,
  TypingTextArea
} from './styles';

const ChatScreen = () => {
  const [userText, setUserText] = useState("");
  const { messageFlow, request, isLoading, isError, errorMessage, reset } = useDialogChat();

  const handleCopyResponse = (responseText: string) => {
    navigator.clipboard.writeText(responseText);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      addUserMessage();
    }
  };

  const addUserMessage = () => {
    if (!userText.trim()) {
      console.log("Texto vacío");
      return;
    }
    sendQuestion();
    setUserText("");
  };

  const sendQuestion = async () => {
    try {
      await request(userText);
    } catch (error) {
      //console.log(error.message);
    }
  };

  const handleDeleteChats = () => {
    if (window.confirm("Are you sure you want to delete all the chats?")) {
      localStorage.removeItem("all-chats");
      reset();
    }
  };

  return (
    <ScreenContainer>
      <ChatContainer>
        {messageFlow.slice(1).map((dialog, index) => {
          if (dialog.role === "user") return (
            <Slide direction='left'>
              <UserDialog>
                {dialog.content}
              </UserDialog>
            </Slide>)
          else if (dialog.role === "assistant") return (
            <Slide direction='right'>
              <BootDialog>
                {dialog.content}
                <span onClick={() => handleCopyResponse(dialog.content)}>
                  <FaCopy />
                </span>
              </BootDialog>
            </Slide>)
        })}
        {isLoading && (
          <LoadingDialog>Aguarde un momento...</LoadingDialog>
        )}
        {isError && (
          <ErrorDialog>Error</ErrorDialog>
        )}
      </ChatContainer>
      <TypingContainer>
        <TypingTextArea>
          <textarea
            value={userText}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Escribe aqui..."
          />
          {userText && (
            <span onClick={addUserMessage} className="material-symbols-rounded send-icon">
              <MdSend />
            </span>
          )}
        </TypingTextArea>
        <Checkbox>
        Incluir datos Biodatos actuales en el mensaje
        </Checkbox>
        
      </TypingContainer>
    </ScreenContainer>
  );
}

export default withTranslation()(ChatScreen);
