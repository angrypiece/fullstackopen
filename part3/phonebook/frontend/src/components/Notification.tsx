import type { NotificationMessage } from "../../../shared/types";

interface NotificationProps {
  notification: NotificationMessage | null;
}

const Notification = ({ notification }: NotificationProps) => {
  console.log(notification)
  if (!notification?.message) return null;

  return (
    <div className={notification.error ? "notification error" : "notification"}>
      {notification.message}
    </div>
  );
};

export default Notification;
