import { useState, useEffect } from 'react';
import { TransactionService, type Transaction, type CreateTransactionData } from '../services/financialService';
import { Button } from '../components/Button';

export const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Estado para nova transação
  const [newTransaction, setNewTransaction] = useState<CreateTransactionData>({
    type: 'expense',
    amount: 0,
    description: '',
    category: 'Alimentação',
    date: new Date().toISOString().split('T')[0]
  });

  // Carregar transações quando componente montar
  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // 🔥 Chamada para API - pegar últimas 10 transações
      const response = await TransactionService.getTransactions({ 
        limit: 10,
        page: 1 
      });
      
      setTransactions(response.data.transactions);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar transações');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 🔥 Chamada para API - criar nova transação
      const response = await TransactionService.createTransaction(newTransaction);
      
      // Adicionar nova transação na lista
      setTransactions([response.data, ...transactions]);
      
      // Resetar formulário
      setNewTransaction({
        type: 'expense',
        amount: 0,
        description: '',
        category: 'Alimentação',
        date: new Date().toISOString().split('T')[0]
      });
      
      setShowForm(false);
      
    } catch (err: any) {
      setError(err.message || 'Erro ao criar transação');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta transação?')) return;
    
    try {
      // 🔥 Chamada para API - deletar transação
      await TransactionService.deleteTransaction(id);
      
      // Remover da lista local
      setTransactions(transactions.filter(t => t.id !== id));
    } catch (err: any) {
      setError(err.message || 'Erro ao excluir transação');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard - ChicoBot</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nova Transação'}
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {/* Formulário de Nova Transação */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo
              </label>
              <select
                value={newTransaction.type}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  type: e.target.value as 'income' | 'expense'
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor
              </label>
              <input
                type="number"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.target.value) || 0
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="0,00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <input
                type="text"
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  description: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Ex: Almoço no restaurante"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({
                  ...newTransaction,
                  category: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Lazer">Lazer</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full">
                Salvar Transação
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de Transações */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Últimas Transações</h2>
          
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Carregando...</p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhuma transação encontrada
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`font-bold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};