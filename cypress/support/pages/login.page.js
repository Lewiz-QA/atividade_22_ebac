/// <reference types="cypress" />

class LoginPage {
    get #user() { return cy.get('#username')}
    get #pass() { return cy.get('#password')}
    get #login() { return cy.get('.woocommerce-form > .button')}

    login(user,pass){
        this.#user.type(user, {force: true})
        this.#pass.type(pass)
        this.#login.click()
    }
}

module.exports = new LoginPage()