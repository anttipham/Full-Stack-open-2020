describe('Blog app', function() {
  beforeEach(function() {
    cy.deleteUsers()/* .then(() => {
    }) */
    cy.newUser('fff', 'fff', 'Press F to Pay Respects')
    cy.visit('http://localhost:3000')
  })

  // KIRJOITUSVIRHE TEHTÄVÄNANNOSSA from -> form
  it('Login form is shown', function() {
    cy.get('form')
      .contains('ur naem:')
    cy.get('form')
      .contains('ur passwrd:')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', function() {
      cy.contains('ur naem:')
        .find('input')
        .type('fff')
      cy.contains('ur passwrd:')
        .find('input')
        .type('fff')
      cy.contains('l0g1n')
        .click()

      cy.contains('l0gged in za gaem')
    })

    it('fails with wrong credentials', function() {
      cy.contains('ur naem:')
        .find('input')
        .type('FFF')
      cy.contains('ur passwrd:')
        .find('input')
        .type('FFF')
      cy.contains('l0g1n')
        .click()
        
      cy.contains('ur us3rn4me or p4ssw0rd is veri wr0ng')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('fff', 'fff')
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.get('.togglableButton')
        .contains('new bl0g')
        .click()

      cy.get('#title')
        .type('n00b gamer')
      cy.get('#url')
        .type('mlg.4eva.pro')
      cy.get('#author')
        .type('pr0 gamer')
      cy.contains('subm1t')
        .click()
      
      cy.contains('n00b gamer – pr0 gamer')
    })
  })

  describe('User logged in and blog has been made', function () {
    beforeEach(function () {
      cy.login('fff', 'fff')
      cy.newBlog('n00b gamer', 'mlg.4eva.pro', 'pr0 gamer')
      cy.visit('http://localhost:3000')
  })
    
    it('A blog can be liked', function () {
      cy.contains('moar info')
        .click()
      
      cy.contains('i like diz')
        .click()

      cy.contains('l1kes: 1')
    })

    it('A blog can be deleted with the user who added the blog', function () {
      cy.contains('moar info')
        .click()
      
      cy.contains('d3l3t3')
        .click()

      cy.get('html')
        .should('not.contain', 'n00b gamer')
    })

    it('Blogs are shown in the order of likes (descending)', function () {
      cy.newBlog('first', 'first', 'first')
      cy.newBlog('last', 'last', 'last')
      cy.visit('http://localhost:3000')


      cy.get('.blog').then(function (blogs) {
        for (let i = 0; i < 3; i++) {
          cy.wrap(blogs[i]).contains('moar info').click()
        }

        // Järjestys nyt: n00b, first, last
        cy.wrap(blogs[0]).contains('n00b')
        cy.wrap(blogs[1]).contains('first')
        cy.wrap(blogs[2]).contains('last')

        // Vaihdetaan järjestystä
        cy.wrap(blogs[1]).contains('i like diz').click()
      })

      cy.get('.blog').then(function (blogs) {
        // Järjestys nyt: first, n00b, last
        cy.wrap(blogs[0]).contains('first')
        cy.wrap(blogs[1]).contains('n00b')
        cy.wrap(blogs[2]).contains('last')
      })
    })
  })
})
