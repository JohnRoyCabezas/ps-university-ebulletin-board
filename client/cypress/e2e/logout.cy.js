describe('Logout', () => {
  it('Logout', () => {
    cy.login()
    cy.get('.ql-editor').click()
    cy.reload()
    cy.wait(5000)
    cy.get('.button-default > .svg-inline--fa').click()
    cy.wait(5000)
    cy.get('.bg-dark-blue > :nth-child(3)').click()
  })
})