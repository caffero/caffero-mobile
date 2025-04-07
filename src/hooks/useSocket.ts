import { useEffect } from 'react';
import { connectSocket } from '../services/socket';

type UseSocketOptions = {
  params: any;
  joinFunction: string;     // e.g., 'JoinQrRoom'
  listenEvent?: string;     // e.g., 'qr_approved'
  onEvent?: (args: any) => void;
};

export const useSocket = ({ params, joinFunction, listenEvent, onEvent }: UseSocketOptions) => {
  useEffect(() => {
    const socket = connectSocket();

    // Join the room after socket connects
    socket.on('connect', () => {
      console.log(`Joining socket room via ${joinFunction} with:`, params);
      socket.emit(joinFunction, params);
    });

    // Set up the listener
    if (listenEvent && onEvent) {
      socket.on(listenEvent, onEvent);
    }

    return () => {
      if (listenEvent && onEvent) {
        socket.off(listenEvent, onEvent);
      }
    };
  }, [params, joinFunction, listenEvent, onEvent]);
};
