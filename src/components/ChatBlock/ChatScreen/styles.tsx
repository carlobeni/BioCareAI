import styled from "styled-components";

export const ScreenContainer = styled("div")`
`;

export const ChatContainer = styled("div")`
  height: 40vh; 
  border-radius: 10px; 
  padding: 10px; 
  overflow-x: hidden;
  overflow-y: auto; 
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const UserDialog = styled("div")`
  display: flex;
  justify-content: flex-end; /* Los mensajes del usuario están a la derecha */
  margin-bottom: 10px; 
  background: #ececec; 
  border-radius: 15px; 
  padding: 10px; 
`;

export const BootDialog = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: #1db954; 
  border-radius: 15px; 
  padding: 10px; 
`;

export const ErrorDialog = styled("div")`
  color: red; 
`;

export const LoadingDialog = styled("div")`
  font-style: italic; 
`;

export const TypingContainer = styled("div")`
  margin-top: 10px; /* Ajusta el margen superior como sea necesario */
  padding: 5px;
  overflow: hidden;
`;

export const TypingTextArea = styled("div")`
flex: 1; /* Expande el TextArea para ocupar el espacio restante */
  display: flex;
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  transition: border-color 0.3s ease-in-out;

  .material-symbols-rounded {
    cursor: pointer;
    font-size: 1.5rem;
    margin-left: 10px;
  }

`;




// Añade estilos adicionales según sea necesario
