#!/bin/bash

set -ex

cd ../

npm link docs/node_modules/react

cd -

yarn run next dev
