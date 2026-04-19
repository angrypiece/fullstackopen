import type { NotificationMessage } from "../types";

interface NotificationProps {
  notification: NotificationMessage | null;
}

const Notification = ({ notification }: NotificationProps) => {
  if (!notification?.message) return null;

  return (
    <div className={notification.error ? "notification error" : "notification"}>
      {notification.message}
    </div>
  );
};

export default Notification;
