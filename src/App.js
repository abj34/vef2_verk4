import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import { Layout } from './components/pages/Layout';
import { Departments } from './components/departments/Departments';
import { Department } from './components/departments/Department';
import { Courses } from './components/courses/Courses';
import { Course } from './components/courses/Course';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Departments />} />
              <Route path="departments" element={<Departments />} />
              <Route path="departments/:slug" element={<Department />} />
              <Route path="departments/:slug/courses" element={<Courses />} />
              <Route path="departments/:slug/courses/:courseId" element={<Course />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;