# Research facility repository

## A-LabInsider homework task assignment for Full-stack Software Engineer role 

Project is separated into two independent `api` and `ui` sub-projects.

After installing dependencies by running `npm i` in both directories, DB can be seeded with an example data by running `npm run seed` in `api` directory. Number of records can be controller by the `COUNT` environmental variable.

Both projects can be started by running `npm start` in their respective directories.

### Notes:

- I've written the table component from the scratch, because `@material-ui/data-grid` was in alpha at the time;
- I've implemented pagination on the client side, since we're dealing with a manageable amount of facilities.

## DEMO:
[https://a-labinsider.razmadze.me/](https://a-labinsider.razmadze.me/)
