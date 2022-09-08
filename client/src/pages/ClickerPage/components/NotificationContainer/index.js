import classNames from "classnames";
import { useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import socket from "../../../../utils/socket";
import "./styles.scss";

const NotificationContainer = ({
  autoDeleteTime = 5.5,
  position = "top-right",
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    socket.on("activateToast", (msg) => {
      setList([...list, msg]);
    });

    const interval = setInterval(() => {
      deleteListItem();
    }, autoDeleteTime * 1000);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [list]);

  const deleteListItem = () => {
    list.splice(0, 1);
    setList([...list]);
  };

  return (
    <div className={classNames("notification-container", position)}>
      {list?.map((toastItem, idx) => (
        <Toast key={idx} id={idx} deleteToast={deleteListItem} {...toastItem} />
      ))}
    </div>
  );
};

export default NotificationContainer;
