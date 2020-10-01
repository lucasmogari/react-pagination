#!/bin/bash

set -ex

cd ../

npm link demo/node_modules/react

cd -

yarn run next dev
