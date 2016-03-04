# End-to-end tests coding guide

End-to-end (E2E for short) tests are meant to test the behavior of your application, from start to finish.

While unit tests are the first choice for catching bugs and regression on individual components, it is a good idea to
complement them with test cases covering the integration between the individual components, hence the need for E2E
tests.

These tests use [Protractor](https://github.com/angular/protractor), which is a framework built for AngularJS
on top of [WebDriver](https://code.google.com/p/selenium/wiki/GettingStarted) to control browsers and simulate user
inputs. It uses the [Jasmine](http://jasmine.github.io) syntax.

## Good practices

- If you develop using an Agile methodology, ideally each user story should be covered by an E2E test verifying all
  acceptance factors
- If possible, avoid inter-dependencies between your E2E tests
- Run E2E tests on your integration server using different browsers, if possible

## Page objects

E2E tests should follow the *[Page Object](https://code.google.com/p/selenium/wiki/PageObjects)* pattern.

#### What is a page object?

A page object:

- Models the objects on a page under test:
  * *Properties* wrap page elements
  * *Methods* wraps code that interacts with the page elements
- Simplifies the test scripts
- Reduces the amount of duplicated code

If the UI changes, the fix only needs to be applied in one place.

#### How to define a page object

```js
// login.po.js
var LoginPage = function() {
  this.userName = element(by.input('login.userName'));
  this.password = element(by.input('login.password'));
  this.loginButton = element(by.css('Button[ng-click^="login"]'));
  this.logoutButton = element(by.css('Button[ng-click^="logout"]'));
  this.registerButton = element(by.css('Button[ng-click^="register"]'));
  this.greeting = element(by.binding("Welcome, {{currentBrewer.FirstName}}"));
  this.gravatarImage = element(by.tagName('img'));
};

module.exports = new LoginPage();
```

#### How to use a page object

```js
// login.spec.js
describe('Login', function () {
  var page;

  beforeEach(function () {
      browser.get('#/');
      page = require('./login.po.js');
  });
  
  it('should navigate to the register page when the register button is clicked', function () {
    page.registerButton.click();
    
    expect(browser.getCurrentUrl()).toContain('#/register');
  });
  
  it('should allow a user to log in', function () {
    page.userName.sendKeys('test_user');
    page.password.sendKeys('abc123');
    page.loginButton.click();
    
    browser.waitForAngular();
    expect(page.greeting.getText()).toContain('Welcome, Test User');
  });
});
```

## Credits

The page object part of this guide was freely inspired by this 
[presentation](https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ).
