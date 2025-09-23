import { useState, useEffect } from 'react';
import { 
  ChicoBotUserService, 
  type Usuario, 
  type CreateUsuarioData,
  type UsuarioStats
} from '../services/chicoBotService';
import { Button } from '../components/Button';

// Hook customizado para gerenciar usuários do ChicoBot
const useChicoBotUsers = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [stats, setStats] = useState<UsuarioStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarUsuarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ChicoBotUserService.listarUsuarios();
      setUsuarios(response.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  };

  const carregarEstatisticas = async () => {
    try {
      const response = await ChicoBotUserService.obterEstatisticas();
      setStats(response.data);
    } catch (err: any) {
      console.warn('Erro ao carregar estatísticas:', err);
    }
  };

  const criarUsuario = async (dadosUsuario: CreateUsuarioData) => {
    setError(null);
    try {
      await ChicoBotUserService.criarUsuario(dadosUsuario);
      await carregarUsuarios(); // Recarregar lista
    } catch (err: any) {
      setError(err.message || 'Erro ao criar usuário');
      throw err;
    }
  };

  const atualizarUsuario = async (id: number, dadosUsuario: CreateUsuarioData) => {
    setError(null);
    try {
      await ChicoBotUserService.atualizarUsuario(id, dadosUsuario);
      await carregarUsuarios(); // Recarregar lista
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar usuário');
      throw err;
    }
  };

  const alternarStatusUsuario = async (id: number, ativo: boolean) => {
    setError(null);
    try {
      await ChicoBotUserService.atualizarUsuario(id, { ativo });
      await carregarUsuarios(); // Recarregar lista
    } catch (err: any) {
      setError(err.message || 'Erro ao alterar status do usuário');
      throw err;
    }
  };

  const deletarUsuario = async (id: number) => {
    setError(null);
    try {
      await ChicoBotUserService.deletarUsuario(id);
      await carregarUsuarios(); // Recarregar lista
    } catch (err: any) {
      setError(err.message || 'Erro ao deletar usuário');
      throw err;
    }
  };

  return {
    usuarios,
    stats,
    loading,
    error,
    carregarUsuarios,
    carregarEstatisticas,
    criarUsuario,
    atualizarUsuario,
    alternarStatusUsuario,
    deletarUsuario,
    setError
  };
};

export const ChicoBotDashboard: React.FC = () => {
  const {
    usuarios,
    stats,
    loading,
    error,
    carregarUsuarios,
    carregarEstatisticas,
    criarUsuario,
    atualizarUsuario,
    alternarStatusUsuario,
    deletarUsuario,
    setError
  } = useChicoBotUsers();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<Usuario | null>(null);
  const [formData, setFormData] = useState<CreateUsuarioData>({
    telefone: '',
    nome: '',
    ativo: true,
    observacoes: ''
  });

  // Carregar dados quando componente montar
  useEffect(() => {
    carregarUsuarios();
    carregarEstatisticas();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar telefone
    if (!ChicoBotUserService.validarTelefone(formData.telefone)) {
      setError('Telefone inválido. Use formato: (62) 99999-9999 ou 62999999999');
      return;
    }

    try {
      if (editingUser) {
        // Atualizar usuário existente
        await atualizarUsuario(editingUser.id, formData);
      } else {
        // Criar novo usuário
        await criarUsuario(formData);
      }
      
      // Resetar formulário
      resetForm();
      carregarEstatisticas(); // Atualizar stats
      
    } catch (err) {
      // Erro já tratado no hook
    }
  };

  const resetForm = () => {
    setFormData({
      telefone: '',
      nome: '',
      ativo: true,
      observacoes: ''
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setFormData({
      telefone: ChicoBotUserService.extrairTelefoneDoWhatsApp(usuario.whatsapp),
      nome: usuario.nome,
      ativo: usuario.ativo,
      observacoes: usuario.observacoes || ''
    });
    setShowForm(true);
  };

  const handleToggleStatus = async (usuario: Usuario) => {
    try {
      await alternarStatusUsuario(usuario.id, !usuario.ativo);
      carregarEstatisticas();
    } catch (err) {
      // Erro já tratado no hook
    }
  };

  const handleDelete = async (usuario: Usuario) => {
    if (!confirm(`Tem certeza que deseja excluir ${usuario.nome}?`)) return;
    
    try {
      await deletarUsuario(usuario.id);
      carregarEstatisticas();
    } catch (err) {
      // Erro já tratado no hook
    }
  };

  const formatarTelefone = (whatsapp: string) => {
    const numero = ChicoBotUserService.extrairTelefoneDoWhatsApp(whatsapp);
    if (numero.length === 13) {
      // Formato: +55 (62) 99999-9999
      return `+${numero.slice(0, 2)} (${numero.slice(2, 4)}) ${numero.slice(4, 9)}-${numero.slice(9)}`;
    }
    return numero;
  };

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">🤖 ChicoBot - Usuários</h1>
          <p className="text-gray-600">Gerencie os usuários do seu bot do WhatsApp</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : '+ Novo Usuário'}
        </Button>
      </div>

      {/* Estatísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Total de Usuários</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Ativos</h3>
            <p className="text-3xl font-bold text-green-600">{stats.ativos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Inativos</h3>
            <p className="text-3xl font-bold text-red-600">{stats.inativos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-sm font-medium text-gray-500">Novos Hoje</h3>
            <p className="text-3xl font-bold text-purple-600">{stats.novosHoje}</p>
          </div>
        </div>
      )}

      {/* Mensagens de erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Formulário */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone (WhatsApp)
              </label>
              <input
                type="text"
                value={formData.telefone}
                onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="62999999999 ou (62) 99999-9999"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Será formatado automaticamente para: {ChicoBotUserService.formatarTelefoneWhatsApp(formData.telefone)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Nome do usuário"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={(formData.ativo ?? true).toString()}
                onChange={(e) => setFormData({ ...formData, ativo: e.target.value === 'true' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observações
              </label>
              <input
                type="text"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Observações opcionais"
              />
            </div>

            <div className="md:col-span-2 flex gap-4">
              <Button type="submit" className="flex-1">
                {editingUser ? 'Atualizar' : 'Criar'} Usuário
              </Button>
              <Button variant="secondary" onClick={resetForm} className="flex-1">
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Usuários */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Usuários Cadastrados</h2>
            <Button variant="secondary" onClick={carregarUsuarios} disabled={loading}>
              {loading ? 'Atualizando...' : '🔄 Atualizar'}
            </Button>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Carregando usuários...</p>
            </div>
          ) : usuarios.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum usuário cadastrado
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4">Nome</th>
                    <th className="text-left py-3 px-4">WhatsApp</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Observações</th>
                    <th className="text-left py-3 px-4">Criado em</th>
                    <th className="text-center py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{usuario.nome}</td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatarTelefone(usuario.whatsapp)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          usuario.ativo 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {usuario.ativo ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {usuario.observacoes || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatarData(usuario.criadoEm)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(usuario)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleToggleStatus(usuario)}
                            className={`text-sm ${
                              usuario.ativo 
                                ? 'text-red-600 hover:text-red-800' 
                                : 'text-green-600 hover:text-green-800'
                            }`}
                          >
                            {usuario.ativo ? 'Desativar' : 'Ativar'}
                          </button>
                          <button
                            onClick={() => handleDelete(usuario)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};