import React, { useState, useEffect, useContext } from "react";
import { Socket } from "socket.io-client";

interface AppProviderProps {
  children?: any;
}

export interface AppProviderState {
  refSocket: React.MutableRefObject<Socket> | undefined | null;
}

const AppContext = React.createContext<AppProviderState>(null);

const AppProvider: React.FunctionComponent<AppProviderProps> = (
  props: AppProviderProps
) => {
  const refSocket = React.useRef<Socket>(null);

  return (
    <AppContext.Provider
      value={{
        refSocket,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
