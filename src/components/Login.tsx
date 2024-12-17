import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {isRegistering ? 'Registrace' : 'Přihlášení'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Heslo
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            {isRegistering ? 'Registrovat' : 'Přihlásit'}
          </button>
        </form>
        <button
          onClick={() => setIsRegistering(!isRegistering)}
          className="mt-4 text-blue-400 hover:text-blue-300 w-full text-center"
        >
          {isRegistering
            ? 'Již máte účet? Přihlaste se'
            : 'Nemáte účet? Zaregistrujte se'}
        </button>
      </div>
    </div>
  );
}