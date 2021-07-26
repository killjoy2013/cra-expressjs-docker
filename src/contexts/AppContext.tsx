import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";

interface AppProviderProps {
  children?: any;
}

export interface AppProviderState {
  refSocket: React.MutableRefObject<Socket | null>;
  refSocketInterval: React.MutableRefObject<NodeJS.Timeout>;
  refPingCount: React.MutableRefObject<number>;
}

const AppContext = React.createContext<AppProviderState>(null);

const AppProvider: React.FunctionComponent<AppProviderProps> = (
  props: AppProviderProps
) => {
  const refSocket = React.useRef<Socket>(null);
  const refSocketInterval = React.useRef<NodeJS.Timeout>(null);
  const refPingCount = React.useRef<number>(0);

  return (
    <AppContext.Provider
      value={{
        refSocket,
        refSocketInterval,
        refPingCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
