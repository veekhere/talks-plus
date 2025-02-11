export const classes = {
  collapseButton: 'layout-pane__collapse-button',
  pane: 'layout-pane',
  paneCenter: 'layout-pane__center',
  paneHeader: 'layout-pane__header',
  resizer: 'resizer',
  resizerLine: 'resizer__line',
  sidebar: 'layout-pane__left',
};

export function initStyles(): void {
  const css: string = `
    .${classes.sidebar} {
      position: relative;
      max-width: unset;
      min-width: 316px;
      flex-grow: unset;
      width: unset;

      .${classes.collapseButton} {
        border: none;
        outline: none;

        display: flex;
        align-items: center;
        justify-content: center;

        height: 24px;
        width: 24px;

        position: absolute;
        top: 12px;
        right: -36px;
        z-index: 10;

        color: #fff;
        background-color: #3a3f3f;
        border-radius: 4px;
        cursor: pointer;

        transition: background-color 0.2s ease 0s;

        &:hover {
          background-color: #484f4f;
        }
      }
    }

    .${classes.paneCenter} {
      max-width: 100% !important;

      .${classes.paneHeader} {
        padding-left: 48px;
      }
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

    div#search-input--chips::after {
      content: none;
      display: none;
    }
  `;

  const style = document.createElement('style');

  style.textContent = css;

  document.head.appendChild(style);
}
