import React from 'react';
import { Button } from './Button';

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-primary-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Controle Suas
            <span className="text-primary-600"> Finanças</span> com Facilidade
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            O ChicoBot é o assistente financeiro mais inteligente do Brasil. 
            Registre despesas, acompanhe ganhos, gere relatórios automáticos 
            e tenha controle total da sua vida financeira.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-xl">
              Começar Grátis
            </Button>
            <Button variant="secondary" size="lg">
              Ver Como Funciona
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">100%</div>
              <div className="text-gray-600">Automático</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">24/7</div>
              <div className="text-gray-600">Sincronização</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success-600">1000+</div>
              <div className="text-gray-600">Usuários ativos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};