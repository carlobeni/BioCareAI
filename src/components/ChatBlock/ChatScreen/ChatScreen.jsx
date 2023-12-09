import React, { useState, useEffect } from 'react';
import { withTranslation } from "react-i18next";
import { useDialogChat } from '../../../hooks/useDialogChat';
import { FaCopy } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { Slide } from 'react-awesome-reveal';
import { Button, Checkbox } from 'antd';
import useFirebaseData from '../../../hooks/useFirebaseData';

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
  const [showError, setShowError] = useState(false);
  const { messageFlow, request, isLoading, isError, errorMessage, reset } = useDialogChat();
  const { fbData } = useFirebaseData();

  const [checked, setChecked] = useState(false);

  const handleCopyResponse = (responseText) => {
    navigator.clipboard.writeText(responseText);
  };

  const handleInputChange = (e) => {
    setUserText(e.target.value);
  };

  const handleInputKeyDown = (e) => {
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
    let userMessage = userText
    if (checked) {
      if (Object.keys(fbData).length === 0) {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      } else userMessage = `<< Mis biodatos son 📊 BPM: ${fbData.bpm} / SpO2: ${fbData.spo2} / Temperatura: ${fbData.temperature} 📊 >>. ${userText}`
    }
    try {
      await request(userMessage);
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <ScreenContainer>
      <ChatContainer>
        {messageFlow.slice(1).map((dialog, index) => {
          if (dialog.role === "user") return (
            <Slide direction='left' key={index}>
              <UserDialog>
                {dialog.content}
              </UserDialog>
            </Slide>)
          else if (dialog.role === "assistant") return (
            <Slide direction='right' key={index}>
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
        <Checkbox checked={checked} onChange={handleCheckboxChange}>
          Incluir Biodatos actuales en el mensaje
        </Checkbox>
        {showError && <div style={{ color: 'red' }}>No se encontraron mediciones</div>}
      </TypingContainer>
    </ScreenContainer>
  );
}

export default withTranslation()(ChatScreen);
