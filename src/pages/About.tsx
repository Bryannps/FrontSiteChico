export const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Sobre o FinanceBot Pro</h1>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-600 mb-6">
          O FinanceBot Pro nasceu da necessidade de democratizar o acesso a estratégias 
          de investimento sofisticadas, anteriormente disponíveis apenas para grandes 
          instituições financeiras.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Nossa História</h2>
        <p className="text-gray-600 mb-6">
          Fundado em 2023 por uma equipe de desenvolvedores e traders experientes, 
          nosso objetivo é simples: criar a ferramenta de trading automatizado mais 
          avançada e acessível do Brasil.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Tecnologia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🤖 Inteligência Artificial</h3>
            <p className="text-gray-600">
              Algoritmos de machine learning treinados com milhões de dados históricos 
              de mercado para identificar padrões e oportunidades.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">⚡ Velocidade</h3>
            <p className="text-gray-600">
              Execução de ordens em milissegundos, garantindo que você nunca perca 
              uma oportunidade por lentidão no sistema.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">🛡️ Segurança</h3>
            <p className="text-gray-600">
              Criptografia de ponta a ponta e integração segura com as principais 
              exchanges sem nunca armazenar suas chaves privadas.
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">📊 Análise</h3>
            <p className="text-gray-600">
              Mais de 50 indicadores técnicos e fundamentalistas combinados para 
              tomar as melhores decisões de investimento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};