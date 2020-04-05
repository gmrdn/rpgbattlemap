import {
  addNewRoom,
  getRooms,
  getRoomByID,
  getChatMessages,
  getGrid,
  updateRoom
} from "../controllers/roomController";

const routes = app => {
  app
    .route("/api/room")
    .get(getRooms)
    .post(addNewRoom);

  app
    .route("/api/room/:id")
    .get(getRoomByID)
    .put(updateRoom)
    .delete((req, res) => res.send("DELETE request sucessful"));

  app.route("/api/room/:id/chatmessages").get(getChatMessages);
  app.route("/api/room/:id/grid").get(getGrid);
};

export default routes;
