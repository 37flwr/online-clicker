import classNames from "classnames";
import { useEffect, useState } from "react";
import Toast from "../../../../components/Toast";
import { hideExtraSymbols } from "../../../../utils/formatters";
import socket from "../../../../utils/socket";
import "./styles.scss";

const NotificationContainer = ({
  autoDeleteTime = 1.3,
  position = "top-right",
}) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    socket.on("activateToast", (id) => {
      setList([
        ...list,
        {
          text: `${hideExtraSymbols(id, 2, 4)} hit monster for 10 hp`,
          type: "action",
        },
      ]);
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
    list.splice(id, 1);
    setList([...list]);
  };

  return (
    <div className={classNames("notification-container", position)}>
      {list?.map((toastEl, idx) => (
        <Toast key={idx} id={idx} deleteToast={deleteToast} {...toastEl} />
      ))}
    </div>
  );
};

export default NotificationContainer;
