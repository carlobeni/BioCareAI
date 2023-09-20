import {useState} from 'react';
import './ChatScreen.css';
import { useDialogChat } from '../../hooks/useDialogChat';


const ChatScreen = () => {
  const [userText, setUserText] = useState("");
  const { messageFlow, request, isLoading, isError,errorMessage, reset } = useDialogChat();

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
    if (!userText.trim()){
      console.log("Texto vacio")
      return;
    } 
    sendQuestion();
    setUserText("");

  };
  const sendQuestion = async () => {
    try {
      await request(userText);
    } catch (error) {
      console.log(error.message)
    }
  };

  const handleDeleteChats = () => {
    if (window.confirm("Are you sure you want to delete all the chats?")) {
      localStorage.removeItem("all-chats");
      reset()
    }
  };
  

  return (
    <div>
      <div className="chat-container">
        {messageFlow.slice(1).map((dialog, index) => (
          <div key={index}
            className={`chat ${dialog.role === "user" ? "outgoing" : "incoming"}`}>
            <div className="chat-content">

              <div className="chat-details">
                <div className="chat-text">
                  {dialog.content}
                </div>
              </div>

              {!(dialog.role === "user") ? (
                <span onClick={() => handleCopyResponse(dialog.content)} className="material-symbols-rounded">
                  content_copy
                </span>
              ) : null}

            </div>
          </div>
        ))}
        {isLoading &&
          <div className="chat incoming">
            <div className="chat-content">
              <div className="chat-details">
                <div className="chat-text">
                  <div className="typing-animation">
                    <div className="typing-dot" style={{ "--delay": "0.2s" }}></div>
                    <div className="typing-dot" style={{ "--delay": "0.3s" }}></div>
                    <div className="typing-dot" style={{ "--delay": "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {isError &&
          <div className={`chat incoming`}>
          <div className="chat-content">
            <div className="chat-details">
              <div className="chat-text-error">
                Error: {errorMessage}
              </div>
            </div>
          </div>
        </div>
        }
      </div>
      <div className="typing-container">
        <div className="typing-content">
          <div className="typing-textarea">
            <textarea
              value={userText}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              placeholder="Type your message..."
            />
            {userText && (
              <span onClick={addUserMessage} className="material-symbols-rounded">
                send
              </span>
            )}
          </div>
          <div className="typing-controls">
            <span onClick={handleDeleteChats} className="material-symbols-rounded">
              delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
