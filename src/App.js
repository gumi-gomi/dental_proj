import React from 'react';
import './App.css';
import Header from './components/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import Bodypart from './components/Bodypart';
import Login from './components/Login';
import Footer from './components/Footer';
import styled, { createGlobalStyle } from 'styled-components';
import Implant from './components/Implant';
import Gj from './components/Gj';
import Normal from './components/Normal';
import Mypage from './components/Mypage';
import { AuthProvider, useAuth } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import IntroPg from './components/IntroPg';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
  }

  html, body, #root {
    height: 100%;
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

function AppContent() {
  const { currentUser } = useAuth();

  return (
    <AppContainer>
      <GlobalStyle/>
      <Header />
      <Content>
        <Routes>
          <Route path="/" element={<Bodypart />} />
          <Route path="/implant" element={<Implant/>} />
          <Route path="/gj" element={<Gj/>}/>
          <Route path="/login" element={currentUser ? <Navigate to="/mypage" replace /> : <Login />} />
          <Route
            path="/mypage"
            element={currentUser ? <Mypage/> : <Navigate to="/login" replace />}
          />
          <Route path="/normal" element={<Normal/>}/>
          <Route path="/introduce" element={<IntroPg/>}/>
        </Routes>
      </Content>
      <Footer />
    </AppContainer>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;