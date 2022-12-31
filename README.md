# Money-tracker

A simple budget-tracking application using Django and React.


## Table of content
- [Installation](#installation)
    - [Frontend](#frontend)
    - [Backend](#backend)
- [Features](#features)
- [Pages](#pages)
- [Links](#links)
  
## Installation

Clone the repository on local machine using git.

### Frontend
- Migrate to frontend folder.
- Make sure yarn is already installed on the system (Link for Yarn installation is given in Tools)
- Run `yarn install` for packages installation
- and `yarn start` to start the server
- Open `http://localhost:3000/` in any browser

### Backend
- Migrate to backend folder.
- Make sure pipenv installed on the system (Link for pipenv installation is given in Tools)
- Run `pipenv shell` in the terminal
- Run `pipenv install` to install packages
- Migrate to Core folder
- Run `python3 manage.py runserver`
- Open `http://127.0.0.1:8000/docs/` in browser for APIs schema in swagger


## Features
- Auth features including Login,Sigup Users using Token Authentication
- Friends features (Right now implemented on backend only)
- User can Create,Read and Update Transactions
- Transactions can have category and users
- Categories can be account specific (Right now CUD for Categories are only on backend)
- Users can Filter Transactions
- Informations about User's money are listed

## Pages
- Login and Signup
- Profile
- All Users
- All User involving Transactions
- Create and update Transactions

## Links
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
  `npm install --global yarn`
- [Pipenv](https://pypi.org/project/pipenv/)
  `pip install pipenv`
