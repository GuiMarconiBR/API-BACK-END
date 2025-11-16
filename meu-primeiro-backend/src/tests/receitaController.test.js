const receitaController = require('../controllers/receitaControllers');
const Receita = require('../models/receitaModel');


// 1. O Mock Mágico
// Esta linha diz ao Jest para substituir o módulo '../models/produto' por um Mock.
// Isso DEVE ser feito fora dos blocos describe/it.
jest.mock('../models/receitaModel');

// Suíte de Testes para o Controlador de Produtos
describe('ProdutoController - Testes Unitários', () => {

    // Limpa os mocks após cada teste para evitar "vazamento"
    afterEach(() => {
        jest.clearAllMocks();
    });

    // Teste para o método getAllProdutos
    it('Deve retornar todas as receitas e status 200 (listarReceitas)', async () => {
        // --- 1. Arrange (Arrumar) ---

        // Dados falsos que esperamos que o Model retorne
        const mockReceitas = [
            {id: 1, nome: 'Receita Mock 1', custo: 7.48},
            {id: 2, nome: 'Receita Mock 2', custo: 4.23}
        ];

        // Dizemos ao Model mockado: "Quando a função findAll for chamada,
        // resolva a Promise com 'mockProdutos'"
        Receita.findAll.mockResolvedValue(mockReceitas);

          // Criamos mocks para os objetos 'req' e 'res'
          const req = {};
          const res = {
            status: jest.fn().mockReturnThis(), // Permite encadeamento (ex: res.status(200).json(...) )
            json: jest.fn()
        };

        // --- 2. Act (Agir) ---
        // Chamamos a função real do controlador com os mocks
        await receitaController.listarReceitas(req, res);

        // --- 3. Assert (Verificar) ---
        // Verificamos se o Model foi chamado corretamente
        expect(Receita.findAll).toHaveBeenCalledTimes(1);
        // Verificamos se a resposta foi enviada corretamente
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockReceitas);
    });

    // Teste para o método createProduto
    it('Deve criar uma receita e retornar status 201 (create)', async () => {

        // --- 1. Arrange ---
        const novaReceitaMock = {nome: 'Receita nova', custo: 6.53};
        const receitaCriadaMock = {id: 3, ...novaReceitaMock};

        // Dizemos ao Model mockado para retornar o produto criado
        Receita.create.mockResolvedValue(receitaCriadaMock);

        // Criamos um mock de 'req' com os dados do body
        const req = {
            body: novaReceitaMock
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

         // --- 2. Act ---
         await receitaController.create(req.res);

         // ---3. Assert ---
        // Verificamos se o Model foi chamado com os dados corretos
        expect(Receita.create).toHaveBeenCalledWith(novaReceitaMock);
        // Verificamos a resposta
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(novaReceitaMock);
    });
});