# API proxy

Usually when working on a web application you consume data from custom-made APIs.

To ease development with our development server integrating live reload while keeping your API calls working, we also
have setup an API proxy to redirect API calls to whatever URL and port you want. This allows you:

- To develop frontend features without the need to run an API backend locally
- To use the development server without [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) issues
  when making API calls

## How to configure

In the root folder you will find a `gulpfile.config.js`, containing the API proxy configuration.

The interesting part is there:
```js
exports.backendProxy = {
  context: '/api',
  options: {
    pathRewrite: { '^/api' : '' },
    target: 'http://api.icndb.com',
    changeOrigin: true
  }
};
```

This is where you can setup one or more proxy rules.

For the complete set of options, see the `http-proxy-middleware`
[documentation](https://github.com/chimurai/http-proxy-middleware/).

### Corporate proxy support

To allow API calls redirection through a corporate proxy, you will also find a `corporateProxyAgent()` function
in the gulp configuration file. By default, this method configures a corporate proxy agent based on the 
`HTTP_PROXY` environment variable, see the [proxy documentation](proxy.md) for more details.

If you need to, you can further customize this function to fit the network of your working environment.
