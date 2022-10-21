describe('Admin Announcement', () => {
  it('Login', () => {
    cy.adminLogin()
    cy.get('.ql-editor').click()
    cy.reload()
  })
  it('Post', () => {
    cy.get('.ql-editor').type('The greatest glory in living lies not in never falling, but in rising every time we fall.')
    cy.get('button[type="submit"]').click()
  })
  it('Edit', () => {
    cy.get(':nth-child(4) > .relative').trigger('mouseover')
    cy.get(':nth-child(4) > .relative > .absolute > :nth-child(2) > .cursor-pointer > .svg-inline--fa').click()
    cy.get('.relative > .flex-col > :nth-child(2) > .px-5 > :nth-child(1) > form > .quill > .ql-container > .ql-editor').type(
      'Classes are suspended on all levels due to special holiday celebration. tree')
    cy.get('.relative > .flex-col > :nth-child(2) > .px-5 > :nth-child(1) > form > .flex > button > .svg-inline--fa > path').click()
  })
  it('Delete', () => {
    cy.get(':nth-child(3) > .relative').trigger('mouseover')
    cy.get(':nth-child(3) > .relative > .absolute > :nth-child(3) > .cursor-pointer > .svg-inline--fa > path').click()
    cy.get('.text-red-500').click()
  })
})