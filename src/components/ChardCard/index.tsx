import React from "react";
import styled from "styled-components";
import LineChart from "./components/LineChart";
import { BiDonateBlood, BiSolidHeart } from "react-icons/bi";
import { FaTemperatureLow } from "react-icons/fa";
import {
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
} from "./components/charts";
import {
  CardContainer,
  LineChartContainer,
  InfoContainer,
  IconContainer,
  Text,
} from "./styles";

interface Props {
  iconIndex: number;
  unit: string;
}

const Icons = [<BiSolidHeart />,<BiDonateBlood />,<FaTemperatureLow />]

export default function ChartCard({iconIndex,unit}: Props) {
  return (
    <CardContainer>
      <InfoContainer>
        <IconContainer>{Icons[iconIndex]}</IconContainer>
        <Text>60 {unit}</Text>
      </InfoContainer>
      <LineChartContainer>
        <LineChart
          chartData={lineChartDataTotalSpent}
          chartOptions={lineChartOptionsTotalSpent}
        />
      </LineChartContainer>
    </CardContainer>
  );
}
