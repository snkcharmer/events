import { createContext, useState } from "react";

const NotificationContext = createContext({
  notification: null,
  showNotification: function (notificationData) {},
  hideNotification: function (notificationData) {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, setActiveNotification] = useState();

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: showNotificationHandler,
  };

  return (
    <NotificationContext.Provider>
      {props.childern}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;