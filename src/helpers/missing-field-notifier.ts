import { MFLogger } from '../mf-logger';

export class MissingFieldNotifier {
  private static notifiedFields: { clazz: string; field: string }[] = [];

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
