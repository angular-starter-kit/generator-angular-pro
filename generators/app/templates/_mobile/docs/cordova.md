# Using Cordova

[Cordova](https://cordova.apache.org/docs/en/latest/) is the platform bridge allowing you to build mobile applications
using web technologies.

It comes with its own [CLI](https://github.com/apache/cordova-cli) to manage compilation, platforms and plugins that
is usually installed globally.

However, we chose to use a gulp pass-through for Cordova CLI commands, to allow version locking in `package.json`.
This way, you can use a different Cordova CLI version for each of your mobile projects, independently of the globally
installed version. This is also necessary as new updates often break project compilation.

You can manage Cordova CLI updates like any [NPM package](updating.md).

If you do not want this behavior and prefer using your global Cordova install, simply run:
```sh
npm remove cordova --save-dev
npm install -g cordova
```
The gulp tasks will then use the global version instead of a local one.

## Platform notes

Each Cordova platform may require specific tools to be installed for the command to work properly.
You can check anytime if your system meets the requirements for a given platform with:
```sh
gulp cordova --command="requirements <ios|android>"
```

### iOS

To build the iOS version, you need to install [XCode](https://itunes.apple.com/app/xcode/id497799835).

To allow launching your app in simulator or device from command line, you need also:
```sh
npm install -g ios-sim
npm install -g ios-deploy
```

See [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support)
for additional information.

### Android

To build the Android version, you need to install the
[Android SDK](http://developer.android.com/sdk/installing/index.html).

See [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support)
for additional information.

## Common tasks

### Restoring platforms and plugins after a checkout
```sh
gulp cordova:prepare
```

This will restore all your platforms and plugins according to your `config.xml` file.

### Adding a platform
```sh
gulp cordova --command="platform add <ios|android> --save"
```

### Adding a plugin
```sh
gulp cordova --command="plugin add <plugin-name> --save"
```

### Running the application
```sh
gulp run:<ios|android> [--device]
```

Run your application in specified platform emulator or device if you add the `--device` option.

### Packaging and signing apps

To create properly signed application packages for store publication, you have to configure your app provisioning in
the `build.json` file.

Here is an example configuration:
```json
{
  "ios": {
    "release": {
      "developmentTeam": "your_team_id",
      "codeSignIdentity": "iPhone Distribution"
    }
  },
  "android": {
    "release": {
      "keystore": "sign/your_android.keystore",
      "storePassword": "",
      "alias": "your_key",
      "password" : "your_password",
      "keystoreType": ""
    }
  }
}
```
 
This information will be used by the `gulp cordova:release` task to generate production packages.

You can find more detailed documentation in the
[iOS signing guide](https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#signing-an-app) or
[Android signing guide](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#signing-an-app).

### Updating plugins

To update a single plugin:
```sh
gulp cordova --command="plugin update <plugin_name> --save"
```

Cordova does not include a mass update mechanism for plugins, but you can use the `cordova-check-plugins` tool:
```sh
npm install -g cordova-check-plugins
```

Then run the following commands to perform an interactive update of outdated plugins and save the new versions:
```sh
cordova-check-plugins --update=interactive
gulp cordova --command="plugin save"
```

### Updating platforms
```sh
gulp cordova --command="platform update <ios|android> --save"
```

## Icon and splash screen

In order to simplify icon and splash screen creation for each device/OS, you can use this command (make sure the ionic
tool is installed beforehand with `npm install -g ionic`):
```sh
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

To improve performance and/or compatibility of your app, it is possibly to customize the web view used by Cordova.
This is especially useful for devices running Android 4.3 and older, as they use a slow, outdated web view.

By default we enabled both Crosswalk and WKWebView.

### Using Crosswalk on Android

The [Crosswalk plugin](https://github.com/crosswalk-project/cordova-plugin-crosswalk-webview) allows you to embed a 
Chromium-based web view in your app instead of the Android system web view.
 
This allows to greatly improve compatibility and performance on systems using older or customized web views, and use
modern browser APIs, at the cost of increased app size and memory footprint.

To add or remove Crosswalk:
```sh
gulp cordova --command="plugin <add|remove> cordova-plugin-crosswalk-webview --save"
```

By default, build commands will generate separate packages for x86 ad ARM architecture, to reduce download sizes.
This behavior can be change to build a single package by modifying this line in `config.xml`:
```xml
<variable name="XWALK_MULTIPLEAPK" value="true" /> <!-- Change to "false" to build single APK -->
```

### Using WKWebView on iOS

The [WKWebView plugin](https://github.com/apache/cordova-plugin-wkwebview-engine) makes use of the new `WKWebView`
instead of `UIWebView`, enabling a huge increase in JavaScript performance.

The new web view is only active on iOS 9+ (with a fallback for older version), and has some limitations (see the
plugin doc on github for more details), the biggest one being:

- **To perform any XHR request in your app,
  [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) must be enabled on your server.**

To add or remove WKWebView:
```sh
gulp cordova --command="plugin <add|remove> cordova-plugin-wkwebview-engine --save"
```

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
```sh
gulp patch:ios-https
```

This will patch your `AppDelegate.m` file to allow untrusted HTTPS certificate in debug builds.

**DO NOT USE THIS FOR PRODUCTION BUILDS!**  It will result in your app being rejected by Apple.

### Android build behind corporate proxy with custom SSL certificate

If you use a corporate proxy that intercepts HTTPS requests with a custom certificate, you may encounter issues like
`peer not authenticated` errors. To fix this, you need to add this certificate to the Java trusted certificate store.

Make sure you have write access to your JRE (you may need `sudo` on Linux and OS X), then use the `keytool` utility to
import it:
```sh
keytool -importcert -alias <an_alias> -keystore <java_home>/jre/lib/security/cacerts -file <certificate_file>
```

The default password for the `cacerts` file is `changeit`.

On OS X >10.9, you can use this command to find your java home:
```sh
/usr/libexec/java_home
```
The `cacerts` file is then located under there in `jre/lib/security`
