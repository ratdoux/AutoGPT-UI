// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';
export type Save = 'save-settings';
export type Load = 'load-settings';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels | Save | Load, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels | Save | Load, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels | Save | Load, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke: (channel: string, args: unknown[]): Promise<unknown[]> => {
      return new Promise((resolve) => {
        ipcRenderer.once(`${channel}-reply`, (_event, ...args) => {
          resolve(args);
        });

        ipcRenderer.send(channel, args);
      });
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
