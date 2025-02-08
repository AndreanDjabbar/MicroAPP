import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import InsertEmployeePage from './components/pages/InsertEmployeePage.tsx'
import ShowEmployeePage from './components/pages/ShowEmployeePage.tsx'
import InsertFeedbackPage from './components/pages/InsertFeedbackPage.tsx'
import ShowFeedbackPage from './components/pages/ShowFeedbackPage.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const routers = [
  {
    path: "/",
    element: <ShowEmployeePage />,
  },
  {
    path: "/insert-data",
    element: <InsertEmployeePage/>
  },
  {
    path: '/show-data',
    element: <ShowEmployeePage />
  },
  {
    path: '/insert-feedback',
    element: <InsertFeedbackPage />
  },
  {
    path: '/show-feedback',
    element: <ShowFeedbackPage />
  },
];

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {routers.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  </React.StrictMode>
);