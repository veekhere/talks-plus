export interface Connectable {
  connect: () => void;
  reconnect: () => void;
  disconnect: () => void;
};
