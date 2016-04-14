# Managing multiple build environments

Most applications pass through several environments before they are released in production. These environments often
include: a local development environment, a shared development environment, a system integration environment, a user
acceptance environment and a production environment.

You may then need adjust your application configuration depending of the target environment, for example changing the
log verbosity level and the backend server URL.

By default, when running the `gulp build` task, the target is the `production` environment.
You can change it if needed in the `gulpfile.config.js` file by modifying the value of `defaultBuildEnvironment`.

When building your application, you can also force a specific environment by using the flag `--environment <name>`.

By doing so, the configuration defined in `main.constants.ts` corresponding to the specified environment will be used,
as long a the `environment` variable has a key with that name defined.

By default it looks like this:
```js
  let environment = {
    local: {
      debug: true,

      // REST backend configuration, used for all web services using restService
      server: {
        url: '',
        route: 'api'
      }
    },
    production: {
      debug: false,
      server: {
        url: '',
        route: 'api'
      }
    }
  };
```

You can see there that 2 environments are already defined for you:

- `local`: used for `gulp serve` for local development
- `production`: used when building your app with `gulp build`

You can add whatever environment you need in this file and adjust its settings accordingly.
For example if you need to add a specific configuration for our continuous integration build, you can do it like this:
```js
  let environment = {
    local: {
      debug: true,

      // REST backend configuration, used for all web services using restService
      server: {
        url: '',
        route: 'api'
      }
    },
    integration: {
      debug: true,
      server: {
        url: 'https://my-ci-backend-server.com',
        route: 'api'
      }
    },
    production: {
      debug: false,
      server: {
        url: '',
        route: 'api'
      }
    }
  };
```

Then you can build your app using the command `gulp build --environment integration`.

You may also have noticed the `server` object, that has 2 properties `url` and `route`. It allows you to setup your
REST API root URL, that will be used by all your API calls made using the provided `restService`.

If you leave empty the server URL, `localhost` will be assumed by default meaning that your REST API runs on the same
domain as your application (which is always true when using `gulp serve` as it uses an [API proxy](api-proxy.md)).
