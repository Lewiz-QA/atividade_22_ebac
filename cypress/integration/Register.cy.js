/// <reference types="cypress" />

const {accountPage, registerPage} = require('../support/pages')

var faker = require('faker');

let emailFaker = faker.internet.email()
let senhaFaker = faker.lorem.word(10)
let username = emailFaker.substring(0, emailFaker.indexOf("@"))

describe('Access Admin Panel', () => {
    beforeEach(() => {
        cy.visit('/minha-conta')
    });

    it('Deve realizar o cadastro de uma conta', () => {
        registerPage.register(emailFaker, senhaFaker)
        accountPage.welcomeMessage.contains(username, { matchCase: false })
    });
});