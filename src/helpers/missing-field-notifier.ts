import { MFLogger } from '../mf-logger';

/**
 * Class providing a static method displaying warning when a property is missing in model
 */
export class MissingFieldNotifier {
  /**
   * List of properties already warned
   */
  private static notifiedFields: { clazz: string; field: string }[] = [];

  /**
   * Displays a warning when a property is missing on a model
   *
   * @param clazz Class of the model
   * @param field Property name that is missing
   */
  public static notifyMissingField(clazz: string, field: string): void {
    if (
      !MissingFieldNotifier.notifiedFields.find(
        notifiedField => notifiedField.clazz === clazz && notifiedField.field === field
      )
    ) {
      MFLogger.debug(`property ${field} does not exist in class ${clazz} => consider to add it`);
      MissingFieldNotifier.notifiedFields.push({ clazz, field });
    }
  }
}
