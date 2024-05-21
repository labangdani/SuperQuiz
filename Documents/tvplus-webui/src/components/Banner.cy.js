import Banner from './Banner.vue'

describe('<Banner />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Banner)
    cy.viewport(1280, 720)
    // cy.get('.main-nav').find('li').first().as('firstNav')
  })
})