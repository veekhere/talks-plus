import { Connectable } from '@core/types.part';
import { getPane } from '@parts/elements.part';
import { classes } from '@parts/styles.part';
import { SidebarCollapseObserver } from './sidebar-collapse.observer';

export class PaneUpdateObserver implements Connectable {

  private readonly sidebarCollapseObserver = new SidebarCollapseObserver();

  private readonly observer = new MutationObserver((mutations) => {
    const addedNodes = mutations
      ?.map((mutation) => Array.from(mutation?.addedNodes ?? []))?.flat();

    addedNodes?.forEach((node) => {
      if ((node as HTMLElement)?.classList?.contains(classes.sidebar)) {
        this.sidebarCollapseObserver?.reconnect();
      }
    });
  });

  connect(): void {
    const pane = getPane();

    if (pane) {
      this.sidebarCollapseObserver.connect();

      this.observer.observe(
        pane,
        {
          childList: true,
        }
      );
    }
  }

  reconnect(): void {
    this.sidebarCollapseObserver.reconnect();
    this.observer.disconnect();
    this.connect();
  }

  disconnect(): void {
    this.sidebarCollapseObserver.disconnect();
    this.observer.disconnect();
  }
}
