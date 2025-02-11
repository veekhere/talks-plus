import { Connectable } from '@core/types.part';
import { getSidebar, registerResizer } from '@parts/elements.part';
import { syncSettings } from '@parts/events.part';

export class SidebarCollapseObserver implements Connectable {

  private readonly observer = new MutationObserver((mutations) => {
    mutations?.forEach((mutation) => {
      if (mutation?.attributeName === 'class') {
        syncSettings();
      }
    });
  });

  connect(): void {
    const sidebar = getSidebar();

    if (sidebar) {
      registerResizer();
      syncSettings();

      this.observer.observe(
        sidebar,
        {
          attributes: true,
          attributeFilter: ['class'],
        }
      );
    }
  }

  reconnect(): void {
    this.observer.disconnect();
    this.connect();
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}
