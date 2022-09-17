describe('empty spec', () => {
  beforeEach(() => {
    cy.visit('https://spontaneous-sopapillas-b74396.netlify.app/')
  })


  it('should add item', () => {
    const newTodo = 'do dishes'
    cy.get('input[name=new]').should('exist').should('be.visible').type(newTodo)
    cy.get('button[name="add-item"]').should('exist').should('be.visible').click()

    expect(cy.get)
  })
})