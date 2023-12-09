import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ChatBlockSection, Content, ContentWrapper } from "./styles";
import ChatScreen from "./ChatScreen/ChatScreen";

interface ChatBlockProps {
  title: string;
  content: string;
  id: string;
  t: any;
}

const ChatBlock = ({ title, content, id, t }: ChatBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <ChatBlockSection id={id}>
      <Slide direction="left">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6>{t(title)}</h6>
              <Content>{t(content)}</Content>
              <Slide direction="right">
                <ChatScreen />
              </Slide>
            </Col>
          </ContentWrapper>
        </Row>
      </Slide>
    </ChatBlockSection>
  );
};

export default withTranslation()(ChatBlock);
