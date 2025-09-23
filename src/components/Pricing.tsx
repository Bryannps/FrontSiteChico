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
          {/* Plano Gratuito */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Gratuito</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">R$ 0</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Até 50 transações/mês
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                3 categorias básicas
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Relatórios simples
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Suporte por email
              </li>
            </ul>
            <Button variant="secondary" className="w-full">
              Começar Grátis
            </Button>
          </div>
          
          {/* Plano Premium - Destaque */}
          <div className="bg-primary-50 border-2 border-primary-500 rounded-lg p-8 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                MAIS POPULAR
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">R$ 29</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Transações ilimitadas
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Categorias personalizadas
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Sincronização bancária
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
              Escolher Premium
            </Button>
          </div>
          
          {/* Plano Empresarial */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Empresarial</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary-600">R$ 99</span>
              <span className="text-gray-600">/mês</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Tudo do Premium
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Múltiplos usuários
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                API personalizada
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Suporte prioritário
              </li>
            </ul>
            <Button variant="secondary" className="w-full">
              Falar com Vendas
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600">
            💳 Todos os planos incluem 14 dias de teste grátis • Cancele a qualquer momento
          </p>
        </div>
      </div>
    </section>
  );
};