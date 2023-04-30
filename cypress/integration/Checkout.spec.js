/// <reference types="cypress" />

const data = require('../fixtures/data.json')
const produto = require('../fixtures/produtos.json')
const local = require('../fixtures/locais.json')
import { LoginPage } from '../support/pages'

describe('Deve realizar Checkout com sucesso', () => {
    before(() => {
        cy.login(data.usuario,data.senha)

        for(let i = 0; i <= 1; i++){
            cy.addItemToCart(produto[i].tamanho,produto[i].cor,produto[i].qtde,produto[i].variation_id);
        }

        cy.Checkout(local[1].nome,local[1].sobrenome,local[1].empresa,local[1].pais,local[1].endereco,local[1].numero,local[1].cidade,local[1].estado,local[1].cep,local[1].fone,local[1].email,local[1].observacoes)
    });

    it('Deve redirecionar para a tela de Pedido Recebido', () => {
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
        LoginPage.logout()
    });
});