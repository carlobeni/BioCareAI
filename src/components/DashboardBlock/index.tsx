import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { DashboardBlockSection, Content, ContentWrapper } from "./styles";
import ChartCard from "../ChardCard";
import { useEffect } from "react";

interface DashboardBlockProps {
  title: string;
  content: string;
  id: string;
  t: any;
  data:any
  isLoading:boolean
  timeUpdate:string
}

const DashboardBlock = ({ title, content, id,t,data,timeUpdate }: DashboardBlockProps) => {

  
  return (
    <DashboardBlockSection id={id}>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <>Ultima Actualización: {timeUpdate}</>
              <Slide direction="left">
                <ChartCard iconIndex={0} value = {data.bpm || 0 } unit="BPM" min={40} max={100}/>
              </Slide>
              <Slide direction="right">
                <ChartCard iconIndex={1} value = {data.spo2 || 0} unit="% SpO2" min={95} max={100}/>
              </Slide>
              <Slide direction="left">
                <ChartCard iconIndex={2} value = {data.temperature || 0} unit="°C" min={35} max={37}/>
              </Slide>
              <></>
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </DashboardBlockSection>
  );
};

export default withTranslation()(DashboardBlock);
