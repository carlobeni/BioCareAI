import { lazy, useEffect } from "react";
import IntroContent from "../../content/IntroContent.json";
import DashboardContent from "../../content/DashboardContent.json";
import ChatContent from "../../content/ChatContent.json";
import { useAuth } from "../../context/authContext";
import RealtimeData from "./RealtimeData";
import useFirebaseData from "../../hooks/useFirebaseData";

const IntroBlock = lazy(() => import("../../components/IntroBlock"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const ChatBlock = lazy(() => import("../../components/ChatBlock"));
const DashboardBlock = lazy(() => import("../../components/DashboardBlock"));

const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));


const Home = () => {
  const { user,isLoading} = useAuth()
  const {fbData,lastUpdated} = useFirebaseData()


  return (
    <Container>
      <ScrollToTop />
      <IntroBlock
        title={IntroContent.title}
        content={"Hola " +user.email+ " 👋"}
        button={IntroContent.button}
        id="intro"
      />
      <DashboardBlock
        title={DashboardContent.title}
        content={DashboardContent.text}
        data={fbData}
        timeUpdate={lastUpdated}
        id="dashboard"
        isLoading={isLoading}
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
