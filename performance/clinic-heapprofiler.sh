#!/bin/sh

# Read for more informations: https://www.npmjs.com/package/clinic

URL=localhost:3001

npx clinic heapprofiler \
--autocannon [ $URL -m GET -W [-c 1 -d 3] -c 100 -d 10 -p 10 ] \
-- node dist/main/server.js
