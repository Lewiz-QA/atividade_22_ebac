/// <reference types="cypress" />
import { carrinhoPage } from '../support/pages'

describe('Deve remover um Produto do Carrinho', () => {

  before(() => {
    cy.addItemToCart()

    //Interceptando a resposta 302 original para 204
    cy.intercept({
      url: 'carrinho/?remove_item=*',
      method: 'GET'
    }, req => {
      req.reply({
        statusCode: 204
      },
      )
    }).as('removeItemFromCart')
  })

  it('Deve remover um Produto do Carrinho interceptando a resposta da requisição com sucesso', () => {
    carrinhoPage.removerProduto()
    cy.wait('@removeItemFromCart').its('response.statusCode').should('eq', 204)
  })
})