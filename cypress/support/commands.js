/**
 * @param {Object} inputData - Objeto que representa os dados para registrar um usuário.
 *   Serão levados em consideração as seguintes keys: email e password
 * 
 * Exemplo de uso:
 *  cy.gui_register({email: 'userTest@gmail.com', password: 'test'})
 */
Cypress.Commands.add('gui_register', (inputData={}) => {
  cy.visit('/cadastro')
  if (inputData.email !== undefined) {
    cy.get('input[name="email"]').then((el) => {
      if (inputData.email === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(inputData.email)
        Cypress.env('EMAIL', inputData.email)
      }
    })
  }
  if (inputData.password !== undefined) {
    cy.get('input[name="password"]').then((el) => {
      if (inputData.password === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(inputData.password)
        Cypress.env('PASSWORD', inputData.password)
      }
    })
  }
  cy.get('button[type="submit"]').click()
})

/**
 *   Comando para realizar login e manter a sessão do mesmo. Ele não utiliza parâmetros, pois
 *   usa os dados capturados das ENVs.
 * Exemplo de uso:
 *   cy.gui_loginWithSession()
 */
Cypress.Commands.add('gui_loginWithSession', () => {
  const userEmail = Cypress.env('EMAIL')
  const userPassword = Cypress.env('PASSWORD')

  const login = () => {
    cy.url().then((currentUrl) => {
      if (currentUrl !== `${Cypress.config('baseUrl')}/acesso`) {
        cy.visit('/acesso')
      }
    })
    cy.get('input[name="email"]').type(userEmail)
    cy.get('input[name="password"]').type(userPassword)
    cy.contains('button', 'Acessar conta').click()
  }

  const validate = () => {
    cy.url().should('not.include', '/acesso')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  cy.session(userEmail, login, options)
})

/**
 * @param {Object} inputData - Objeto que representa os dados de login do usuário.
 *   Serão levados em consideração as seguintes keys: email e password
 * 
 * Exemplo de uso:
 *  cy.gui_login({email: 'userTest@gmail.com', password: 'test'})
 */
Cypress.Commands.add('gui_login', (inputData={}) => {
  console.log(inputData)
  cy.visit('/acesso')
  if (inputData.email !== undefined) {
    cy.get('input[name="email"]').then((el) => {
      if (inputData.email === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(inputData.email)
      }
    })
  }
  if (inputData.password !== undefined) {
    cy.get('input[name="password"]').then((el) => {
      if (inputData.password === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(inputData.password)
      }
    })
  }
  cy.contains('button', 'Acessar conta').click()
})

/**
 * @param {Object} eventFormData - Objeto que representa o formulário de eventos.
 *   Serão levados em consideração as seguintes keys: title{String}, price{Number}, date{Date} e observations{String}
 * 
 * Exemplo de uso:
 *  const eventToCreateEvent = {
      title: faker.lorem.sentence(4),
      price: 50,
      date: '2024-07-08',
      observations: faker.lorem.lines(1),
    }
 * cy.gui_fillEventForm(eventToCreateEvent)
 */
Cypress.Commands.add('gui_fillEventForm', (eventFormData={}) => {
  if (eventFormData.title !== undefined) {
    cy.get('input[name="title"]').then((el) => {
      if (eventFormData.title === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(eventFormData.title)
      }
    })
  }

  if (eventFormData.price !== undefined) {
    cy.get('input[name="price"]').then((el) => {
      if (eventFormData.price === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(eventFormData.price)
      }
    })
  }

  if (eventFormData.date !== undefined) {
    cy.get('input[name="date"]').then((el) => {
      if (eventFormData.date === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(eventFormData.date)
      }
    })
  }

  if (eventFormData.observations !== undefined) {
    cy.get('textarea[name="observations"]').then((el) => {
      if (eventFormData.observations === '') {
        cy.wrap(el).clear()
      } else {
        cy.wrap(el).clear()
        cy.wrap(el).type(eventFormData.observations)
      }
    })
  }
})

/**
 * @param {Object} eventFormData - Objeto que representa o formulário de eventos.
 *   Serão levados em consideração as seguintes keys: title{String}, price{Number}, date{Date} e observations{String}
 *
 * Exemplo de uso:
 *  const eventToCreateEvent = {
      title: faker.lorem.sentence(4),
      price: 50,
      date: '2024-07-08',
      observations: faker.lorem.lines(1),
    }
 * cy.gui_createEvent(eventToCreateEvent)
 */
Cypress.Commands.add('gui_createEvent', (eventFormData={}) => {
  cy.get('button:contains("Cadastrar novo evento")').click()
  cy.gui_fillEventForm(eventFormData)
  cy.get('button:contains("Salvar evento")').click()
})

/**
 * @param {String} eventName - Nome do evento a ser editado
 * @param {Object} eventFormData - Objeto que representa o formulário de eventos.
 *   Serão levados em consideração as seguintes keys: title{String}, price{Number}, date{Date} e observations{String}
 *
 * Exemplo de uso:
 *  const eventToCreateEvent = {
      title: faker.lorem.sentence(4),
      price: 50,
      date: '2024-07-08',
      observations: faker.lorem.lines(1),
    }
 * cy.gui_createEvent(eventToCreateEvent)
 */
Cypress.Commands.add('gui_editEvent', (eventName, eventFormData={}) => {
  cy.contains('strong', eventName).siblings('a').click()
  cy.gui_fillEventForm(eventFormData)
  cy.contains('Salvar evento').click()
})

