import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NotesLinePage } from './pages/NotesLinePage'
import { NotePage } from './pages/NotePage'
import { NewNoteFormPage } from './pages/NewNoteFormPage';
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ErrorPage } from './pages/ErrorPage'
import { NavigateFunction } from './helpers/NavigateFunction'
import { RegisterFacePage } from './pages/RegisterFacePage';
import WebPage from './pages/WebPage';
import { LoginFacePage } from './pages/LoginFacePage';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigateFunction />
      <Routes>
        <Route element={<Navigate replace to="/notes" />} path="/" />
        <Route element={<NotesLinePage />} path="/notes" />
        <Route element={<NotePage />} path="/note/:id" />
        <Route element={<NewNoteFormPage />} path="/newNote" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<LoginFacePage />} path="/loginFace/:userId" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<RegisterFacePage />} path="/registerFace/:userId" />
        <Route element={<WebPage />} path="/webcam" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
