import { registerCollapseButton, registerResizer } from './elements.part';
import { syncSettings } from './events.part';
import { initStyles } from './styles.part';

setTimeout(() => {
  initStyles();

  registerResizer();
  registerCollapseButton();

  syncSettings();
},
  100
);
