# Where's my money?!

The project was created to help manage the home budget

## Table of contents

- [General info](#general-info)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [Technologies](#technologies)
- [Setup](#setup)
- [Status](#status)
- [Inspiration](#inspiration)

## General info

Application allows you to:

- create a profile account - sign up & log in
- add transactions (name, date, category, amount)
- add categories of transactions
- see list of all transaction for a given month
- filter transactions by months

## Deployment

| Environment | link                                  |
| ----------- | ------------------------------------- |
| development | https://whereismymoneysir-dev.web.app |
| production  | https://whereismymoneysir.web.app     |

## Screenshots

|                                                   View all your transactions and add new ones                                                    |                                                                Manage categories                                                                 |                                                                      Log in                                                                      |
| :----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="955" alt="Screenshot1" src="https://user-images.githubusercontent.com/109333068/231939911-d719bf24-edbb-4e4d-9306-95970d2fff1d.png"> | <img width="218" alt="Screenshot2" src="https://user-images.githubusercontent.com/109333068/231941047-e9015272-1a4a-4bcd-9a97-4e6a68d31aee.png"> | <img width="201" alt="Screenshot3" src="https://user-images.githubusercontent.com/109333068/231941089-f625b4a8-b3ea-43d2-82f8-48a33c3f7e7d.png"> |

## Technologies

Main:

- React
- js, html, css

Libraries:

- material-ui
- react-router-dom
- forimik
- dayjs
- firebase
- and many others

## Setup

Copy repository on your machine. To download all needed dependencies (see package.json to know what they are) type in command line in the repo's location:

```bash
npm install
```

To run application on your local machine type:

```bash
npm run start
```

You will need to change .env.sample file. You need to go to firebase website and create a new project there.

## Status

I work on this project in my spare time. It is possible that the screenshots here are not up to date - it is constantly changing. I really enjoy adding new features here and I treat this app as my code-sandbox. \
Hopefully, in the near future, me and my friends will be able to actually use this app to keep our private budgets in it.

## Inspiration

Credits for:

- [Shaun Pelling](https://github.com/iamshaunjp) - for an idea for this project and his excelent firebase tutorial. Thank you.
- [Ben Awad](https://github.com/benawad) - for his intuitive Formik FormFields.Thank you.
- And, of course as always - StackOverflow... :)
