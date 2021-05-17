#### Introduction
This project is to provide all RESTFUL APIs & do some processes in backend for VH CRM Application

It is using:
* ExpressJS, NodeJS, with Sequelize ORM
* MySQL (v8.x)
* https://www.npmjs.com/package/config: organizes hierarchical configurations
* morgan: HTTP request logger middleware
* @hapi/joi: Object schema description language and validator for JavaScript objects

#### Run migration
* Install globally sequelize-cli: https://www.npmjs.com/package/sequelize-cli
* `cd database`
*  Run `sequelize db:migrate --config '../config/default.json' --env database` to create tables
*  Run `sequelize db:seed:all --config '../config/default.json' --env database` to seed data
*  Example to seed one file: Ex: `sequelize db:seed --seed ./seeders/01-department.js --config '../config/default.json' --env database`

#### Project Structure
* Server starts from bin/www.js
* `src` folder contains all logic code
* `database` folder contains migrations, models & seeders
* `config` folder contains config files, refer to https://github.com/lorenwest/node-config/wiki/Configuration-Files
* `logs` folder contains access log to server


#### Run local
* check config in file `config/default.json`, create database as in config file
* run migration
* run `npm install -g nodemon`
* run `npm install`
* run `npm run dev`

#### Verify in local
* use Postman to call api: `http://localhost:3000/api/login`

#### Run on server
* Create production config file at `config/production.json`
* Run `NODE_ENV=production npm start`
