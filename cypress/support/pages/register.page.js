/// <reference types="cypress" />

class RegisterPage {
    get #mail() { return cy.get('#reg_email')}
    get #pass() { return cy.get('#reg_password')}
    get #register() { return cy.get(':nth-child(4) > .button')}

    register(mail,pass){
        this.#mail.type(mail, {force: true})
        this.#pass.type(pass)
        this.#register.click()
    }
}

module.exports = new RegisterPage()