import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
              <nav className="space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600">
            Sobre
          </Link>
          <Link to="/chicobot" className="text-gray-600 hover:text-blue-600">
            ChicoBot
          </Link>
          <Link to="/api-tester" className="text-gray-600 hover:text-blue-600">
            🧪 Testar API
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600">
            Contato
          </Link>
        </nav>
    </header>
  );
};