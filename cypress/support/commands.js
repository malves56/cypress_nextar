//Método para realizar pesquisas no site
Cypress.Commands.add('search', function($search) {
    cy.get('input[type="search"]').type($search)
})

//Método para validar dados em tela
Cypress.Commands.add('verify', function($local, $text) {
    cy.get($local).should('be.visible', 'have.value',$text)
})

//Método para selecionar opção de combo/select
Cypress.Commands.add('selectOpt', function($type, $opt) {
    cy.get($type)
        .click()
        .wait(500)
    cy.get($opt)
        .click()
        .wait(500)
})