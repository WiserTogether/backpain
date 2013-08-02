Backpain
========

Example application of how to structure and leverage WiserTogether code.

Building
--------

To get started developing Chiropractor you must first run two commands to
install all of the dependencies:

    npm install
    bower install

In order to compile the Chiropractor code for release you must run:

	grunt

Which will generate `chiropractor.js` as well as `chiropractor.min.js` in the
root of the project. Whenever you wish to run this command, please be sure to
increment the version defined in `package.json` as well as `bower.json`.

Running
-------

In order to see your web application at work run this command:

    grunt devserver

And then go to `http://localhost:8888`

Tests
-----

There are two ways to run tests:

	npm test

Or if you want more control over how your tests are run (such as continuous
testing with auto-running tests on file changes you can run:

	./node_modules/.bin/karma start --dev --browsers Chrome,PhantonJS
