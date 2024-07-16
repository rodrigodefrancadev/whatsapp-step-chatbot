import { Dialog } from '../../base.js';
import { echoDialog } from './echo/index.js';

const dialogs: Dialog[] = [echoDialog];

const dialogMaps = new Map<string, Dialog>();
dialogs.forEach((dialog) => {
  dialogMaps.set(dialog.key, dialog);
});

export function getDialog(key: string): Dialog {
  const dialog = dialogMaps.get(key);
  if (!dialog) {
    throw new Error(`Dialog with key ${key} not found`);
  }

  return dialog;
}

export function getDialogAndStepConstructor(
  dialogKey: string,
  stepIndex: number,
) {
  const dialog = getDialog(dialogKey);
  const StepConstructor = dialog.stepConstructors[stepIndex];
  return { dialog, StepConstructor };
}
