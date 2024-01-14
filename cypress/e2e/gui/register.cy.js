import {faker} from '@faker-js/faker'

describe('Cadastro', () => {
  it('deve registrar um usuário com sucesso.', () => {
    cy.gui_register({email: faker.internet.email(), password: faker.internet.password()})
    cy.contains('div[role="status"]', 'Cadastro realizado com sucesso. Faça seu login!').should('be.visible')
    cy.url().should('eq', `${Cypress.config('baseUrl')}/acesso`)
  })

  it('deve exibir um erro ao enviar o formulário de registro sem o e-mail.', () => {
    cy.gui_register({password: 'testError'})
    cy.contains('Required field').should('be.visible')
  })

  it('deve exibir um erro ao enviar o formulário de registro sem a senha.', () => {
    cy.gui_register({email: Cypress.env('EMAIL')})
    cy.contains('p[role="alert"]', 'Required field').should('be.visible')
  })

  it('deve retornar um erro ao tentar registrar um usuário que já está registrado.', () => {
    cy.gui_register({email: Cypress.env('EMAIL'), password: Cypress.env('PASSWORD')})
    cy.contains('Falha ao realizar cadastro').should('be.visible')
  })
})
