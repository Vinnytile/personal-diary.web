import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { NotesLinePage } from './pages/NotesLinePage'
import { NotePage } from './pages/NotePage'
import { NewNoteFormPage } from './pages/NewNoteFormPage';
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import { NavigateFunction } from './components/NavigateFunction'



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigateFunction />
      <Routes>
        <Route element={<Navigate replace to="/notes" />}path="/" />
        <Route element={<NotesLinePage />} path="/notes" />
        <Route element={<NotePage />} path="/note/:id" />
        <Route element={<NewNoteFormPage />} path="/newNote" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ErrorPage />}path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
