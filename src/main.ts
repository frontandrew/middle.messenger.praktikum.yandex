import { appController } from 'app';

window.addEventListener('load', () => {
  appController.appStart();
});

window.addEventListener('unload', () => {
  appController.appStop();
});
