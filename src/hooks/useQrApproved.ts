import { useSocket } from "./useSocket";

export const useQrApproved = (qrId: string, onApproved: (args: any) => void) => {
  useSocket({
    params: {
      qrId
    },
    joinFunction: "JoinQrRoom",
    listenEvent: "qr_approved",
    onEvent: (args: any) => {
      onApproved(args);
    }
  })
}
