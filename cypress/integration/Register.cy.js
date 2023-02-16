/// <reference types="cypress" />

const { accountPage, registerPage } = require('../support/pages')

var faker = require('faker');

let mailFaker = faker.internet.email()
let passFaker = faker.lorem.word(10)
let username = mailFaker.substring(0, mailFaker.indexOf("@"))

describe('Register Account', () => {

    context('Given I visit the page Minha Conta of Ebac Store logged out', () => {
        before(() => {
            cy.visit('/minha-conta')
        });

        context(`When I register an account with mail ${mailFaker} and password ${passFaker}`, () => {
            beforeEach(() => {
                registerPage.register(mailFaker, passFaker)
            });

            it('Then should appear a welcome message in the logged area', () => {
                accountPage.welcomeMessage.contains(username, { matchCase: false })
            });
        });
    });
});