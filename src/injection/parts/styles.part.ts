export const classes = {
  pane: 'layout-pane',
  paneCenter: 'layout-pane__center',
  resizer: 'resizer',
  resizerLine: 'resizer__line',
  sidebar: 'layout-pane__left',
  collapsedSidebar: 'layout-pane__left--minimized',
};

export function initStyles(): void {
  const css: string = `
    .${classes.sidebar} {
      position: relative;
      max-width: unset;
      min-width: 400px;
      flex-grow: unset;
      width: unset;
    }

    .${classes.resizer} {
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 0;
      right: -4px;

      width: 2px;
      height: 100%;

      z-index: 10;
      cursor: col-resize;

      padding: 0 3px 0 0;

      &:hover {
        .${classes.resizerLine} {
          opacity: 1;
        }
      }

      .${classes.resizerLine} {
        height: 100%;
        width: 2px;

        background-color: #1e1e1e;

        opacity: 0.5;
      }
    }

    .${classes.collapsedSidebar} {
      .${classes.resizer} {
        display: none;
      }
    }

    .${classes.paneCenter} {
      max-width: 100% !important;
    }

    div#search-input--chips::after {
      content: none;
      display: none;
    }
  `;

  const style = document.createElement('style');

  style.textContent = css;

  document.head.appendChild(style);
}
