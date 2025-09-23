import { apiClient, type ApiResponse } from './apiClient';

// Types baseados na sua API real
export interface Usuario {
  id: number;
  whatsapp: string;
  nome: string;
  ativo: boolean;
  observacoes?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateUsuarioData {
  telefone: string; // Será formatado automaticamente para WhatsApp
  nome: string;
  ativo?: boolean;
  observacoes?: string;
}

export interface UpdateUsuarioData {
  telefone?: string;
  nome?: string;
  ativo?: boolean;
  observacoes?: string;
}

export interface UsuarioStats {
  total: number;
  ativos: number;
  inativos: number;
  novosHoje: number;
}

/**
 * Serviço para gerenciar usuários do ChicoBot
 * Conecta com a API real do seu backend
 */
export class ChicoBotUserService {
  
  /**
   * Criar novo usuário
   * POST /api/usuarios
   */
  static async criarUsuario(userData: CreateUsuarioData): Promise<ApiResponse<Usuario>> {
    return apiClient.post<Usuario>('/usuarios', userData);
  }

  /**
   * Listar todos os usuários
   * GET /api/usuarios
   */
  static async listarUsuarios(): Promise<ApiResponse<Usuario[]>> {
    return apiClient.get<Usuario[]>('/usuarios');
  }

  /**
   * Buscar usuário por ID
   * GET /api/usuarios/{id}
   */
  static async buscarUsuario(id: number): Promise<ApiResponse<Usuario>> {
    return apiClient.get<Usuario>(`/usuarios/${id}`);
  }

  /**
   * Atualizar usuário
   * PATCH /api/usuarios/{id}
   */
  static async atualizarUsuario(id: number, userData: UpdateUsuarioData): Promise<ApiResponse<Usuario>> {
    return apiClient.patch<Usuario>(`/usuarios/${id}`, userData);
  }

  /**
   * Deletar usuário
   * DELETE /api/usuarios/{id}
   */
  static async deletarUsuario(id: number): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/usuarios/${id}`);
  }

  /**
   * Ativar usuário
   * PATCH /api/usuarios/{id}/ativar
   */
  static async ativarUsuario(id: number): Promise<ApiResponse<Usuario>> {
    return apiClient.patch<Usuario>(`/usuarios/${id}/ativar`);
  }

  /**
   * Desativar usuário
   * PATCH /api/usuarios/{id}/desativar
   */
  static async desativarUsuario(id: number): Promise<ApiResponse<Usuario>> {
    return apiClient.patch<Usuario>(`/usuarios/${id}/desativar`);
  }

  /**
   * Obter estatísticas dos usuários
   * GET /api/usuarios/stats
   */
  static async obterEstatisticas(): Promise<ApiResponse<UsuarioStats>> {
    return apiClient.get<UsuarioStats>('/usuarios/stats');
  }

  /**
   * Formatar número de telefone para WhatsApp
   * Utilitário para frontend
   */
  static formatarTelefoneWhatsApp(telefone: string): string {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = telefone.replace(/\D/g, '');
    
    // Se não começar com 55 (Brasil), adiciona
    if (!apenasNumeros.startsWith('55')) {
      return `55${apenasNumeros}@c.us`;
    }
    
    return `${apenasNumeros}@c.us`;
  }

  /**
   * Validar número de telefone brasileiro
   */
  static validarTelefone(telefone: string): boolean {
    const apenasNumeros = telefone.replace(/\D/g, '');
    
    // Valida se tem o formato correto (11 dígitos com DDD)
    // ou 13 dígitos com código do país (55)
    return apenasNumeros.length === 11 || 
           (apenasNumeros.length === 13 && apenasNumeros.startsWith('55'));
  }

  /**
   * Extrair número limpo do WhatsApp
   */
  static extrairTelefoneDoWhatsApp(whatsapp: string): string {
    return whatsapp.replace('@c.us', '').replace(/\D/g, '');
  }
}

// Export do serviço
export { ChicoBotUserService as default };