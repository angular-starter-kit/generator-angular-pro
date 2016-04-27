import app from 'main.module';
import {IApplicationConfig} from 'main.constants';
import {ILogger, LoggerService} from 'helpers/logger/logger';

/**
 * Displays the about screen.
 */
export class AboutController {

  version: string;

  private logger: ILogger;

  constructor(logger: LoggerService,
              config: IApplicationConfig) {

    this.logger = logger.getLogger('about');
    this.version = config.version;

    this.logger.log('init');
  }

}

app.controller('aboutController', AboutController);
