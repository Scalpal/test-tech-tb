# Run the back-end

To run the back-end, first, you need to go into this folder `server` with your terminal(cmd) : `cd server`.

Now that you're inside this folder :

Before running any command, you will need to setup your environment file (`.env`) first, it should look like this :

```js
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

SECURITY_JWT_SECRET=
SECURITY_PASSWORD_PEPPER=
```

Don't worry, I left you a `.env.example` file for you in case you're lost on what to do.

Next, you have to create an empty POSTGRES database and fill the `.env` according to it.

Once you have you're empty POSTGRES database, you can now run the SQL script `db.sql` I left you here : `apps/server/src/db/db.sql` to create the tables in the database with some datas

You can now run these command following the order :

- Run this command : `npm i` to install all the dependencies
- Run this command : `npm run start` to start the server
- Now if you want to do API calls on this API, you just have to follow this URL example : `http://localhost:3001/[route]`
- Voila ! You now know how to setup and use this API !

## Endpoints

### Users

#### Authentication

- `POST /api/register` - Registers a new user

This route :

- requires some parameters. Here's an example :

```json
{
	"firstName": "John",
	"lastName": "Smith",
	"email": "john@smith.com",
	"password": "MyNameIsJohn123!*"
}
```

- `POST /api/login` - Logs in a user

This route :

- requires some parameters. Here's an example :

```json
{
	"email": "john@smith.com",
	"password": "MyNameIsJohn123!*"
}
```

It returns a JWT used to maintain user session.

### Orders

#### Methods

#### GET

- `GET /api/order` - Get the logged user orders

This route :

- only needs the logged user JWT sent through headers.

It returns all the detailed orders made by the logged user.

#### POST

- `POST /api/order` - Create an order

This route :

- requires some parameters. Here's an example :

```json
{
	"card": {
		"cardNumber": "4111111111111111",
		"cardValidity": "09/29",
		"cardCryptogram": "098",
		"cardHolder": "test"
	},
	"cart": [
		{
			"id": 2,
			"name": "Black jean",
			"price": 49.99,
			"quantity": 5
		}
	]
}
```

### Products

#### Methods

#### GET

- `GET /api/products` - Get all the products

This route :

- don't need parameters.
- However, it accepts a `search` query parameter used to search a product by his name. Here's an example : `/api/products?search=jean`.

It returns all the products. If a `search` query parameter is sent, it will return only the products that contains the value of `search`.
