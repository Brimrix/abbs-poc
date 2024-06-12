# Area Based billing system

## Tech stack

Backend &#8594; Django & DRF

Frontend &#8594; React JS

Database &#8594; Postgres(SQLite for now)

## Setup Instructions

### Required dependencies
 - Install [pdm](https://pdm-project.org/en/latest/) for backend **&** [npm](https://www.npmjs.com/) for frontend project management.

   After installation of tools, it's time to install project dependicies by performing the following steps.

- Run `pdm install` to install all the backend dependecies
 - Run `npm install` to install all frontend packages.

### Intializing Database
Run `pdm run manage.py migrate` to create a database(Different steps when using Postgres) and apply all migrations.

Run `pdm run manage.py generate` to create a super user. `superuser@abbs.com` & `change_me`.

### Launch dev server

 - All django commands can be run by prepending `pdm run <django_management_commands>`.
   Run `pdm run manage.py runserver` to start the backend server, this command will start the development server at [localhost:8000](http://localhost:8000).
- Don't see anything ?  That's becuase the frontnend server is not launched yet. To start frontend dev server, run `npm run dev`.

## Formatting
- We use [pre-commit](https://pre-commit.com/) to ensure code conforms to certain quality standards. After cloning the repo we need to enable pre-commit by doing `pdm run pre-commit install`
- For frotnend we will stick with [Airbnb Style guide](https://github.com/airbnb/javascript).
