// App.jsx - Main application with React Router setup
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import EducationalDisclaimer, { DisclaimerProvider } from './components/common/EducationalDisclaimer';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import AssetDetail from './pages/AssetDetail';
import Learn from './pages/Learn';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

/**
 * Layout wrapper: shows Navbar + Footer for main pages,
 * but hides them on auth pages (sign in / sign up)
 * 
 * Uses normal document flow:
 * - Disclaimer: sticky top-0 (stays at top while scrolling)
 * - Navbar: sticky top-0 (sits right below disclaimer in flow)
 * - Main content: no extra padding needed
 * 
 * When disclaimer closes, navbar naturally moves up with smooth transition.
 */
const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <>
      {!isAuthPage && <EducationalDisclaimer />}
      {!isAuthPage && <Navbar />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <DisclaimerProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/"           element={<Home />} />
            <Route path="/explore"    element={<Explore />} />
            <Route path="/asset/:id"  element={<AssetDetail />} />
            <Route path="/learn"      element={<Learn />} />
            <Route path="/signin"     element={<SignIn />} />
            <Route path="/signup"     element={<SignUp />} />
            {/* Fallback: redirect unknown routes to Home */}
            <Route path="*"           element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </DisclaimerProvider>
  );
};

export default App;
