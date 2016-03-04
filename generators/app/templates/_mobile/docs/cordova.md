# Using Cordova

TODO: introduction, explain how to specify cordova version and use commands pass-through

## Common tasks

### Restoring platforms and plugins after a checkout

`cordova prepare`

TODO: gulp command

### Adding a platform

`cordova platform add [ios|android|windows] --save`

TODO: gulp command

### Adding a plugin

`cordova plugin add [plugin-name] --save`

TODO: gulp command

### Running the application

`gulp build && cordova run [ios|android|windows] [--device]`

TODO: gulp command

### Packaging and signing apps

TODO

### Clean/refresh

TODO: gulp command

## Icon and splash screen

In order to simplify icon and splash screen creation for each device/OS, you can use this command (make sure the ionic
tool is installed beforehand with `npm install -g ionic`):
```
ionic resources
```

It will generate iOS and Android assets based on the files `icon.png` (which should be 1024x1024) and `splash.png`
(which should be 2208x2208), using the Ionic servers. It will also edit your `config.xml` file accordingly.

You can also use `.psd` or `.ai` files as source, see the
[Ionic resources](http://ionicframework.com/docs/cli/icon-splashscreen.html) documentation. It also contains
icon/splash screen templates to help you design your assets.

In addition, if you want to manage these assets manually, you should look at the
[Cordova](https://cordova.apache.org/docs/en/latest/config_ref/images.html) documentation for additional information.

To avoid the "stretched" splash screen effect on Android, you can set this preference in your `config.xml`:
```xml
<preference name="SplashMaintainAspectRatio" value="true"/>
```

You can also use [9-patch images](http://developer.android.com/tools/help/draw9patch.html) to further control how your
images should be stretched.

## Using improved web views

TODO: explain why

### Using Crosswalk on Android

TODO: benefits, how to, configuration

### Using WKWebView on iOS

TODO: benefits, how to

## Security considerations

On a new project, all domains are allowed for loading resources by default.

Before building for production, you should consider restricting domain access to improve your app security.
You can find documentation on this regard in the 
[Cordova whitelist guide](https://cordova.apache.org/docs/en/latest/guide/appdev/whitelist/index.html).

To go further in security considerations, you should also take a look at your
[Content Security Policy](https://github.com/apache/cordova-plugin-whitelist#content-security-policy) specified in
`index.html`.

By default, the CSP used allows everything (e.g. CSS, AJAX, object, frame, media, etc) except: 
- CSS only from the same origin and inline styles,
- Scripts only from the same origin and inline scripts, and eval()

For additional general security information, you can take a look at the
[Cordova security guide](https://cordova.apache.org/docs/en/latest/guide/appdev/security/index.html)

## Development helpers

### Self-signed HTTPS certificate issues

On iOS, network request to server using a self-signed HTTPS certificate is not allowed, for security reason.
You can disable this behavior in development builds with this command: 

`gulp patch:ios-https`

This will patch your `AppDelegate.m` file to allow untrusted HTTPS certificate in debug builds.

**DO NOT USE THIS FOR PRODUCTION BUILDS!**  It may result in your app being rejected by Apple.
