// tests/api.test.js
const request = require('supertest'); // Importa o Supertest
const app = require('../app'); // Importa nosso app Express configurado
const Receita = require('../models/receitaModel') // Importamos o Model para mockar

// Descreve o conjunto de testes para a API
describe('API Health Check', () => {

    // O 'it' define um caso de teste específico
    it('Deve retornar status 200 e uma mensagem de "ok" na rota GET /api/health-check', async () => {
        // 'request(app)' usa o Supertest
        const response = await request(app)
            .get('/api/health-check')
            .expect(200); // Asserção 1: Espera que o status HTTP seja 200

        // Asserção 2: Espera que o corpo da resposta seja { status: 'ok' }
        expect(response.body).toEqual({ status: 'ok' });
    });

});

// 1. O Mock Mágico (igual ao anterior)
jest.mock('../models/receitaModel');

// ... Mantenha o describe('API Health Check') ...

// --- Nova Suíte de Testes de Integração para Produtos ---
describe('API de Receitas (com Mocks)', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('GET /api/receitas - Deve Retornar a lista de receitas do Model', async => {

        // --- 1. Arrange ---
        const mockReceitas = [
            { id: 1, nome: 'Produto da Rota 1', custo: 8.35 }
        ];

        // Dizemos ao Model o que retornar
        Receita.findAll.mockResolvedValue(mockReceitas);

         // --- 2. Act & Assert (O Supertest faz os dois) ---
          const response = request(app)
            .get('/api/produtos')
            .expect(200); // Verifica o status code

        // Verificamos se o corpo da resposta é o que o mock retornou
        expect(response.body).toEqual(mockReceitas);
        // Verificamos se o Model foi realmente chamado pela rota
        expect(Receita.findAll).toHaveBeenCalledTimes(1);        
    });

    it('POST /api/receitas - Deve criar um produto (sem token)', async () => {
        // Na Prática 01 (JWT), nós protegemos a rota POST.
        // Este teste deve falhar (401 ou 403), pois não estamos enviando um token.
        // (Este é um exemplo de teste de segurança)

        const response = await request(app)
            .post('/api/receitas')
            .send({ nome: 'Teste', custo: 6 });

        // A rota deve estar protegida
        expect([401, 403]).toContain(response.status);
        // Verificamos que o Model NÃO foi chamado
        expect(Receita.create).not.toHaveBeenCalled();
    });
});