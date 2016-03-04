# Unit tests coding guide

The main objective of unit tests is to detect regressions and to help you design software components. A suite of
*good* unit tests can be *immensely* valuable for your project and makes it easier to refactor and expand your code.
But keep in mind that a suite of *bad* unit tests can also be *immensely* painful, and hurt your development by
inhibiting your ability to refactor or alter your code in any way.

## What to test?

We thought this over into multiple projects, and the general consensus is to cover everything that is not a
controller/view of your app with unit tests. At least, all business logic code must be tested: services, helpers,
models. Directives should also be covered by unit tests.

Then why not the controller/views? Since your controllers should not contain business logic (as it should be in 
services), then it has more meaning to use [End-to-end tests](e2e-tests.md) to test their behavior. It will also avoid
the need for painful and useless mocks, since most likely your controller will aggregate many other components.

## Good practices

- Name your tests cleanly and consistently
- Do not only test nominal cases, the most important tests are the one covering the edge cases
- Each test should be independent to all the others
- Avoid unnecessary assertions: it's counter-productive to assert anything covered by another test, it just increase
  pointless failures and maintenance workload
- Test only one code unit at a time: if you cannot do this, it means you have an architecture problem in your app
- Mock out all external dependencies and state: if there is too much to mock, it is often a sign that maybe you
  should split your tested module into several more independent modules
- Clearly separate or identify these 3 stages of each unit test: *prepare*, *act* and *assert*
- When you fix a bug related to unit-tested module, add a test case to prevent regression for this bug

## Pitfalls

- Sometimes your architecture might mean your code modify static variables during unit tests. Avoid this if you can, 
  but if you can't, at least make sure each test resets the relevant statics before and after your tests.
- Don’t unit-test configuration settings
- Improving test coverage is good, but having meaningful tests is better: start with the latter first, and **only
  after essential features of your code unit are tested**, your can think of improving the coverage.
