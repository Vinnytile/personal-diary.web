import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesLinePage } from './pages/NotesLinePage'
import { NotePage } from './pages/NotePage'
import { NewNoteFormPage } from './pages/NewNoteFormPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<NotesLinePage />} path="/" />
        <Route element={<NotePage />} path="/note/:id" />
        <Route element={<NewNoteFormPage />} path="/newNote"/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
