"use client";

import { notification } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/store/index.store";
import { useEffect } from "react";
import { resetNotificationState } from "@/lib/store/notification.store";

export default function NotficationComponent() {
  const notificationState = useAppSelector((state) => state.notification);
  const dispatch = useAppDispatch();

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (notificationState.type != "none") {
      //@ts-ignore
      api[notificationState.type]({
        message: notificationState.title,
        description: notificationState.message,
        duration: 1.5,
      });

      dispatch(resetNotificationState());
    }
  });

  return <>{contextHolder}</>;
}
