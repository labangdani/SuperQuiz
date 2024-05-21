import Header from './AppHeader.vue'

describe('<Header />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Header)
  })
})