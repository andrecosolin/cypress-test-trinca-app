import {faker} from '@faker-js/faker'

describe('Eventos', () => {
  const eventToCreateEvent = {
    title: faker.lorem.sentence(4),
    price: 50,
    date: '2024-07-08',
    observations: faker.lorem.lines(1),
  }

  const eventToEditEvent = {
    title: faker.lorem.sentence(4),
    price: 50,
    date: '2024-07-08',
    observations: faker.lorem.lines(1),
  }

  // Esse before não é ideal, mas como não sei com que frequencia limpam a base, eu achei uma boa escolha colocá-lo.
  // Em um projeto real teríamos limpeza de dados usados após a execução dos testes.
  before(() => {
    cy.gui_register({email: faker.internet.email(), password: faker.internet.password()})
    cy.contains('div[role="status"]', 'Cadastro realizado com sucesso. Faça seu login!').should('be.visible')
    cy.url().should('eq', `${Cypress.config('baseUrl')}/acesso`)
  })

  describe('Eventos - Criação', () => {
    beforeEach(() => {
      cy.gui_loginWithSession()
    })

    it('deve retornar sucesso ao cadastrar um evento com todos os campos obrigatórios.', () => {
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      const formWithoutObservations = {...eventToCreateEvent}
      formWithoutObservations.title += 'without observation'
      delete formWithoutObservations.observations
      cy.gui_createEvent(formWithoutObservations)
      cy.visit('/eventos')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.contains('strong', formWithoutObservations.title).should('be.visible')
    })

    it('deve retornar sucesso ao cadastrar um evento com todos os campos.', () => {
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.gui_createEvent(eventToCreateEvent)
      cy.visit('/eventos')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.contains('strong', eventToCreateEvent.title).should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor do Título.', () => {
      const formWithoutTitle = {...eventToCreateEvent}
      delete formWithoutTitle.title
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.gui_createEvent(formWithoutTitle)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor do Custo.', () => {
      const formWithoutPrice = {...eventToCreateEvent}
      formWithoutPrice.price = ''
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.gui_createEvent(formWithoutPrice)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor da Data.', () => {
      const formWithoutDate = {...eventToCreateEvent}
      delete formWithoutDate.date
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.gui_createEvent(formWithoutDate)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve validar que o campo Custo é do tipo number.', () => {
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.get('button:contains("Cadastrar novo evento")').click()
      cy.get('input[name="price"]').should('have.attr', 'type', 'number')
    })

    it('deve validar que o campo Data é do tipo date.', () => {
      cy.visit('/')
      cy.get('a[href="/eventos"]').click()
      cy.url().should('eq', `${Cypress.config('baseUrl')}/eventos`)
      cy.get('button:contains("Cadastrar novo evento")').click()
      cy.get('input[name="date"]').should('have.attr', 'type', 'date')
    })
  })

  describe('Eventos - Edição', () => {
    before(() => {
      cy.gui_loginWithSession()
      cy.visit('/eventos')
      cy.gui_createEvent(eventToEditEvent)
    })

    beforeEach(() => {
      cy.gui_loginWithSession()
    })

    it('deve validar que ao entrar na edição o formulário carregue todos os dados cadastrados.', () => {
      cy.visit('/eventos')
      cy.contains('strong', eventToEditEvent.title).siblings('a').click()
      cy.get('input[name="title"]').invoke('val').should('eq', eventToEditEvent.title)
      cy.get('input[name="price"]').invoke('val').should('eq', eventToEditEvent.price.toString())
      cy.get('textarea[name="observations"]').invoke('val').should('eq', eventToEditEvent.observations)
      cy.get('input[name="date"]').invoke('val').should('eq', eventToEditEvent.date)
    })

    it('deve retornar sucesso ao editar um evento com todos os campos obrigatórios.', () => {
      cy.visit('/eventos')
      const formWithoutObservations = {...eventToCreateEvent}
      formWithoutObservations.title += 'without observation'
      delete formWithoutObservations.observations
      cy.gui_editEvent(eventToEditEvent.title, formWithoutObservations)
      cy.visit('/eventos')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.contains('strong', formWithoutObservations.title).should('be.visible')
    })

    it('deve retornar sucesso ao editar um evento com todos os campos.', () => {
      cy.visit('/eventos')
      cy.gui_editEvent(eventToCreateEvent.title, eventToEditEvent)
      cy.visit('/eventos')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000)
      cy.contains('strong', eventToCreateEvent.title).should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor do Título.', () => {
      const formWithoutTitle = {...eventToEditEvent}
      delete formWithoutTitle.title
      formWithoutTitle.title = ''
      cy.visit('/eventos')
      cy.gui_editEvent(eventToEditEvent.title, formWithoutTitle)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor do Custo.', () => {
      const formWithoutPrice = {...eventToCreateEvent}
      formWithoutPrice.price = ''
      cy.visit('/eventos')
      cy.gui_editEvent(eventToEditEvent.title, formWithoutPrice)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve retornar mensagem de campo obrigatório caso não insira o valor da Data.', () => {
      const formWithoutDate = {...eventToCreateEvent}
      delete formWithoutDate.date
      cy.visit('/eventos')
      cy.gui_editEvent(eventToEditEvent.title, formWithoutDate)
      cy.contains('Campo obrigatório').should('be.visible')
    })

    it('deve validar que o campo price é do tipo number.', () => {
      cy.visit('/eventos')
      cy.contains('strong', eventToEditEvent.title).siblings('a').click()
      cy.get('input[name="price"]').should('have.attr', 'type', 'number')
    })

    it('deve validar que o campo Data é do tipo date.', () => {
      cy.visit('/eventos')
      cy.contains('strong', eventToEditEvent.title).siblings('a').click()
      cy.get('input[name="date"]').should('have.attr', 'type', 'date')
    })
  })
})
