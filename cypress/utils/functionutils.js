

export function login() {
    // const username = Cypress.env('CYPRESS_USERNAME');
    // const password = Cypress.env('CYPRESS_PASSWORD');
  
    // // Visit the login page here
    // cy.visit("/");
  
    // cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').should('exist').type(username);
    // cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').should('exist').type(password);
    // cy.get('.oxd-button').click();
  }
  
export function successfulPageLoading() {

  cy.url().then((url) => {
    // Output the captured URL to the Cypress console for reference (optional)
    cy.log('URL:', url);
    // Use cy.request() to check the status code
    cy.request({
      url: url, // Use the captured URL
      method: 'GET',
    }).then((response) => {
      expect(response.status).to.eq(200); // Assert that the status code is 200
    });
      
  });
 
}
export const addItemsToCart = (items) => {
    items.forEach((item) => {
      cy.log(item.item);
      // Trigger mouseover for the current item
      cy.contains(item.item).trigger('mouseover');
      
      // Click "Add to Cart" button for the current item
      cy.contains(item.item)
        .parent()
        .contains('Add to cart')
        .click();
      
      // Perform actions after adding to cart, for example, close the modal
      cy.get('.modal-footer > .btn').click();
      
      // Add further assertions or actions as needed
    });
  };

export function getCartpage() {
  //click on cart button
  cy.get('.shop-menu > .nav > :nth-child(3) > a').click()
  successfulPageLoading();
  //proceed to checkout
  cy.get('.col-sm-6 > .btn').click()
};



export function signup(email){
 
  cy.get('[data-qa="signup-name"]').type(Cypress.env('Name'));
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();
  
  // Registration form 
  cy.get('#id_gender1').click()
  cy.get('[data-qa="password"]').type(Cypress.env('Password'));
  
  //DOB
 
  cy.get('[data-qa="days"]').select('10');
  
  cy.get('[data-qa="months"]').select('4');

  cy.get('[data-qa="years"]').select('2000');

  // checkbox
  cy.get('#newsletter').click();
  cy.get('#optin').click();

  //Address
  cy.get('[data-qa="first_name"]').type(Cypress.env('Name'));
  cy.get('[data-qa="last_name"]').type(Cypress.env('Lname'));
  cy.get('[data-qa="company"]').type(Cypress.env('Company'));
  cy.get('[data-qa="address"]').type(Cypress.env('Address1'));
  cy.get('[data-qa="address2"]').type(Cypress.env('Address2'));
  cy.get('[data-qa="country"]').select('Singapore');
  cy.get('[data-qa="state"]').type(Cypress.env('State'));
  cy.get('[data-qa="city"]').type(Cypress.env('City'));
  cy.get('[data-qa="zipcode"]').type(Cypress.env('Zipcode'));
  cy.get('[data-qa="mobile_number"]').type(Cypress.env('Mobile_number'));
  cy.get('[data-qa="create-account"]').click();
};

export function verify(){
  cy.get('b').should('contain', 'Account Created!');
  cy.get('[data-qa="continue-button"]').click();
  cy.get(':nth-child(10) > a').should('have.text'," Logged in as " + Cypress.env("Name"));
};

export function verifyAddress(){
  cy.get('#address_delivery > .address_firstname')
    .should('contain',Cypress.env("Name"))
    .should('contain',Cypress.env('Lname'))
  cy.get('#address_delivery > :nth-child(3)')
    .should('contain',Cypress.env('Company'))
  cy.get('#address_delivery > :nth-child(4)')
    .should('contain',Cypress.env('Address1'))
  cy.get('#address_delivery > :nth-child(5)')
    .should('contain',Cypress.env('Address2'))
  cy.get('#address_delivery > .address_city')
    .should('contain',Cypress.env('State'))
    .should('contain',Cypress.env('City'))
  cy.get('#address_delivery > .address_country_name')
   .should('contain','Singapore')
   cy.get('#address_delivery > .address_phone')
   .should('contain',Cypress.env('Mobile_number'))

   //Review order
   cy.fixture('data.json').then((items) => {
    // Call the addItemsToCart function with items loaded from data.json
    items.forEach((item) => {
      cy.log(item.item);
      // Trigger mouseover for the current item
      cy.contains(item.item).should('be.visible');
    });      
})
}

export function placeOrder(){
  cy.get('.form-control').type("Confirmed the Order");
  cy.get(':nth-child(7) > .btn').click();
}

export function Payment(){
  cy.get('[data-qa="name-on-card"]').type("Aladin");
  cy.get('[data-qa="card-number"]').type("482839048");
  cy.get('[data-qa="cvc"]').type("233");
  cy.get('[data-qa="expiry-month"]').type("12");
  cy.get('[data-qa="expiry-year"]').type("2023");

 
  cy.get('[data-qa="pay-button"]').click();
  cy.wait(1000);
  cy.contains("Congratulations! Your order has been confirmed!")
  .should("exist");

}