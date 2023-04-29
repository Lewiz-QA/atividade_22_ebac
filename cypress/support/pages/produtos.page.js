/// <reference types="cypress" />

class produtosPage {
    incluirProduto(produto, tamanho, cor, quantidade) {
        cy.get('[class="product-block grid"]').contains(produto).click({force: true})
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click({force: true})    
    }
}

module.exports = new produtosPage()
