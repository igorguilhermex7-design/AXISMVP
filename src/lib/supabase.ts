// Mock Supabase Client with full LocalStorage persistence & Rich Demo Seed Data for Client MVP
export interface MockUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    condo?: string;
    unit?: string;
  };
}

export interface MockSession {
  user: MockUser;
  access_token: string;
  token_type: string;
  expires_in: number;
}

const STORAGE_KEY_AUTH = 'axis_condo_auth_session';
const STORAGE_KEY_DB = 'axis_condo_database_v4';

// Realistic Brazilian Condominiums seed data with corporate Axis Condo Operations
export const INITIAL_DEMO_DATA = {
  profiles: [
    {
      id: 'demo-user-morador',
      name: 'Lucas Santos',
      email: 'morador@axiscondo.com.br',
      phone: '(11) 98765-4321',
      condo: 'Edifício Solar das Flores',
      unit: 'Apto 402 - Bloco B',
      address: 'Edifício Solar das Flores, Apto 402 - Bloco B (Pinheiros)',
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
      created_at: '2026-01-15T10:00:00Z',
      status: 'Ativo'
    },
    {
      id: 'demo-user-admin',
      name: 'Equipe Axis Condo Operações',
      email: 'admin@axiscondo.com.br',
      phone: '(11) 3003-8822',
      condo: 'Central Corporativa Axis Condo',
      unit: 'Central de Operações',
      address: 'Sede Axis Condo Hub - Av. Paulista, 1800 - 14º andar',
      role: 'admin',
      avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      created_at: '2025-11-01T08:00:00Z',
      status: 'Ativo'
    },
    {
      id: 'demo-user-beatriz',
      name: 'Beatriz Lima',
      email: 'beatriz.lima@gmail.com',
      phone: '(11) 99812-3456',
      condo: 'Residencial Grand Park',
      unit: 'Apto 101 - Torre Sul',
      address: 'Residencial Grand Park, Apto 101 - Torre Sul (Moema)',
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      created_at: '2026-02-10T14:20:00Z',
      status: 'Ativo'
    },
    {
      id: 'demo-user-rodrigo',
      name: 'Rodrigo Mendes',
      email: 'rodrigo.mendes@outlook.com',
      phone: '(11) 97723-4567',
      condo: 'Condomínio Jardins do Bosque',
      unit: 'Casa 14',
      address: 'Condomínio Jardins do Bosque, Casa 14 (Granja Viana)',
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      created_at: '2026-03-05T09:15:00Z',
      status: 'Ativo'
    },
    {
      id: 'demo-user-camila',
      name: 'Camila Oliveira',
      email: 'camila.oliveira@empresa.com.br',
      phone: '(11) 98834-5678',
      condo: 'Edifício Solar das Flores',
      unit: 'Apto 302 - Bloco B',
      address: 'Edifício Solar das Flores, Apto 302 - Bloco B (Pinheiros)',
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
      created_at: '2026-04-12T11:45:00Z',
      status: 'Ativo'
    },
    {
      id: 'demo-user-fernando',
      name: 'Fernando Rocha',
      email: 'fernando.rocha@uol.com.br',
      phone: '(11) 96645-6789',
      condo: 'Torres de Versailles',
      unit: 'Apto 804 - Bloco C',
      address: 'Torres de Versailles, Apto 804 - Bloco C (Vila Mariana)',
      role: 'user',
      avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      created_at: '2026-05-20T16:00:00Z',
      status: 'Ativo'
    }
  ],
  partnerships: [
    {
      id: 'part-1',
      name: 'Carrefour Express',
      category: 'Mercado',
      discount: '10% OFF',
      rating: '4.8',
      distance: '300m',
      address: 'Av. Paulista, 1200',
      phone: '(11) 3145-8000',
      coupon_title: '10% de desconto em hortifrúti fresco e padaria artesanal',
      coupon: 'AXISCARREFOUR',
      image_url: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500',
      rules: 'Válido para compras acima de R$ 50 apresentando o QR Code no caixa.',
      created_at: '2026-01-10T10:00:00Z'
    },
    {
      id: 'part-2',
      name: 'Drogasil',
      category: 'Farmácia',
      discount: '25% OFF',
      rating: '4.9',
      distance: '150m',
      address: 'Rua Bela Cintra, 850',
      phone: '(11) 3256-4000',
      coupon_title: 'Até 25% de desconto em medicamentos e 15% em dermocosméticos',
      coupon: 'AXISDROGASIL',
      image_url: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?w=500',
      rules: 'Apresentar documento de morador ou carteirinha digital Axis Condo no caixa.',
      created_at: '2026-01-12T11:00:00Z'
    },
    {
      id: 'part-3',
      name: 'Petz Jardins',
      category: 'Pet',
      discount: '15% OFF',
      rating: '4.7',
      distance: '600m',
      address: 'Al. Santos, 450',
      phone: '(11) 3500-7389',
      coupon_title: '15% OFF em rações premium, medicamentos e serviços de banho & tosa',
      coupon: 'AXISPETZ',
      image_url: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500',
      rules: 'Agendamento prévio necessário para banho e tosa via WhatsApp ou app.',
      created_at: '2026-01-15T14:00:00Z'
    },
    {
      id: 'part-4',
      name: 'Smart Fit',
      category: 'Academia',
      discount: '20% OFF',
      rating: '4.6',
      distance: '400m',
      address: 'Rua Augusta, 1500',
      phone: '(11) 3058-2000',
      coupon_title: 'Isenção de taxa de matrícula + 20% no plano Black',
      coupon: 'AXISSMART',
      image_url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500',
      rules: 'Válido na adesão online ou balcão mediante código promocional Axis Condo.',
      created_at: '2026-02-01T09:00:00Z'
    },
    {
      id: 'part-5',
      name: 'Pizzaria Forno Nobre',
      category: 'Restaurante',
      discount: '15% OFF',
      rating: '4.9',
      distance: '500m',
      address: 'Rua Haddock Lobo, 920',
      phone: '(11) 3081-1200',
      coupon_title: '15% OFF em pizzas especiais + taxa de entrega grátis no condomínio',
      coupon: 'AXISFORNO',
      image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500',
      rules: 'De terça a domingo, para pedidos no salão ou delivery direto.',
      created_at: '2026-02-15T18:00:00Z'
    },
    {
      id: 'part-6',
      name: 'Bella Vita Hair & Estética',
      category: 'Salão',
      discount: '20% OFF',
      rating: '4.8',
      distance: '250m',
      address: 'Rua Oscar Freire, 300',
      phone: '(11) 3062-8500',
      coupon_title: '20% de desconto em corte, escova, manicure e spa facial',
      coupon: 'AXISBELLA',
      image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500',
      rules: 'De terça a quinta-feira com agendamento.',
      created_at: '2026-03-01T15:00:00Z'
    }
  ],
  services: [
    {
      id: 'srv-1',
      title: 'Encanador Hidráulico',
      category: 'Hidráulica',
      price: 'R$ 90,00',
      icon_name: 'Wrench',
      description: 'Conserto de vazamentos, torneiras, registros, caixas acopladas e desobstrução de canos.',
      features: ['Tabela tabelada Axis Condo (economia média de 40%)', 'Técnicos homologados com seguro civil', 'Garantia de 90 dias com laudo'],
      created_at: '2026-01-05T08:00:00Z'
    },
    {
      id: 'srv-2',
      title: 'Eletricista Residencial',
      category: 'Elétrica',
      price: 'R$ 110,00',
      icon_name: 'Zap',
      description: 'Troca de tomadas, disjuntores, chuveiros, reparo de fiação e instalação de iluminação LED.',
      features: ['Certificação técnica NR10', 'Ferramentas de teste calibradas', 'Garantia de 90 dias'],
      created_at: '2026-01-05T08:30:00Z'
    },
    {
      id: 'srv-3',
      title: 'Chaveiro 24 Horas',
      category: 'Chaveiro',
      price: 'R$ 80,00',
      icon_name: 'Key',
      description: 'Abertura emergencial residencial, cópia de chaves tetra e codificação de tags eletrônicas.',
      features: ['Despacho emergencial em até 30min', 'Tags e fechaduras originais', 'Preço fechado sem surpresas'],
      created_at: '2026-01-05T09:00:00Z'
    },
    {
      id: 'srv-4',
      title: 'Reparos e Pintura',
      category: 'Pintura',
      price: 'R$ 150,00',
      icon_name: 'Brush',
      description: 'Pintura interna, massa corrida, vedação de janelas e reparo de rachaduras superficiais.',
      features: ['Proteção total de móveis e piso', 'Tintas acrílicas sem odor', 'Limpeza completa pós-serviço'],
      created_at: '2026-01-05T09:30:00Z'
    },
    {
      id: 'srv-5',
      title: 'Marcenaria e Montagem',
      category: 'Montagem',
      price: 'R$ 120,00',
      icon_name: 'Hammer',
      description: 'Montagem de móveis planejados ou comprados online, fixação de painéis e ajuste de portas.',
      features: ['Fixação estrutural segura', 'Nivelamento a laser', 'Montadores experientes'],
      created_at: '2026-01-05T10:00:00Z'
    },
    {
      id: 'srv-6',
      title: 'Limpeza e Higienização',
      category: 'Limpeza',
      price: 'R$ 160,00',
      icon_name: 'Scissors',
      description: 'Higienização a seco de sofás, colchões, tapetes e limpeza profunda de estofados.',
      features: ['Elimina 99.9% de ácaros e bactérias', 'Produtos neutros antialérgicos', 'Secagem rápida'],
      created_at: '2026-01-05T10:30:00Z'
    }
  ],
  service_requests: [
    {
      id: 'req-1',
      user_id: 'demo-user-morador',
      service_id: 'srv-1',
      contact_number: '(11) 98765-4321',
      condo_name: 'Edifício Solar das Flores',
      unit_label: 'Apto 402 - Bloco B',
      problem_description: 'Vazamento no registro do chuveiro do banheiro da suíte com pressão oscilante.',
      preferred_date: '2026-10-22',
      preferred_time: 'afternoon',
      status: 'pending',
      created_at: '2026-10-21T09:30:00Z'
    },
    {
      id: 'req-2',
      user_id: 'demo-user-rodrigo',
      service_id: 'srv-2',
      contact_number: '(11) 97723-4567',
      condo_name: 'Condomínio Jardins do Bosque',
      unit_label: 'Casa 14',
      problem_description: 'Instalação de circuito dedicado para ar-condicionado na sala e conferência de disjuntor.',
      preferred_date: '2026-10-20',
      preferred_time: 'morning',
      status: 'completed',
      created_at: '2026-10-18T14:15:00Z'
    },
    {
      id: 'req-3',
      user_id: 'demo-user-beatriz',
      service_id: 'srv-3',
      contact_number: '(11) 99812-3456',
      condo_name: 'Residencial Grand Park',
      unit_label: 'Apto 101 - Torre Sul',
      problem_description: 'Troca de miolo de fechadura e configuração de 3 tags eletrônicas de acesso.',
      preferred_date: '2026-10-19',
      preferred_time: 'afternoon',
      status: 'completed',
      created_at: '2026-10-17T16:00:00Z'
    },
    {
      id: 'req-4',
      user_id: 'demo-user-camila',
      service_id: 'srv-4',
      contact_number: '(11) 98834-5678',
      condo_name: 'Edifício Solar das Flores',
      unit_label: 'Apto 302 - Bloco B',
      problem_description: 'Reparo de infiltração seca na parede do hall privativo e pintura acrílica branca.',
      preferred_date: '2026-10-23',
      preferred_time: 'morning',
      status: 'pending',
      created_at: '2026-10-21T11:20:00Z'
    },
    {
      id: 'req-5',
      user_id: 'demo-user-fernando',
      service_id: 'srv-1',
      contact_number: '(11) 96645-6789',
      condo_name: 'Torres de Versailles',
      unit_label: 'Apto 804 - Bloco C',
      problem_description: 'Troca de válvula de descarga Hydra e desobstrução de ralo na área de serviço.',
      preferred_date: '2026-10-15',
      preferred_time: 'afternoon',
      status: 'completed',
      created_at: '2026-10-14T10:00:00Z'
    }
  ]
};

