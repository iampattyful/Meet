const socket = io.connect();
socket.on("connect", () => {
  console.log("client connect to server : ", socket.id);
});
