import React from 'react';
import { useAuth } from '../context/AuthContext';
import { games } from '../data/games';
import { Link } from 'react-router-dom';

export function Library() {
  const { user } = useAuth();
  const ownedGames = games.filter(game => user?.ownedGames.includes(game.id));

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Pro zobrazení knihovny se musíte přihlásit</h2>
        <Link to="/login" className="text-blue-400 hover:text-blue-300">Přihlásit se</Link>
      </div>
    );
  }

  if (ownedGames.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Vaše knihovna je prázdná</h2>
        <p className="text-gray-300 mb-8">Zatím nemáte žádné hry. Navštivte náš obchod a objevte skvělé tituly!</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Přejít do obchodu
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-white mb-8">Moje knihovna</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ownedGames.map((game) => (
          <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
              <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                Hrát
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}