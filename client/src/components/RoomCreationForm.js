import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class RoomCreationForm extends React.Component {
  state = {
    name: "",
    background: "",
    roomId: "",
  };

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  handleBackgroundChange = (event) => {
    this.setState({ background: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const room = {
      grid: {
        name: this.state.name,
        background: this.state.background,
      },
    };

    axios.post(`/api/room`, room).then((res) => {
      console.log(res);
      console.log(res.data);
      this.setState({ roomId: res.data._id });
    });
  };
  render() {
    if (this.state.roomId !== "") {
      return <Redirect to={`/room/${this.state.roomId}`} />;
    }

    return (
      <div
        className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
        style={{ width: "48rem", minHeight: "50vh" }}
      >
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              id="txt-room-name"
              className="form-control mb-3 border-secondary"
              placeholder="Room name"
              aria-label="Room name"
              required
              onChange={this.handleNameChange}
            ></input>
          </div>

          <div
            className="form-group mb-5"
            onChange={this.handleBackgroundChange.bind(this)}
          >
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="backgroundRadios"
                id="background-grass"
                value="bg-grass.jpg"
              />
              <label className="form-check-label" for="backgroundRadios1">
                <div
                  className="card"
                  style={{ width: "12rem", height: "12rem" }}
                >
                  <img
                    src="/bg-grass.jpg"
                    className="card-img-top"
                    alt="Grass background"
                    style={{ minHeight: "100%" }}
                  />
                  <div className="card-body">
                    <p className="card-text">Grass background</p>
                  </div>
                </div>
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="backgroundRadios"
                id="background-stone"
                value="bg-stone.png"
              />
              <label className="form-check-label" for="backgroundRadios2">
                <div
                  className="card"
                  style={{ width: "12rem", height: "12rem" }}
                >
                  <img
                    src="/bg-stone.png"
                    className="card-img-top"
                    alt="Stone background"
                  />
                  <div className="card-body">
                    <p className="card-text">Stone background</p>
                  </div>
                </div>
              </label>
            </div>

            <div
              className="form-check form-check-inline"
              style={{ width: "12rem", height: "12rem" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="backgroundRadios"
                id="background-none"
                value=""
              />
              <label className="form-check-label" for="backgroundRadios4">
                No background
              </label>
            </div>
          </div>
          <div className="form-row align-items-center">
            <button
              type="submit"
              id="btn-create"
              className="btn btn-dark btn-lg"
            >
              <strong>Create Room</strong>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RoomCreationForm;
