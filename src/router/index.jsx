import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Styles } from "../styles/styles";
import { Login } from "../pages/Login";
import Home from "../pages/Home";
import { Register } from "../pages/Login/Register";
import { ResetPassword } from "../pages/Login/ResetPassword";
import { AuthProvider } from "../context/authContext";
import { ProtectedRoute } from "./ProtectedRoute";


const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/resetpassword" element={<ResetPassword/>}/>
      </Routes>
    </AuthProvider>
      <Footer />
    </Suspense>
  );
};

export default Router;
