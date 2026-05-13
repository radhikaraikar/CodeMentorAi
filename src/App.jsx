import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Loader from './components/common/Loader';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const ExplainCode = lazy(() => import('./pages/ExplainCode'));
const DebugCode = lazy(() => import('./pages/DebugCode'));
const OptimizeCode = lazy(() => import('./pages/OptimizeCode'));
const VivaQuestions = lazy(() => import('./pages/VivaQuestions'));
const History = lazy(() => import('./pages/History'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Result = lazy(() => import('./pages/Result'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/explain" element={<ExplainCode />} />
              <Route path="/debug" element={<DebugCode />} />
              <Route path="/optimize" element={<OptimizeCode />} />
              <Route path="/viva" element={<VivaQuestions />} />
              <Route path="/history" element={<History />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/result" element={<Result />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1e293b',
              color: '#f8fafc',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: '12px',
              fontSize: '14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#1e293b' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#1e293b' },
            },
          }}
        />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
