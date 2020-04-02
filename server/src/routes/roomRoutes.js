import {
  addNewRoom,
  getRooms,
  getRoomByID,
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
};

export default routes;
