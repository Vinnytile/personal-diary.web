import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NotesLinePage } from './pages/NotesLinePage'
import { NoteViewPage } from './pages/NoteViewPage'
import { NewNoteFormPage } from './pages/NewNoteFormPage';
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ErrorPage } from './pages/ErrorPage'
import { NavigateFunction } from './helpers/NavigateFunction'
import { RegisterFacePage } from './pages/RegisterFacePage';
import { LoginFacePage } from './pages/LoginFacePage';
import { LoginSwitcherPage } from './pages/LoginSwitcherPage';
import { TestPage } from './pages/TestPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigateFunction />
      <Routes>
        <Route element={<Navigate replace to="/notes" />} path="/" />
        <Route element={<NotesLinePage />} path="/notes" />
        <Route element={<NoteViewPage />} path="/note/:id" />
        <Route element={<NewNoteFormPage />} path="/newNote" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<LoginFacePage />} path="/loginFace" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<RegisterFacePage />} path="/registerFace/:userId" />
        <Route element={<LoginSwitcherPage />} path="/loginSwitcher" />
        <Route element={<TestPage />} path="/test" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
