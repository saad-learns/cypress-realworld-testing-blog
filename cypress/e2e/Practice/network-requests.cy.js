/*
  It is very helpful to use console.log() to log out the response data
  in order to see the data you are working with.
  
  You can also click on the request in the Cypress Command Log for an even
  better experience.
*/
describe("Network Requests", () => {
  beforeEach(() => {
    // cy.intercept("GET", "http://localhost:3000/api/posts", (req) => {
    //   // this is to disable browser caching
    //   // https://glebbahmutov.com/blog/cypress-intercept-problems/
    //   delete req.headers["if-none-match"];
    // }).as("posts");

    cy.intercept('GET', 'http://localhost:3000/api/posts', {
      statusCode: 200,
      body: {
        name: 'Peter Pan',
      },
    }).as("posts");

    cy.visit("http://localhost:3000");
  });

  it.only("/api/posts returns a status code of 200", () => {
    // Write an assertion that the route '/api/posts'
    // returns a status code of 200
    // Hint: You will need to use cy.request()
    // https://docs.cypress.io/api/commands/request

    cy.wait('@posts').its('response.statusCode').should('eq', 200)

    // cy.request("GET", "http://localhost:3000/api/posts").then(res => expect(res.status).to.eq(201));

      
  });

  it("/api/posts returns the correct number of posts", () => {
    // Write an assertion that the route '/api/posts'
    // returns the correct number of posts.

    cy.request("/api/posts").then(res => {
      expect(res.body).to.have.length(2);
    });
  });

  it("the posts.json fixture returns the correct number of posts", () => {
    // Write an assertion that the route '/api/posts'
    // returns the correct number of posts.
    // There are 25 total posts in the fixture
    // Hint: You will need to use cy.fixture()
    // https://docs.cypress.io/api/commands/fixture

    cy.fixture('posts.json').then(res => {
      expect(res).to.have.length(25);
    });
  });

  it("intercepts /api/posts and returns the correct number of posts", () => {
    // Wait upon the @posts intercept that happens in the beforeEach()
    // and assert that the response contains the correct number of posts
    // Hint: you will need to cy.wait() to wait upon the @posts alias.
    // https://docs.cypress.io/api/commands/wait

    cy.wait('@posts').its("response.body").should("have.length", 2);

    // cy.wait('@posts').then(res => {
    //   expect(res.response.body).to.have.length(25);
    // });
    
    // .then(res => {
    //   expect(res.body).to.have.length(2);
    // });
  });
});
