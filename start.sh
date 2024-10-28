#!/bin/bash -e

npm run db:push
npm run db:seed

node server.js