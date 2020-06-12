import { MFLoggerLevel } from './enums/mf-logger-level.enum';
/**
 * Logger to use in library instead of console in order to diplay logs or not depending on log level activation
 */
export class MFLogger {
  /**
   * log level to use (defaults to error)
   * Can be manually set.
   */
  static loggerLevel: MFLoggerLevel = MFLoggerLevel.ERROR;

  /**
   * Displays log if level is at least error
   *
   * @param args logs
   */
  static error(...args: any[]) {
    if (MFLogger.loggerLevel >= MFLoggerLevel.ERROR) {
      // tslint:disable-next-line: no-console
      console.error(...args);
    }
  }

  /**
   * Displays log if level is warning
   *
   * @param args logs
   */
  static warn(...args: any[]) {
    if (MFLogger.loggerLevel >= MFLoggerLevel.WARN) {
      // tslint:disable-next-line: no-console
      console.warn(...args);
    }
  }
  /**
   * Displays log if level is at least debug
   *
   * @param args logs
   */
  static debug(...args: any[]) {
    if (MFLogger.loggerLevel >= MFLoggerLevel.DEBUG) {
      // tslint:disable-next-line: no-console
      console.debug(...args);
    }
  }

  /**
   * Displays log if level is at least debug_library
   *
   * @param args logs
   */
  static debugLibrary(...args: any[]) {
    if (MFLogger.loggerLevel >= MFLoggerLevel.DEBUG_LIBRARY) {
      // tslint:disable-next-line: no-console
      console.debug(...args);
    }
  }
}
