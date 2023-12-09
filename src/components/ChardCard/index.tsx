import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LineChart from "./components/LineChart";
import { BiDonateBlood, BiSolidHeart } from "react-icons/bi";
import { FaTemperatureLow } from "react-icons/fa";

import {
  CardContainer,
  InfoContainer,
  IconContainer,
  Text,
  TextContainer
} from "./styles";
import { ProgressBar } from "react-progressbar-fancy";
import { Para } from "../Footer/styles";

interface Props {
  iconIndex: number;
  unit: string;
  value: number;
  max: number;
  min: number;
}


const Icons = [<BiSolidHeart />, <BiDonateBlood />, <FaTemperatureLow />]

export default function ChartCard({ iconIndex, unit, value, max, min }: Props) {

  const [color, setcolor] = useState<"green" | "red" | "blue" | "purple">("green")
  const [text, settext] = useState("")

  useEffect(() => {
    if (value < min) {
      settext("Bajo")
      setcolor("blue")
    }
    else if (value > max) {
      settext("Alto")
      setcolor("red")
    }
    else {
      settext("Normal")
      setcolor("green")
    }
  }, [value])


  return (
    <CardContainer>
      <InfoContainer>
        <IconContainer>{Icons[iconIndex]}</IconContainer>
        <Text>{value} {unit}</Text>
        <TextContainer style={{ color: color }}>
          ({text})
        </TextContainer>
      </InfoContainer>
      <ProgressBar
        className="space"
        progressColor={color}
        darkTheme
        score={100*((value-min)/(max-min))}
        hideText={true}
      />
    </CardContainer>
  );
}
