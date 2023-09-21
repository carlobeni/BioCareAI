import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { DashboardBlockSection, Content, ContentWrapper } from "./styles";
import ChartCard from "../ChardCard";

interface DashboardBlockProps {
  title: string;
  content: string;
  id: string;
  t: any;
}

const DashboardBlock = ({ title, content, id,t, }: DashboardBlockProps) => {
  return (
    <DashboardBlockSection id={id}>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <Slide direction="left">
                <ChartCard iconIndex={0} unit="BPM"/>
              </Slide>
              <Slide direction="right">
                <ChartCard iconIndex={1} unit="% SpO2"/>
              </Slide>
              <Slide direction="left">
                <ChartCard iconIndex={2} unit="°C"/>
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
