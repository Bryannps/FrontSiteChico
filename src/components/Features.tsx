import React from 'react';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const Features: React.FC = () => {
  const features = [
    {
      icon: '📊',
      title: 'Controle de Despesas',
      description: 'Registre e categorize todas suas despesas automaticamente. Acompanhe onde seu dinheiro está sendo gasto.'
    },
    {
      icon: '�',
      title: 'Gestão de Receitas',
      description: 'Monitore todas suas fontes de renda. Salários, freelances, investimentos - tudo em um lugar só.'
    },
    {
      icon: '�',
      title: 'Relatórios Inteligentes',
      description: 'Gere relatórios detalhados para entender seus padrões financeiros.'
    },
    {
      icon: '�',
      title: 'Planilhas Automáticas',
      description: 'Exporte dados para Excel com formatação profissional e categorização automática.'
    },
   /* {
      icon: '🎯',
      title: 'Metas Financeiras',
      description: 'Defina objetivos de economia e acompanhe seu progresso com alertas e lembretes inteligentes.'
    },*/
    {
      icon: '💰',
      title: 'Controle de Ganhos',
      description: 'Registre e categorize todos os seus ganhos automaticamente.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Funcionalidades do ChicoBot
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para ter controle total das suas finanças pessoais
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};