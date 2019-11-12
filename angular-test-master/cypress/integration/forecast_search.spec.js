/// <reference types="cypress" />

describe('Weather Forecast Search Page', () => {
  beforeEach(() => {
    cy.viewport('macbook-15');
    cy.visit('http://localhost:4200/');
    cy.get('[data-test=search-input]').as("search-input");
    cy.get('[data-test=search-button]').as("search-button");
  })
  specify('should display a text field and a search button', () => {
    cy.get('@search-input')
      .should('be.visible')
      .and('have.length', 1);

    cy.get('@search-button')
      .should('be.visible')
      .and('have.length', 1);

    cy.get('@search-button')
      .should('contain', 'Search');

  })

  context('When searching for a city forecast not searched previously',  () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', 'https://api.openweathermap.org/data/2.5/*')
        .as('searchForecast');
    });

    specify('should add a row in the table of forecasts for the city', () => {
      let counter = 0;
      cy.fixture('cities')
      .each((city) => {
          cy.get('@search-input').type(city);
          cy.get('@search-button').click();

          cy.wait('@searchForecast');
          counter ++;

          cy.get('[data-test=city-forecast]').should('have.length', counter);
          cy.get('@search-input').clear();
      })
    })

    specify('should show each city name in the first column and temperature in second column', () => {
      cy.fixture('cities')
      .each((city) => {
          cy.get('@search-input').type(city);
          cy.get('@search-button').click();

          cy.wait('@searchForecast');

          cy.contains(city)
            .as('cityname')
            .should('be.visible');
          cy.get('@cityname')
          .parentsUntil('[data-test="city-forecast]')
          .filter('[data-test=city-name-cell]')
          .siblings('[data-test=forecast-cell]')
          .find('[data-test=forecast]')
          .should('have.length', 9);

          cy.get('@search-input').clear();
      })
    })
  })

  context('When searching for a city searched previously',  () => {
    beforeEach(() => {
      cy.server()
      cy.route('GET', 'https://api.openweathermap.org/data/2.5/*')
        .as('searchForecast');
    });

    specify('should not add the forecast in the table of forecasts for the city', () => {
      const city = 'London';

      cy.get('@search-input').type(city);
      cy.get('@search-button').click();
      cy.wait('@searchForecast');

      cy.get('[data-test=city-forecast]').should('have.length', 1);
      cy.get('@search-input').clear();

      cy.get('@search-input').type(city);
      cy.get('@search-button').click();

      cy.get('[data-test=city-forecast]').should('have.length', 1);
    })
  })
});
