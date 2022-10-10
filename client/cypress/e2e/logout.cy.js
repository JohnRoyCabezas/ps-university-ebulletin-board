describe('empty spec', () => {
  it('passes', () => {
    cy.login()
    cy.wait(1000)
    cy.get('.button-default > .svg-inline--fa').click()
    cy.get('.bg-dark-blue > :nth-child(3)').click()
  })
})