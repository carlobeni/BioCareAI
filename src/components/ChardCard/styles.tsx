import styled from "styled-components";

export const CardContainer = styled("div")`
  border-radius: 15px; 
  padding: 20px; /* Aumenta el espacio interno */
  border: 1px solid #ccc;
  justify-content: space-between; /* Espaciado entre InfoContainer y LineChartContainer */
  align-items: center;
  margin-top:10px;
`;

export const LineChartContainer = styled("div")`
  height: 30vh;
  width: 100%;
  padding: 10px;
`;

export const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px; /* Espacio entre el icono y el texto */
`;

export const IconContainer = styled("div")`
  font-size: 24px; /* Aumenta el tamaño del icono */
  color: #FFA500; /* Cambia el color del icono a naranja */
`;

export const Text = styled("span")`
  font-size: 20px; /* Aumenta el tamaño del texto */
`;

// Resto de tu código...
