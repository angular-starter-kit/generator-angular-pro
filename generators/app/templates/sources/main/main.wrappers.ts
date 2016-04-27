import app from 'main.module';

/**
 * Wraps external global libraries into AngularJS injection system.
 * global window: false
 */
app.constant('_', _); // Lodash
