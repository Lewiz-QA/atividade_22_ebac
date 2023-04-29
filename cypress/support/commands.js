// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { .. })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { .. })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { .. })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { .. })

/*Cypress.Commands.add('login', (usuario, senha) => {
    cy.visit('/minha-conta/')
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha)
    cy.get('.woocommerce-form > .button').click()
})*/

Cypress.Commands.add('login', (user, pass) => {
    const fd = new FormData()
    fd.append('username', user)
    fd.append('password', pass)
    fd.append('woocommerce-login-nonce', '51059611be') //O valor deste atributo pode variar de login para login
    fd.append('_wp_http_referer', '/minha-conta/')
    fd.append('login', 'Login')
    cy.request({
        url: '/minha-conta/',
        method: 'POST',
        body: fd
    }).its('allRequestResponses')
        .its('0')
        .its('Response Headers')
        .then(response => {
            response['set-cookie'].forEach(cookie => {
                const firstPart = cookie.split(';')[0]
                const divisor = firstPart.indexOf('=')
                const key = firstPart.substring(0, divisor)
                const value = firstPart.substring(divisor + 1)

                cy.setCookie(key, value)
            })
        })
})

Cypress.Commands.add('addItemToCart', () => {
    const fd = new FormData()
    fd.append('attribute_size', 'XL')
    fd.append('attribute_color', 'Red')
    fd.append('quantity', 2)
    fd.append('add-to-cart', 3345)
    fd.append('product_id', 3345)
    fd.append('variation_id', 3357)
    cy.request({
        url: 'product/atomic-endurance-running-tee-crew-neck/',
        method: 'POST',
        body: fd
    })
    cy.visit('/carrinho')
});
    /*.then((response) => {
        expect(response.status).to.eq(200)
    })
    cy.visit('/checkout')
});*/

Cypress.Commands.add('Checkout', () => {
    cy.get('#billing_first_name').clear().type('Luiz')
    cy.get('#billing_last_name').clear().type('Guilherme')
    cy.get('#billing_company').clear().type('Company Test')
    cy.get('#select2-billing_country-container').click().type('Brasil').get('[aria-selected="true"]').click()
    cy.get('#billing_address_1').clear().type('Rua teste')
    cy.get('#billing_address_2').clear().type('Apartamento Número 100')
    cy.get('#billing_city').clear().type('Curitiba')
    cy.get('#select2-billing_state-container').click().type('Paraná' + '{enter}')
    cy.get('#billing_postcode').clear().type('81010-100')
    cy.get('#billing_phone').clear().type('4234222020')
    cy.get('#billing_email').clear().type('teste@teste.com')
    cy.get('#order_comments').clear().type('Informação adicional teste')
    cy.get('#terms').click({ force: true })
    cy.get('#place_order').click()
});