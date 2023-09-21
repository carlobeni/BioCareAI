import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import DeviceStep1Content from "../../content/DeviceStep1Content.json";
import DeviceStep2Content from "../../content/DeviceStep2Content.json";
import DeviceStep3Content from "../../content/DeviceStep3Content.json";
import DashboardContent from "../../content/DashboardContent.json";
import ChatContent from "../../content/ChatContent.json";

const IntroBlock = lazy(() => import("../../components/IntroBlock"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const ChatBlock = lazy(() => import("../../components/ChatBlock"));
const DashboardBlock = lazy(() => import("../../components/DashboardBlock"));

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
        id="step1"
      />
      <ContentBlock
        type="left"
        title={DeviceStep2Content.title}
        content={DeviceStep2Content.text}
        icon="product-launch.svg"
        id="step2"
      />
      <ContentBlock
        type="right"
        title={DeviceStep3Content.title}
        content={DeviceStep3Content.text}
        icon="product-launch.svg"
        id="step3"
      />
      <DashboardBlock
        title={DashboardContent.title}
        content={DashboardContent.text}
        button={DashboardContent.button}
        id="dashboard"
      />
      <ChatBlock
        title={ChatContent.title}
        content={ChatContent.text}
        id="chat"
      />
    </Container>
  );
};

export default Home;
