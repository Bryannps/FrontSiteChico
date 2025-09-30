import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🤖</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">ChicoBot</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              🏠 Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              ℹ️ Sobre
            </Link>
            <Link 
              to="/chicobot" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              🤖 ChicoBot
            </Link>
            <Link 
              to="/api-tester" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              🧪 Testar API
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              📞 Contato
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/login" 
              className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Entrar
            </Link>
            <Link 
              to="/chicobot" 
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md"
            >
              Começar Agora
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              🏠 Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              ℹ️ Sobre
            </Link>
            <Link 
              to="/chicobot" 
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              🤖 ChicoBot
            </Link>
            <Link 
              to="/api-tester" 
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              🧪 Testar API
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
            >
              📞 Contato
            </Link>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                Entrar
              </Link>
              <Link 
                to="/chicobot" 
                className="bg-primary-600 hover:bg-primary-700 text-white block px-3 py-2 rounded-md text-base font-medium mt-2"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};