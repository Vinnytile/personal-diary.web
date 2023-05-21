import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SelfNotesLinePage } from './pages/SelfNotesLinePage'
import { NoteViewPage } from './pages/NoteViewPage'
import { NewNoteFormPage } from './pages/NewNoteFormPage';
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ErrorPage } from './pages/ErrorPage'
import { NavigateFunction } from './helpers/NavigateFunction'
import { RegisterFacePage } from './pages/RegisterFacePage';
import { LoginFacePage } from './pages/LoginFacePage';
import { LoginSwitcherPage } from './pages/LoginSwitcherPage';
import { Navbar } from './components/Navbar/Navbar';
import { RegisterProfilePage } from './pages/RegisterProfilePage';
import { UserProfilesLinePage } from './pages/UserProfilesLinePage';
import { GeneralNotesLinePage } from './pages/GeneralNotesLinePage';
import { NotePreviewPage } from './pages/NotePreviewPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavigateFunction />
      <Navbar />
      <Routes>
        <Route element={<Navigate replace to="/generalNotes" />} path="/" />
        <Route element={<SelfNotesLinePage />} path="/selfNotes" />
        <Route element={<GeneralNotesLinePage />} path="/generalNotes" />
        <Route element={<NoteViewPage />} path="/note/:id" />
        <Route element={<NotePreviewPage />} path="/notepreview/:id" />
        <Route element={<NewNoteFormPage />} path="/newNote" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<LoginFacePage />} path="/loginFace" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<RegisterFacePage />} path="/registerFace/:userId" />
        <Route element={<RegisterProfilePage />} path="/registerProfile/:userIdentityId" />
        <Route element={<LoginSwitcherPage />} path="/loginSwitcher" />
        <Route element={<UserProfilesLinePage />} path="/userProfiles" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
