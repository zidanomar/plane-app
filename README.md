# PERN STACK PLANE APP 🚀

## Run Locally

### Backend

Clone the project

```bash
  git clone https://github.com/zidanomar/plane-app.git
```

Go to the project directory

```bash
  cd plane-app
```

Setup Backend and Database

⚠️ Require sequelize-cli

```bash
npx install -g sequelize-cli
```

- go to backend directory `cd backend` and run `npm install`
- setup local database at

```bash
bash/backend/database/config.json
```

```bash
"development": {
    "username": DATABASE USER NAME,
    "password": DATABASE PASSWORD,
    "database": DATABSE NAME,
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
```

- go to `cd database` and run `sequelize:migration:all`

Start the server

```bash
  npm run dev
```

### frontend

- go to frontend directory `cd frontend` and run `npm install`
- run by executing `npm start`
