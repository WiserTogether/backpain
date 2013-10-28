Backpain
========

[![Build
Status](https://travis-ci.org/WiserTogether/backpain.png?branch=master)](https://travis-ci.org/WiserTogether/backpain)

Example application of how to structure and leverage WiserTogether code.

Usage and keeping up to date
----------------------------

In order to use this project, you should first create your own repository, and clone it locally for work. Then,
run the following commands to add a secondary remote and to merge in code from the remote. It is important to note
that these commands will generate a merge commit, which is necessary to ensure that you do not have to continue
re-resolving conflicts

    git remote add backpain git@github.com:WiserTogether/backpain.git
    git pull backpain master


Building
--------

To get started you will need to install all of the dependencies:

    npm install
    bower install

In order to compile the code for release you must run:

    ./node_modules/grunt-cli/bin/grunt

Running
-------

In order to see your web application at work run this command:

    ./node_modules/grunt-cli/bin/grunt devserver

And then go to `http://localhost:8888`

Alternatively Run Method
-------

To run with autocompile and jshint you can use this command:

./node_modules/grunt-cli/bin/grunt server

To test the optimized version:

http://localhost:8888/index.html

To test the development version:

http://localhost:8888/dev.html


Tests
-----

There are two ways to run tests:

	npm test

Or if you want more control over how your tests are run (such as continuous
testing with auto-running tests on file changes you can run:

	./node_modules/.bin/karma start --dev --browsers Chrome,PhantomJS



