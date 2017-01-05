import app from 'main.module';
import {ILogger, LoggerService} from 'helpers/logger/logger';
import {IApplicationEnvironment} from 'main.constants';

const analyticsScriptUrl = '//www.google-analytics.com/analytics.js';

interface IWindowWithAnalytics extends ng.IWindowService {
  ga: any;
}

/**
 * Analytics service: insert Google Analytics library in the page.
 */
export class AnalyticsService {

  private logger: ILogger;
  private analyticsAreActive = false;

  constructor(private $window: IWindowWithAnalytics,
              private config: IApplicationEnvironment,
              logger: LoggerService) {

    this.logger = logger.getLogger('analyticsService');

    this.init();
  }

  /**
   * Tracks a page change in google analytics.
   * @param {String} url The url of the new page.
   */
  trackPage (url: string) {
    if (this.analyticsAreActive) {
      let urlWithoutParams = url;
      let split = url.split('?');
      if (split.length > 1) {
        urlWithoutParams = split[0];
      }
      this.$window.ga('send', 'pageview', urlWithoutParams);
    }
  }

  /**
   * Sends a track event to google analytics.
   * @param {String} category The category to be sent.
   * @param {String} action The action to be sent.
   * @param {String=} label The label to be sent.
   */
  trackEvent (category: string, action: string, label?: string) {
    if (this.analyticsAreActive) {
      this.$window.ga('send', 'event', category, action, label);
      let logMessage = 'Event tracked: ' + category + ' | ' + action;
      if (label) {
        logMessage += ' | ' + label;
      }
      this.logger.log(logMessage);
    }
  }

  private init(): void {
    if (this.config.googleAnayticsId !== null) {
      this.createGoogleAnalyticsObject(this.$window, document, 'script', analyticsScriptUrl, 'ga');
      this.$window.ga('create', this.config.googleAnayticsId, 'auto');
      this.analyticsAreActive = true;
    }
  }

  private createGoogleAnalyticsObject(i: any, s: any, o: any, g: any, r: any, a?: any, m?: any) {
    i.GoogleAnalyticsObject = r;
    i[r] = i[r] || function () {
      (i[r].q = i[r].q || []).push(arguments);
    };
    i[r].l = new Date();
    a = s.createElement(o);
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  }
}

app.service('analyticsService', AnalyticsService);
