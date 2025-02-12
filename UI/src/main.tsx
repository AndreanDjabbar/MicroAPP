import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InsertEmployeePage from './components/pages/InsertEmployeePage.tsx'
import ShowEmployeePage from './components/pages/ShowEmployeePage.tsx'
import InsertFeedbackPage from './components/pages/InsertFeedbackPage.tsx'
import ShowFeedbackPage from './components/pages/ShowFeedbackPage.tsx'
import RegisterPage from './components/pages/RegisterPage.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage.tsx'
import AdminValidationPage from './components/pages/AdminValidationPage.tsx'

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
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/admin-validation',
    element: <AdminValidationPage/>
  }
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