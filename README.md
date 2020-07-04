# Band Website

**Simple site using HTML/CSS/Vanilla JS and a Node JS Web Server to expand my web development abilities**

## Skills Developed
Vanilla JS - Created a functioning store and shopping cart for mock band merchandise. Implemented the ability to add / remove items from the users cart and complete the purchase. 

Node JS Web Server - Created a basic web server to handle GET requests to surface the webpages of the site and a POST request to handle purchases of items in the cart. 

Stripe Checkout API - Integrated with Stripe Checkout API to process payments for purchases made from the cart. Used Public and Private Keys in order to make secure calls to my stripe account.

### Route Implemented 
```
POST: /purchase 
Purpose:Processed Payments using Stripe API
Example Body
{  
   "stripeTokenId":"tok_123456abcedefg",
   "items":[
      {
         "id":"4",
         "quantity":"2"
      },
      {
         "id":"2",
         "quantity":"1"
      },
      {
         "id":"5",
         "quantity":"1"
      }
   ]
}

Example Response
{message: "Succesfully Purchased Items"}
```

## Images

### Store

Empty Cart
![Empty Cart](/readme-resources/Site_Store_EmptyCart.PNG)

Populated Cart
![Populated Cart](/readme-resources/Cart_Populated.PNG)

Cart Payment
![Cart Payment](/readme-resources/Cart_Payment.PNG)
 
 ### Home
![Cart Payment](/readme-resources/Site_Index.PNG)

 ### About
![Cart Payment](/readme-resources/Site_About.PNG)