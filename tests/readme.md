* To install mocha `npm install mocha --save-dev`, this will put mocha in `devDependencies` section instead of in `dependencies`. This is recommended because testing is only needed locally and at development-time —but not once deployed.

* mocha uses BDD syntax

* To `nodemon` your tests":
`nodemon --exec "npm test"`, use double-quotes (") for better compatibility with windows, just remember to escape the double-quotes (\"). This can be simplified even further by writing the previous script in the `package.json`'s `scripts` section.
