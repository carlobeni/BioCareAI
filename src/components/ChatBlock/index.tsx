import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ChatBlockSection, Content, ContentWrapper } from "./styles";
import ChatScreen from "./ChatScreen";

interface ChatBlockProps {
  title: string;
  content: string;
  button: string;
  id: string;
  t: any;
}

const ChatBlock = ({ title, content, button, id, t }: ChatBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <ChatBlockSection id={id}>
      <Slide direction="up">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <ChatScreen/>
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </ChatBlockSection>
  );
};

export default withTranslation()(ChatBlock);
