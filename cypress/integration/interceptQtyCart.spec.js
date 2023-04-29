/// <reference types="cypress" />
import { carrinhoPage } from '../support/pages'

describe('Deve atualizar um Produto no Carrinho', () => {

  beforeEach(() => {
    cy.addItemToCart()

    //Interceptando a resposta 302 original para 200
    cy.intercept({
      url: 'carrinho/',
      method: 'POST'
    }, req => {
      req.reply({
        statusCode: 200
      },
      )
    }).as('changeQtyInCart')
  })

  it('Deve aumentar a Qtde. de um Produto no Carrinho interceptando a resposta da requisição com sucesso', () => {
    carrinhoPage.aumentarQtdeProduto()
    cy.wait('@changeQtyInCart').its('response.statusCode').should('eq', 200)
  })

  it('Deve reduzir a Qtde. de um Produto no Carrinho interceptando a resposta da requisição com sucesso', () => {
    carrinhoPage.reduzirQtdeProduto()
    cy.wait('@changeQtyInCart').its('response.statusCode').should('eq', 200)
  })
})