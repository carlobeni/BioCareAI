import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import DeviceStep1Content from "../../content/DeviceStep1Content.json";
import DeviceStep2Content from "../../content/DeviceStep2Content.json";
import DeviceStep3Content from "../../content/DeviceStep3Content.json";
import ChatContent from "../../content/ChatContent.json";
import ContactContent from "../../content/ContactContent.json";

const IntroBlock = lazy(() => import("../../components/IntroBlock"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const ChatBlock = lazy(() => import("../../components/ChatBlock"));
const Contact = lazy(() => import("../../components/ContactForm"));

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));

const Home = () => {
  return (
    <Container>
      <ScrollToTop />
      <IntroBlock
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
      />
      <ContentBlock
        type="right"
        title={DeviceStep1Content.title}
        content={DeviceStep1Content.text}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        type="left"
        title={DeviceStep2Content.title}
        content={DeviceStep2Content.text}
        icon="product-launch.svg"
        id="mission"
      />
      <ContentBlock
        type="right"
        title={DeviceStep2Content.title}
        content={DeviceStep2Content.text}
        icon="product-launch.svg"
        id="mission"
      />
      <ChatBlock
        title={ChatContent .title}
        content={ChatContent .text}
        button={IntroContent.button}
      />
      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
