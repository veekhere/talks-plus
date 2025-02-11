import { getPane, getSidebar } from './elements.part';
import { classes } from './styles.part';

const storageKeys = {
  sidebarWidth: 'talks-plus_sidebar-width',
};

export function syncSettings(): void {
  const sidebar = getSidebar();

  chrome.storage.local.get(storageKeys.sidebarWidth, function(items) {
    const collapsed = sidebar?.classList.contains(classes.collapsedSidebar);
    const sidebarWidth = items[storageKeys.sidebarWidth] ?? 400;

    if (collapsed) {
      sidebar.style.minWidth = '70px';
      sidebar.style.maxWidth = '70px';
    } else {
      sidebar.style.minWidth = '400px';
      sidebar.style.maxWidth = 'unset';
      sidebar.style.width = `${sidebarWidth}px`;
    }
  });
}

export function handleSidebarResize(): void {
  const pane = getPane();
  const sidebar = getSidebar();

  if (!sidebar || !pane) {
    return;
  }

  function mouseMove(e: MouseEvent): void {
    const width = e.clientX - sidebar.offsetLeft - pane.offsetLeft;
    sidebar.style.width = `${width > 0 ? width : 0}px`;
  }

  function mouseUp(): void {
    document.removeEventListener('mousemove', mouseMove);
    document.removeEventListener('mouseup', mouseUp);

    chrome.storage.local.set({ [storageKeys.sidebarWidth]: sidebar.offsetWidth });
  }

  document.addEventListener('mousemove', mouseMove);
  document.addEventListener('mouseup', mouseUp);
}
