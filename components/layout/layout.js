import { Fragment, useContext } from "react";
import MainHeader from "./main-header";
import Notification from "@/ui/notification";
import NotificationContext from "@/store/notification-context";

export default function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const { title, message, status } = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification title={title} message={message} status={status} />
      )}
    </Fragment>
  );
}
