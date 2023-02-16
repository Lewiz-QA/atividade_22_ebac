/// <reference types="cypress" />

const data = require('../fixtures/data.json')

describe('Deve realizar Checkout com sucesso', () => {
    before(() => {
        cy.login(data.usuario, data.senha)
        cy.addItemToCart()
        cy.Checkout()
    });

    it('Deve redirecionar para a tela de Pedido Recebido', () => {
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.');
    });
});