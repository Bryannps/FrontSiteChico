import { useState } from 'react';
import { ChicoBotUserService } from '../services/chicoBotService';
import { Button } from '../components/Button';

export const ApiTester: React.FC = () => {
  const [resultado, setResultado] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testarConexao = async () => {
    setLoading(true);
    setResultado('Testando conexão...');

    try {
      // Testar GET /api/usuarios
      const response = await ChicoBotUserService.listarUsuarios();
      setResultado(`✅ Conexão OK! ${response.data.length} usuários encontrados:\n\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setResultado(`❌ Erro de conexão:\n${error.message}\n\nVerifique se sua API está rodando em http://localhost:3000`);
    } finally {
      setLoading(false);
    }
  };

  const testarCriarUsuario = async () => {
    setLoading(true);
    setResultado('Criando usuário de teste...');

    try {
      const usuarioTeste = {
        telefone: '62999887766',
        nome: 'Usuário Teste Frontend',
        ativo: true,
        observacoes: 'Criado via frontend'
      };

      const response = await ChicoBotUserService.criarUsuario(usuarioTeste);
      setResultado(`✅ Usuário criado com sucesso!\n\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setResultado(`❌ Erro ao criar usuário:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testarEstatisticas = async () => {
    setLoading(true);
    setResultado('Buscando estatísticas...');

    try {
      const response = await ChicoBotUserService.obterEstatisticas();
      setResultado(`✅ Estatísticas obtidas:\n\n${JSON.stringify(response.data, null, 2)}`);
    } catch (error: any) {
      setResultado(`❌ Erro ao obter estatísticas:\n${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        🧪 Testador da API ChicoBot
      </h1>

      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Antes de testar:</h3>
        <ol className="list-decimal list-inside text-yellow-700 space-y-1">
          <li>Certifique-se de que sua API está rodando em <code>http://localhost:3000</code></li>
          <li>Configure o CORS para aceitar requisições do frontend</li>
          <li>Verifique se os endpoints estão funcionando</li>
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button 
          onClick={testarConexao} 
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Testando...' : '🔗 Testar Conexão'}
        </Button>

        <Button 
          onClick={testarCriarUsuario} 
          disabled={loading}
          variant="secondary"
          className="w-full"
        >
          {loading ? 'Criando...' : '➕ Criar Usuário Teste'}
        </Button>

        <Button 
          onClick={testarEstatisticas} 
          disabled={loading}
          variant="secondary"
          className="w-full"
        >
          {loading ? 'Buscando...' : '📊 Testar Stats'}
        </Button>
      </div>

      {resultado && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap">
          {resultado}
        </div>
      )}

      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">📋 Como configurar CORS no seu backend:</h3>
        <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// No seu servidor Express.js
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5174', // URL do frontend
  credentials: true
}));

// Ou para permitir todas as origens (desenvolvimento):
app.use(cors());`}
        </pre>
      </div>

      <div className="mt-6 bg-blue-50 p-6 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-4">🚀 Endpoints da sua API:</h3>
        <ul className="space-y-2 text-blue-800">
          <li><code>GET /api/usuarios</code> - Listar usuários</li>
          <li><code>POST /api/usuarios</code> - Criar usuário</li>
          <li><code>GET /api/usuarios/stats</code> - Estatísticas</li>
          <li><code>PATCH /api/usuarios/:id</code> - Atualizar usuário</li>
          <li><code>DELETE /api/usuarios/:id</code> - Deletar usuário</li>
        </ul>
      </div>
    </div>
  );
};