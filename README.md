
# QKart Frontend

QKart is an E-commerce application offering a variety of products for customers to choose from. 

During the course of this project,

• Implemented the core logic for authentication, shopping cart and checkout.

• Improved UI by adding responsive design elements for uniform experience across different devices.

• Utilized REST APIs to dynamically load and render data served by the backend server.

• Deployed website to Netlify.

![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/c40e73ad-6e1d-4a7c-b3c3-fd6c1a4d0e58)

**QKart Component Architecture**

![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/1f77e309-5fa0-4b37-99ea-1538afcdc8bc)

**QKart Shopping Interface (Products page)**


## Added Registration feature
• Implemented logic and used backend API to get the registration feature ready.

• Added validation for the register form user input values to display informative error messages.


## Implemented registration-login flow and set up routing

• Used React Router library to set up routes in the application and redirect customers to appropriate pages.
• Added UI and logic to get the Login page ready.
• Stored user information at client side using localStorage to avoid login on revisit.
![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/1746e8ae-a85b-4466-b1d4-0d05f33ad098)

**Request-response cycle for QKart User signup and login**

![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/4f1f92ae-e236-44d3-b6c6-8ece7ab1b900)

**User flow on website for signup and login**

## Displayed products and implemented search feature

• Utilized the useEffect() hook to fetch products data after DOM is rendered for faster page loading.

•Added search bar to display only on the Products page’s header and implemented search logic.

• Implemented debouncing for improved UX and reduced API calls on search.


## Added shopping cart and implemented checkout flow

• Added Cart to Products page and made it responsive.

• Made authenticated POST API calls to implement Cart logic.

• Rendered Cart with differing designs in Products page and Checkout page using conditional rendering.

• Implemented UI and logic to add and select new addresses.

![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/e68105e4-5d65-4e30-8e41-35f83318081f)

**Products page UI with responsive Cart design (Left: Desktop, Right: Mobile)**

![image](https://github.com/AKrishnaKundan/QKART_FRONTEND/assets/93312488/aea6aeb0-d7e0-447c-82b6-bfec0f6aaa00)

**QKart Checkout page**

## Deployed the QKart website
• Deployed the QKart React app to Netlify.

• Configured Netlify to support visiting any sub pages directly as React is a single page application.

**Frontend**: https://krishnakundan-qkart-frontend.netlify.app


