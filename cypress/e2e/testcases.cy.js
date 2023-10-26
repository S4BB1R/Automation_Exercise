import { login } from '../utils/functionutils'
import { addItemsToCart,successfulPageLoading,getCartpage , signup,verify,verifyAddress,placeOrder,Payment } from '../utils/functionutils'



describe('Interdependent Test Cases', () => {

  it('Verify that home page is visible successfully', () => {
    //step ::Navigate to url 'http://automationexercise.com'
    cy.visit("/")  
    //step::Verify that home page is visible successfully
    successfulPageLoading();
    //step:: Add products to cart
    // Read data from json 
    cy.fixture('data.json').then((items) => {
        // Call the addItemsToCart function with items loaded from data.json
        addItemsToCart(items);      
    });
    //step:: Add products to cart , cart page is displayed and proceed to checkout 
    getCartpage();
    //step :: Go for Registration 
    cy.get('.modal-body > :nth-child(2) > a > u').click();

    //signUp to 
    const email = `user${Math.floor(Math.random() * 1000000)}@yopmail.com`;
    signup(email);

    //Verify 'ACCOUNT CREATED!' and click 'Continue' button
    verify();

    //step:: Add products to cart , cart page is displayed and proceed to checkout 
    getCartpage();

    //Verify Address Details and Review Your Order
    verifyAddress();

    //Enter description in comment text area and click 'Place Order'
    placeOrder();

    //Enter payment details: Name on Card, Card Number, CVC, Expiration date
    //Click 'Pay and Confirm Order' button
    //Verify the success message 'Your order has been placed successfully!'
    Payment();
  });
});