// Database storage helper
function getStoredDatabase(): typeof INITIAL_DEMO_DATA {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DB);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(INITIAL_DEMO_DATA));
      return INITIAL_DEMO_DATA;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_DATA;
  }
}

function saveDatabase(data: typeof INITIAL_DEMO_DATA) {
  try {
    localStorage.setItem(STORAGE_KEY_DB, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving mock database', e);
  }
}

// Global Auth subscribers
type AuthListener = (event: string, session: MockSession | null) => void;
const authListeners: Set<AuthListener> = new Set();

function notifyAuth(event: string, session: MockSession | null) {
  authListeners.forEach(listener => {
    try {
      listener(event, session);
    } catch (e) {
      console.error('Auth listener error', e);
    }
  });
}

function getStoredSession(): MockSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTH);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function setStoredSession(session: MockSession | null) {
  try {
    if (session) {
      localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY_AUTH);
    }
    notifyAuth(session ? 'SIGNED_IN' : 'SIGNED_OUT', session);
  } catch (e) {
    console.error('Error saving session', e);
  }
}

class QueryBuilder {
  private table: string;
  private filters: Array<(item: any) => boolean> = [];
  private sortField: string | null = null;
  private sortAsc = true;
  private limitCount: number | null = null;
  private isHeadCount = false;
  private isSingle = false;

