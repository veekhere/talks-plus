import { handleSidebarResize } from './events.part';
import { classes } from './styles.part';

export function getSidebar(): HTMLDivElement {
  return document.body.getElementsByClassName(classes.sidebar)[0] as HTMLDivElement;
}

export function getPane(): HTMLDivElement {
  return document.body.getElementsByClassName(classes.pane)[0] as HTMLDivElement;
}

export function registerResizer(): void {
  const domResizer = document.body.getElementsByClassName(classes.resizer)[0] as HTMLDivElement;

  if (!domResizer) {
    const sidebar = getSidebar();

    if (!sidebar) {
      return;
    }

    const resizer = document.createElement('div');
    resizer.classList.add(classes.resizer);

    const line = document.createElement('div');
    line.classList.add(classes.resizerLine);
    resizer.appendChild(line);

    sidebar.append(resizer);

    resizer.addEventListener('mousedown', handleSidebarResize);
  }
}
