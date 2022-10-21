describe('Admin Settings', () => {
  it('Login', () => {
    cy.adminLogin()
  })
  it('Admin Settings', () => {
    cy.get('.button-default > .svg-inline--fa').click()
    // cy.wait(2000)
    cy.get('.cursor-pointer > .mx-2').click()
    cy.get('svg[data-icon="users"]').click()
    // cy.get('.button-default > .svg-inline--fa').click()
    // cy.go('back')
    // cy.get('.sticky > .cursor-pointer').click()
    // cy.get('svg[data-icon="building-columns"]').click()
    cy.go('back')
    cy.get('svg[data-icon="building-user"]').click()
    cy.go('back')
  })
})