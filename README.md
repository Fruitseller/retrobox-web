# retrobox-web

[![Build Status](https://travis-ci.org/Fruitseller/retrobox-web.svg?branch=greenkeeper%2Finitial)](https://travis-ci.org/Fruitseller/retrobox-web)
[![Greenkeeper badge](https://badges.greenkeeper.io/Fruitseller/retrobox-web.svg)](https://greenkeeper.io/)

React app that lets you write notes for your retrospective and stores them in a
firebase instance.

## Getting Started

To use your own retrobox you need a firebase database and google authentication enabled.

### Prerequisites

You need your firebase config as env variables to start the react app.

```
REACT_APP_API_KEY=<YOUR_DATA>
REACT_APP_AUTH_DOMAIN=<YOUR_DATA>
REACT_APP_DATABASE_URL=<YOUR_DATA>
REACT_APP_PROJECT_ID=<YOUR_DATA>
REACT_APP_STORAGE_BUCKET=<YOUR_DATA>
REACT_APP_MESSAGING_SENDER_ID=<YOUR_DATA>
```

### Installing

```
yarn install
yarn start
```


## How to work with this app

This is a simple create-react-app so you can find all tips [here](README.React.md).