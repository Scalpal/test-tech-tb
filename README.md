# Technical test for The Bradery

## Start with the project

- Launch your terminal and go into a folder where you want the project to be cloned into
- Run this command : `git clone https://github.com/Scalpal/test-tech-tb.git`

There you go, the project is cloned into your pc.

Now you can go into `/apps` folder.

## Stack used

### Front-end

The front-end was developed using NextJS. You can found the client-side in the `/apps/client` folder.

### Back-end

The back-end was developed using NodeJS and Express. You can found the API in the `apps/server` folder.

### Database

The database management system used here is PostgreSQL. A SQL script (`db.sql`) is provided so you can create the database easily.

## Main features

### Users

- Authentication system (Register - Login - Logout) using JWT

### Cart

- Product handling (Add - Remove) using the local storage

### Payment

- Payment using a credit card that has to be valid (a validation is done before being able to pay)

### Orders

- You can make orders as long as there's enough product in stock. A row will be added in the database with the total price and the products bought.
- If you're logged in, you will be able to see the orders you've done here : `http://localhost:3000/orders`
