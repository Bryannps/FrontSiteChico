import React from 'react';
import { Button } from './Button';

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planos do ChicoBot
          </h2>
          <p className="text-xl text-gray-600">
            Escolha o plano ideal para seu controle financeiro
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Plano Mensal - Destaque */}
          <div className="bg-primary-50 border-2 border-primary-500 rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MAIS POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mensal</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">R$ 30</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Pedidos ilimitados
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Pedidos simplificados por IA
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Dados salvos com segurança e anonimamente
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Relatórios avançados
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Exportação para Excel
              </li>
            </ul>
            <Button className="w-full">
              Escolher Mensal
            </Button>
          </div>
          
          {/* Plano Anual */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Anual</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">R$ 200</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tudo do mensal
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Economia de 44%
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Acesso antecipado a novos recursos
              </li>
            </ul>
            <Button className="w-full">
              Escolher Anual
            </Button>
          </div>
        </div>
        

      </div>
    </section>
  );
};