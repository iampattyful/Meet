#!/bin/bash
set -e
set -x

npm install -D ts-node typescript @types/node
npm install pg dotenv
npm install -D @types/pg
npm install populate-env
npm install express
npm install -D @types/express
npm install -D nodemon
npm install express-session
npm install -D @types/express-session
npm install formidable @types/formidable
# npm start

# touch .gitignore
# echo 'node_modules' > .gitignore