  private isDelete = false;
  private updatePatch: any = null;

  constructor(table: string) {
    this.table = table;
  }

  select(_columns = '*', options?: { count?: string; head?: boolean }) {
    if (options?.head || options?.count) {
      this.isHeadCount = true;
    }
    return this;
  }

  eq(column: string, value: any) {
    this.filters.push(item => item[column] === value);
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.sortField = column;
    this.sortAsc = options?.ascending !== false;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  async insert(records: any | any[]) {
    const db = getStoredDatabase();
    const tableData: any[] = (db as any)[this.table] || [];
    const items = Array.isArray(records) ? records : [records];
    const newItems = items.map(item => ({
      ...item,
      id: item.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: item.created_at || new Date().toISOString()
    }));

    (db as any)[this.table] = [...newItems, ...tableData];
    saveDatabase(db);
    return { data: newItems, error: null };
  }

  async upsert(record: any) {
    const db = getStoredDatabase();
    const tableData: any[] = (db as any)[this.table] || [];
    const index = tableData.findIndex(item => item.id === record.id);
    if (index >= 0) {
      tableData[index] = { ...tableData[index], ...record };
    } else {
      tableData.unshift({
        ...record,
        id: record.id || `custom-${Date.now()}`,
        created_at: new Date().toISOString()
      });
    }
    (db as any)[this.table] = tableData;
    saveDatabase(db);
    return { data: record, error: null };
  }

  update(patch: any) {
    this.updatePatch = patch;
    return this;
  }

  delete() {
    this.isDelete = true;
    return this;
  }

  private execute() {
    const db = getStoredDatabase();
    const tableData: any[] = (db as any)[this.table] || [];

    if (this.updatePatch) {
      const updated = tableData.map(item => {
        const match = this.filters.every(filter => filter(item));
        return match ? { ...item, ...this.updatePatch } : item;
      });
      (db as any)[this.table] = updated;
      saveDatabase(db);
      return { data: this.updatePatch, error: null };
    }

    if (this.isDelete) {
      const remaining = tableData.filter(item => !this.filters.every(filter => filter(item)));
      (db as any)[this.table] = remaining;
      saveDatabase(db);
      return { data: null, error: null };
    }

    let records: any[] = [...tableData];

    // Joins for service_requests
    if (this.table === 'service_requests') {
      records = records.map(req => {
        const profile = db.profiles.find(p => p.id === req.user_id) || {
          name: 'Lucas Santos',
          email: 'morador@axiscondo.com.br',
          address: 'Edifício Solar das Flores, Apto 402 - Bloco B',
          condo: 'Edifício Solar das Flores',
          unit: 'Apto 402 - Bloco B'
        };
        const service = db.services.find(s => s.id === req.service_id) || {
          title: 'Serviço Geral Axis Condo',
          price: 'R$ 90,00'
        };
        return {
          ...req,
          profiles: profile,
          services: service,
          condo_name: req.condo_name || (profile as any).condo || 'Edifício Solar das Flores',
          unit_label: req.unit_label || (profile as any).unit || 'Apto 402'
        };
      });
    }

    // Apply filters
    for (const filter of this.filters) {
      records = records.filter(filter);
    }

    // Apply ordering
    if (this.sortField) {
      const field = this.sortField;
      records.sort((a, b) => {
        const valA = a[field] ?? '';
        const valB = b[field] ?? '';
        if (valA < valB) return this.sortAsc ? -1 : 1;
        if (valA > valB) return this.sortAsc ? 1 : -1;
        return 0;
      });
    }

    const count = records.length;

    if (this.isHeadCount) {
      return { count, data: null, error: null };
    }

    if (this.limitCount) {
      records = records.slice(0, this.limitCount);
    }

    if (this.isSingle) {
      return { data: records[0] || null, error: null };
    }

    return { data: records, count, error: null };
  }

  then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any) {
    return Promise.resolve(this.execute()).then(onfulfilled, onrejected);
  }
}

