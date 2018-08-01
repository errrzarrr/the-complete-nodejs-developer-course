* To install mocha `npm install mocha --save-dev`, this will put mocha in `devDependencies` section instead of in `dependencies`. This is recommended because testing is only needed locally and at development-time —but not once deployed.

* mocha uses BDD syntax

* To `nodemon` your tests":
`nodemon --exec "npm test"`, use double-quotes (") for better compatibility with windows, just remember to escape the double-quotes (\"). This can be simplified even further by writing the previous script in the `package.json`'s `scripts` section. Call it `test-watch` and run it `npm run test-watch`

* An assertion library: For `expect` ( v1.20.2) [go to original &older versions documentation](https://github.com/mjackson/expect) --yes, it was donated to another organization and backwards-compatibility was broken.

* `rewire` (or `sinon`) are libraries for dependency-injection & "monkey-patching" unit tests. They are used mainly when 
    1. You need to test a function that shouldn't be called, isn't that easy to prove it worked or simply shouldn't be called at all --i.e. writing to DB or sending an email to a customer.
    2. To test those functions that makes use of helper/utility functions in another submodule. Those utility functions get substituted (spied/mocked) by `app.__set__('db', spiedDb);`. In this case, `app` is `rewire`d instead of `require`d. `app` is the code which contains the functions from the the helper/utility library (`db` in this case) we want to test if they are called.