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
    fd.append('woocommerce-login-nonce', '5845cee5d3') //O valor deste atributo pode variar de login para login
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

Cypress.Commands.add('addItemToCart', (tamanho, cor, qtde, variation_id) => {
    const fd = new FormData()
    fd.append('attribute_size', tamanho)
    fd.append('attribute_color', cor)
    fd.append('quantity', qtde)
    fd.append('add-to-cart', 4104)
    fd.append('product_id', 4104)
    fd.append('variation_id', variation_id)
    cy.request({
        url: '/product/ingrid-running-jacket',
        method: 'POST',
        body: fd
    }).then((response) => {
        expect(response.status).to.eq(200)
    })
    cy.visit('/checkout')
});

Cypress.Commands.add('Checkout', (nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep, fone, email, observacoes) => {
    cy.get('#billing_first_name').clear().type(nome)
    cy.get('#billing_last_name').clear().type(sobrenome)
    cy.get('#billing_company').clear().type(empresa)
    cy.get('#select2-billing_country-container').click().type(pais).get('[aria-selected="true"]').click()
    cy.get('#billing_address_1').clear().type(endereco)
    cy.get('#billing_address_2').clear().type(numero)
    cy.get('#billing_city').clear().type(cidade)
    cy.get('#select2-billing_state-container').click().type(estado + '{enter}')
    cy.get('#billing_postcode').clear().type(cep)
    cy.get('#billing_phone').clear().type(fone)
    cy.get('#billing_email').clear().type(email)
    cy.get('#order_comments').clear().type(observacoes)
    cy.get('#terms').click({ force: true })
    cy.get('#place_order').click()
});

/*
Cypress.Commands.add('Checkout', () => {
    const fd = new FormData()
    fd.append('wc-ajax', 'checkout')
    fd.append('billing_first_name', 'Luiz')
    fd.append('billing_last_name', 'Guilherme')
    fd.append('billing_company:', 'Company Test')
    fd.append('billing_country', 'BR')
    fd.append('billing_address_1', 'Rua teste')
    fd.append('billing_address_2', 'Apartamento Número 100')
    fd.append('billing_city', 'Curitiba')
    fd.append('billing_state', 'PR')
    fd.append('billing_postcode', 81010100)
    fd.append('billing_phone', 4234222020)
    fd.append('billing_email', 'teste@teste.com')
    fd.append('account_password', null)
    fd.append('order_comments', 'Informação adicional teste.')
    fd.append('payment_method', 'bacs')
    fd.append('terms', 'on')
    fd.append('terms-field', 1)
    fd.append('woocommerce-process-checkout-nonce:', '93fb188647')
    fd.append('_wp_http_referer', '/?wc-ajax=update_order_review')
    cy.request({
        url: '/?wc-ajax=checkout',
        method: 'POST',
        body: fd
    }).then((resp) => {
        expect(resp.status).to.eq(200)
    })
});
*/