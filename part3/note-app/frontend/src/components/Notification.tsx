import type { ErrorMessage } from "../types";

interface NotificationProps {
  message: ErrorMessage;
}

const Notification = ({ message }: NotificationProps) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
