import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OrderModal } from './components/OrderModal';
import { OrderTrackModal } from './components/OrderTrackModal';
import { HomePage } from './pages/HomePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { Book } from './types';

export const App: React.FC = () => {
  const [book, setBook] = useState<Book | null>(null);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [trackModalOpen, setTrackModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Showcase & Ordering Site */}
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen">
              <Navbar
                onOpenOrderModal={() => setOrderModalOpen(true)}
                onOpenTrackModal={() => setTrackModalOpen(true)}
              />
              <main className="flex-1">
                <HomePage
                  book={book}
                  setBook={setBook}
                  onOpenOrderModal={() => setOrderModalOpen(true)}
                  onOpenTrackModal={() => setTrackModalOpen(true)}
                />
              </main>
              <Footer />

              {/* Modals */}
              <OrderModal
                book={book}
                isOpen={orderModalOpen}
                onClose={() => setOrderModalOpen(false)}
              />
              <OrderTrackModal
                isOpen={trackModalOpen}
                onClose={() => setTrackModalOpen(false)}
              />
            </div>
          }
        />

        {/* Admin Portal */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminDashboardPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
