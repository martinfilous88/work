import React from 'react';
import { ShoppingCart, Library, LogOut, UserCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          NextWave Games
        </Link>
        <div className="flex gap-6">
          <Link to="/library" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <Library size={24} />
            <span>Knihovna</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
            <ShoppingCart size={24} />
            <span>Košík</span>
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <span className="text-sm">
                Úroveň: {user?.level} | XP: {user?.experience}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-2 hover:text-red-300 transition-colors"
              >
                <LogOut size={24} />
                <span>Odhlásit</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <UserCircle2 size={24} />
              <span>Přihlášení</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}