#!/usr/bin/env bash

# ----------------------------------------------------------------------------------
# Combines coverage.json files generated by e2e and units & pushes them to coveralls
# ----------------------------------------------------------------------------------

npx istanbul-combine-updated \
  -d coverage \
  -p summary  \
  -r lcov \
  -r html \
  ./.cov_ganache.json \
  ./.cov_geth_insta.json \
  ./.cov_geth_auto.json \
  ./coverage/coverage.raw.json

  cat coverage/lcov.info | ./node_modules/.bin/coveralls
