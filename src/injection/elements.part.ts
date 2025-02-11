import { handleSidebarResize, handleSidebarToggle } from './events.part';
import { classes } from './styles.part';

export function registerResizer(): void {
  const domResizer = document.body.getElementsByClassName(classes.resizer)[0] as HTMLDivElement;

  if (!domResizer) {
    const resizer = document.createElement('div');
    resizer.classList.add(classes.resizer);

    const line = document.createElement('div');
    line.classList.add(classes.resizerLine);
    resizer.appendChild(line);

    const sidebar = getSidebar();
    sidebar.append(resizer);

    resizer.addEventListener('mousedown', handleSidebarResize);
  }
}

export function registerCollapseButton(): void {
  const domButton = document.body.getElementsByClassName(classes.collapseButton)[0] as HTMLButtonElement;

  if (!domButton) {
    const button = document.createElement('button');
    button.classList.add(classes.collapseButton);

    const sidebar = getSidebar();
    sidebar.appendChild(button);

    button.addEventListener('click', handleSidebarToggle);
  }
}

function getSidebar(): HTMLDivElement {
  return document.body.getElementsByClassName(classes.sidebar)[0] as HTMLDivElement;
}
