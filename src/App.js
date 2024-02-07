import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ContentForm from './pages/ContentForm';
import ContentPreview from './pages/ContentPreview';
import ContentView from './pages/ContentView';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path="/" element={<ContentView />} />
        <Route path="/add-content" element={<ContentForm />} />
        <Route path="/content/:id" element={<ContentPreview />} />
      </Routes>
    </div>
    </>
    
  );
}

export default App;
