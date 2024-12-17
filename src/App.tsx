import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Library } from './components/Library';
import { Cart } from './components/Cart';
import { Login } from './components/Login';
import { GameCard } from './components/GameCard';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { games } from './data/games';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <main className="container mx-auto px-4 py-8">
                  <h1 className="text-4xl font-bold text-white mb-8">Nejnovější hry</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {games.map((game) => (
                      <GameCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        price={game.price}
                        imageUrl={game.imageUrl}
                        description={game.description}
                      />
                    ))}
                  </div>
                </main>
              } />
              <Route path="/library" element={<Library />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
            <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
              <div className="container mx-auto px-4 text-center">
                <p>&copy; 2024 NextWave Games. Všechna práva vyhrazena.</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}