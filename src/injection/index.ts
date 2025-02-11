import { PaneUpdateObserver } from '@observers/pane-update.observer';
import { initStyles } from '@parts/styles.part';

setTimeout(() => {
  initStyles();

  const paneUpdateObserver = new PaneUpdateObserver();
  paneUpdateObserver.connect();
},
  100
);
