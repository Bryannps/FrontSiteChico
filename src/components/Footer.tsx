import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">FinanceBot Pro</h3>
            <p className="text-gray-400">
              O bot financeiro mais avançado para automatizar seus investimentos
              e maximizar seus resultados.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produto</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-white">Recursos</a></li>
              <li><a href="#pricing" className="hover:text-white">Preços</a></li>
              <li><a href="#" className="hover:text-white">Demo</a></li>
              <li><a href="#" className="hover:text-white">Documentação</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
              <li><a href="#contact" className="hover:text-white">Contato</a></li>
              <li><a href="#" className="hover:text-white">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white">Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FinanceBot Pro. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            ⚠️ Investimentos envolvem riscos. Rentabilidade passada não garante resultados futuros.
          </p>
        </div>
      </div>
    </footer>
  );
};