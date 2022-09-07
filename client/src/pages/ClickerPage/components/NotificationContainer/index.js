import classNames from "classnames";
import { useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import socket from "../../../../utils/socket";
import "./styles.scss";

const NotificationContainer = ({
  autoDeleteTime = 1.2,
  position = "top-right",
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    socket.on("activateToast", () => {
      setList([...list, { text: "click", type: "action" }]);
    });
    const interval = setInterval(() => {
      deleteToast(list[0]?.id);
    }, autoDeleteTime * 1000);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [autoDeleteTime, list]);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    setList([...list]);
  };

  return (
    <div className={classNames("notification-container", position)}>
      {list?.map((toastEl, idx) => (
        <Toast key={idx} {...toastEl} />
      ))}
    </div>
  );
};

export default NotificationContainer;
