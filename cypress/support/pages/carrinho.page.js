/// <reference types="cypress" />

class carrinhoPage {
    aumentarQtdeProduto() {
        cy.get('.plus').click({force: true})
    }

    reduzirQtdeProduto() {
        cy.get('.minus').click({force: true})
    }

    removerProduto() {
        cy.get('.remove > .fa').click({force: true})
    }

    get TotalProdutosCarrinho(){return cy.get('.dropdown-toggle > .mini-cart-items')}
}

module.exports = new carrinhoPage()
