import { useEffect } from "react";

function useTaskWebSocket(onMessage) {
  useEffect(() => {
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/tasks/");

    socket.onopen = () => console.log("Connected to WebSocket");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received update:", data);
      if (onMessage) onMessage(data);
    };
    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [onMessage]);
}

export default useTaskWebSocket;
