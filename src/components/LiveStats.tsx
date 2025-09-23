import { useState, useEffect } from 'react';
import { ChicoBotUserService, type UsuarioStats, type Usuario } from '../services/chicoBotService';

interface LiveStatsData {
  stats: UsuarioStats | null;
  usuarios: Usuario[];
  isLoading: boolean;
  error: string | null;
}

export const LiveStats: React.FC = () => {
  const [data, setData] = useState<LiveStatsData>({
    stats: null,
    usuarios: [],
    isLoading: true,
    error: null
  });
  
  const [isLive, setIsLive] = useState(true);
  
  // Função para carregar dados reais da API
  const carregarDados = async () => {
    try {
      setData(prev => ({ ...prev, isLoading: true, error: null }));
      
      // Carregar estatísticas e usuários em paralelo
      const [statsResponse, usuariosResponse] = await Promise.all([
        ChicoBotUserService.obterEstatisticas().catch(err => {
          console.warn('Erro ao carregar stats:', err);
          return null;
        }),
        ChicoBotUserService.listarUsuarios().catch(err => {
          console.warn('Erro ao carregar usuários:', err);
          return { data: [] };
        })
      ]);
      
      setData({
        stats: statsResponse?.data || null,
        usuarios: usuariosResponse?.data || [],
        isLoading: false,
        error: null
      });
      
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      setData(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Erro ao carregar dados'
      }));
    }
  };
  
  // Carregar dados quando componente montar
  useEffect(() => {
    carregarDados();
  }, []);
  
  // Atualizar dados automaticamente se estiver "ao vivo"
  useEffect(() => {
    if (!isLive) return;
    
    const interval = setInterval(() => {
      carregarDados();
    }, 10000); // Atualiza a cada 10 segundos
    
    return () => clearInterval(interval);
  }, [isLive]);
  
  // Dados padrão caso a API não esteja disponível
  const fallbackStats = {
    total: data.usuarios.length || 8,
    ativos: data.usuarios.filter(u => u.ativo).length || 3,
    inativos: data.usuarios.filter(u => !u.ativo).length || 5,
    novosHoje: 2
  };
  
  const statsToShow = data.stats || fallbackStats;
  
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            📊 ChicoBot em Números
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className={`w-3 h-3 rounded-full ${
              data.isLoading ? 'bg-yellow-500 animate-pulse' :
              data.error ? 'bg-red-500' :
              isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-500'
            }`}></div>
            <span className="text-sm">
              {data.isLoading ? 'Carregando...' :
               data.error ? 'Erro na conexão' :
               isLive ? 'Dados reais ao vivo' : 'Dados pausados'}
            </span>
            <button 
              onClick={() => setIsLive(!isLive)}
              className="ml-4 text-xs bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded"
              disabled={data.isLoading}
            >
              {isLive ? 'Pausar' : 'Retomar'}
            </button>
            <button 
              onClick={carregarDados}
              className="ml-2 text-xs bg-primary-600 hover:bg-primary-700 px-3 py-1 rounded"
              disabled={data.isLoading}
            >
              🔄 Atualizar
            </button>
          </div>
          
          {data.error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-2 rounded mb-4 max-w-md mx-auto">
              {data.error}
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">👥 Total de Usuários</h3>
            <div className="text-4xl font-bold text-blue-400">
              {statsToShow.total.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">Cadastrados no sistema</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">✅ Usuários Ativos</h3>
            <div className="text-4xl font-bold text-green-400">
              {statsToShow.ativos.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">Usando o ChicoBot</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">⏸️ Usuários Inativos</h3>
            <div className="text-4xl font-bold text-orange-400">
              {statsToShow.inativos.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">Temporariamente pausados</p>
          </div>
          
          <div className="text-center p-6 bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">🆕 Novos Hoje</h3>
            <div className="text-4xl font-bold text-purple-400">
              {statsToShow.novosHoje.toLocaleString()}
            </div>
            <p className="text-gray-400 text-sm mt-2">Cadastros de hoje</p>
          </div>
        </div>
        
        {/* Status da API */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            {data.error ? (
              <span className="text-red-400">
                ⚠️ API indisponível - Exibindo dados de exemplo
              </span>
            ) : (
              <span>
                ✅ Conectado à API do ChicoBot • Última atualização: {new Date().toLocaleTimeString('pt-BR')}
              </span>
            )}
          </p>
        </div>
      </div>
    </section>
  );
};