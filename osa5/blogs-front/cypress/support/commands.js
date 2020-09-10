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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('deleteUsers', function () {
  cy.request('POST', 'http://localhost:3001/api/testing/reset')
})

Cypress.Commands.add('newUser', function (username, password, name) {
  cy.request(
    'POST',
    'http://localhost:3001/api/users',
    { username, password, name }
  )
})

Cypress.Commands.add('newBlog', function (title, url, author) {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, url, author },
    headers: {
      Authorization: `bearer ${JSON.parse(window.localStorage.getItem('loggedUser')).token}`
    }
  })
})

Cypress.Commands.add('login', function (username, password) {
  cy.request('POST', 'http://localhost:3001/api/login', { username, password })
    .then((response) => {
      window.localStorage.setItem('loggedUser', JSON.stringify(response.body))
    })
})