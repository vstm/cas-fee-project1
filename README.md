# CAS FEE Project1

This is the first project of the CAS FEE 2019. The conditions where to use no
frameworks and few libraries (mostly templating).

## Constraints of the project

- No SPA framework was allowed (vue, react, angular)
- No design framework was allowed (bootstrap, material)
- A templating library had to be used (handlebars)

## Running it locally

To run the project locally you need to use at least version **v12.1.0**. The older
versions might not be supported (the Code does not yet run with lts/dubnium 
v10.15.x)

To run it locally you have to install the depnedencies first with the following
command:

    npm ci

After that, you can start the porject with

    npm start

It will then open a server which can be accesed with http://localhost:3000

## Online demo

You can test it online here: https://project1.cas-fee.svetsch.ch/ - it does not have authentication yet and all messages are visible for anyone. Please don't write nasty messages :)

## Project structure

Here is an overview of where to find what, unimportant stuff ommited for brevity.

- root
   - controller: Backend controller
   - model: Backend model (Todo model and Todo repository/model)
   - public: Frontend assets
      - bl: Business layer (model)
      - dl: Data layer (persistence, repsotiory)
      - services: Misc services (but only http for the moment)
      - ui: Frontend controllers
      - The stylesheets and HTML files are also in this directory
   - routes: Backend routes
   - app.js: Bootstrapping code

## External dependencies

- moments.js
- handlebars
- express
- nedb
- google material icons

## Meta

Here I collect some non-technical general points or todos with regards to my project1-experience.

### Learnings

- I have not that much experience in structuring CSS code, I don't have a system to organize it,
- I started early with the "application" code but put of the styling until later. It took a lot of time and I'm not happy with it.
  I tried to mimick the material design guidelines but it doesn't look as smooth as the original. So I think I'll have to
  invest more time thinkering around with the visual design aspects.
- Web Application design and Webdesign (for "brochure" websites) are different things
- Use kebab-case insead of CamelCase for filenames

### TODOs

- Refactoring `model/todo.js` so the class has a single responsibility. At the moment it's a model but it also does validation.
   - On the bright side: at least it has validation
- Maybe making it compatible with older node versions (.mjs extension for module loading).
- No datepicker used yet, it's all browser-default 
- Browser testing (tested only in firefox and chrome)
- This was more of a pipe-dream: I wanted to add a HSR themed style. Didn't happen for time-reasons.
- At the moment the store has a hard dependency on nedb, this could be abstracted so that mongodb could be used.

### Good stuff

- My MVC design was mostly on point. Surprised the heck out of me.
- I startet early so I didn't have to do a death-march at the end