export const supabase = {
  auth: {
    async getSession(): Promise<{ data: { session: MockSession | null }; error: null }> {
      return { data: { session: getStoredSession() }, error: null };
    },

    async signInWithPassword({ email }: { email: string; password?: string }) {
      const lower = email.trim().toLowerCase();
      const isAdmin = lower.includes('admin') || lower.includes('operacoes') || lower.includes('empresa') || lower === 'carlos@axiscondo.com.br' || lower === 'carlos@axia.com.br';

      const user: MockUser = isAdmin
        ? {
            id: 'demo-user-admin',
            email: lower || 'admin@axiscondo.com.br',
            role: 'admin',
            user_metadata: {
              name: 'Central Axis Condo Operações',
              avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
              condo: 'Central Corporativa Axis Condo',
              unit: 'Central de Despacho'
            }
          }
        : {
            id: 'demo-user-morador',
            email: lower || 'morador@axiscondo.com.br',
            role: 'user',
            user_metadata: {
              name: 'Lucas Santos',
              avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
              condo: 'Edifício Solar das Flores',
              unit: 'Apto 402 - Bloco B'
            }
          };

      const session: MockSession = {
        user,
        access_token: `mock-token-${Date.now()}`,
        token_type: 'bearer',
        expires_in: 86400 * 30
      };

      setStoredSession(session);
      return { data: { user, session }, error: null };
    },

    async signOut() {
      setStoredSession(null);
      return { error: null };
    },

    onAuthStateChange(callback: AuthListener) {
      authListeners.add(callback);
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              authListeners.delete(callback);
            }
          }
        }
      };
    }
  },

  from(table: string) {
    return new QueryBuilder(table);
  }
};

export function resetDemoData() {
  localStorage.removeItem(STORAGE_KEY_DB);
  localStorage.removeItem(STORAGE_KEY_AUTH);
  window.location.reload();
}
