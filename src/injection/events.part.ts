import { classes } from './styles.part';


const storageKeys = {
  collapsed: 'talks-plus_sidebar-collapsed',
  sidebarWidth: 'talks-plus_sidebar-width',
};

export function syncSettings(): void {
  chrome.storage.local.get([storageKeys.sidebarWidth, storageKeys.collapsed], function(items) {
    const collapsed = !!items[storageKeys.collapsed];
    const sidebarWidth = items[storageKeys.sidebarWidth] ?? '316px';

    toggleSidebar(collapsed, sidebarWidth);
  });
}

export function handleSidebarResize(): void {
  const pane = document.body.getElementsByClassName(classes.pane)[0] as HTMLDivElement;
  const sidebar = document.body.getElementsByClassName(classes.sidebar)[0] as HTMLDivElement;

  if (!sidebar || !pane) {
    throw new Error('sidebar or pane is not registered');
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

export function handleSidebarToggle(e: MouseEvent): void {
  e?.stopPropagation();
  e?.preventDefault();

  chrome.storage.local.get([storageKeys.sidebarWidth, storageKeys.collapsed], function(items) {
    const collapsed = !(!!items[storageKeys.collapsed]);
    const sidebarWidth = items[storageKeys.sidebarWidth] ?? '316px';

    toggleSidebar(collapsed, sidebarWidth);

    chrome.storage.local.set({ [storageKeys.collapsed]: collapsed });
  });
}

function toggleSidebar(collapsed: boolean, sidebarWidth: number): void {
  const sidebar = document.body.getElementsByClassName(classes.sidebar)[0] as HTMLDivElement;
  const resizer = document.body.getElementsByClassName(classes.resizer)[0] as HTMLDivElement;
  const collapseButton = document.body.getElementsByClassName(classes.collapseButton)[0] as HTMLButtonElement;

  if (!sidebar || !resizer || !collapseButton) {
    throw new Error('sidebar, resizer or collapseButton is not registered');
  }

  sidebar.style.minWidth = `${collapsed ? 'unset' : '316px'}`;
  sidebar.style.width = `${collapsed ? 0 : sidebarWidth}px`;

  collapseButton.textContent = collapsed ? '→' : '←';
  resizer.style.display = collapsed ? 'none' : 'block';
}
