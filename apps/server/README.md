# Run the back-end

To run the back-end, first, you need to go into this folder `server` with your terminal(cmd).

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
