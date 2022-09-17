import rgbHex from 'rgb-hex';

describe('empty spec', () => {
  const newTodo = 'do dishes'

  beforeEach(() => {
    cy.visit('https://spontaneous-sopapillas-b74396.netlify.app/')

    cy.get('input[name=new]').should('exist').should('be.visible').type(newTodo)
    cy.get('button[name="add-item"]').should('exist').should('be.visible').click()

    cy.get('main[class=todo]').children().first().as('item')
  })

  it('should add todo', () => {
    cy.get('@item').should('be.visible').contains(newTodo)
  })

  it('should edit todo', () => {
    cy.get('@item').find('button[name="edit-item"]').should('be.visible').click()

    const updatedTodo = newTodo + ' edited'

    cy.get('input[name=edit]').should('be.visible').clear().type(updatedTodo)
    cy.get('button[name="update-item"]').should('be.visible').click()

    cy.get('@item').find('span').contains(updatedTodo)
  })

  it('should delete todo', () => {
    cy.get('@item').should('be.visible')
    cy.get('@item').find('button[name="delete-item"]').should('be.visible').click()

    cy.get('main[class=todo]').children().should('not.exist')
  })

  it('should done todo', () => {
    cy.get('@item').find('button[name="toggle-item"]').should('be.visible').click()

    cy.get('@item')
      .find('span')
      .should('be.visible')
      .invoke('css', 'color')
      .then((color) => {
        expect(rgbHex(color)).to.be.eq('535353')
      })
  })
})