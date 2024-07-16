import { Dialog } from '../../../base.js';
import { EchoStep0 } from './steps/0.js';

export const echoDialog: Dialog = {
  key: 'echo-dialog',
  stepConstructors: [EchoStep0],
};
