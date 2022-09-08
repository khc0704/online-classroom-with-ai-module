import { io } from "socket.io-client";
import React from "react";

export const socket = io("http://localhost:9001/");
export const SocketContext = React.createContext(socket);
