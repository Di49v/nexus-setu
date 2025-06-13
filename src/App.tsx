import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import ProjectForm from './components/ProjectForm';
import ProjectDetails from './components/ProjectDetails';
import AIScheduler from './components/AIScheduler';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/projects/new" element={<ProjectForm />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
              <Route path="/ai-scheduler" element={<AIScheduler />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ProjectProvider>
  );
}

export default App;