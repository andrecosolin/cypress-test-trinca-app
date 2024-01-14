describe('Acesso', () => {
  it('deve  efetuar o login com sucesso', () => {
    cy.gui_login({email: Cypress.env('EMAIL'), password: Cypress.env('PASSWORD')})
    cy.get('a[href="/eventos"]').should('be.visible')
  })

  it('deve falhar ao fazer login porque é um usuário não registrado.', () => {
    cy.gui_login({email: 'userNotRegistered@gmail.com', password: 'testError'})
    cy.get('div[role="status"]').invoke('text').then((text) => {
      const expectedText = 'Falha ao realizar login'
      expect(text.trim()).to.equal(expectedText)
    })
  })

  it('deve exibir um erro ao enviar formulário sem preencher o campo obrigatório de e-mail.', () => {
    cy.gui_login({password: 'testError'})
    cy.contains('Campo obrigatório').should('be.visible')
  })

  it('deve exibir um erro ao enviar formulário sem preencher o campo obrigatório de password.', () => {
    cy.gui_login({email: Cypress.env('EMAIL')})
    cy.contains('p[role="alert"]', 'Campo obrigatório').should('be.visible')
  })
})
