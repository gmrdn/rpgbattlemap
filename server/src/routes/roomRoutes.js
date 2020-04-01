const routes = app => {
  app
    .route("/api/room")
    .get(
      (req, res, next) => {
        // middleware
        console.log(`Request from ${req.originalUrl}`);
        console.log(`Request from ${req.method}`);
        next();
      },
      (req, res, next) => {
        res.send("GET request successful");
      }
    )

    .post((req, res) => res.send("POST request successful"));

  app
    .route("/api/room/:roomID")
    .put((req, res) => res.send("PUT request successful"))
    .delete((req, res) => res.send("DELETE request sucessful"));
};

export default routes;
