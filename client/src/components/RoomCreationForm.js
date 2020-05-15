import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import BackgroundCard from "../components/BackgroundCard";

const backgrounds = [
  { id: "background-grass", image: "bg-grass.jpg", label: "Grass Background" },
  { id: "background-stone", image: "bg-stone.png", label: "Stone Background" },
  { id: "background-jail", image: "bg-jail.jpg", label: "Jail Dungeon" },
  { id: "background-mountain", image: "bg-mountain.jpg", label: "Mountain" },
  { id: "background-road", image: "bg-road.jpg", label: "Road" },
];

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
            {backgrounds.map((background) => {
              return (
                <BackgroundCard
                  id={background.id}
                  image={background.image}
                  label={background.label}
                ></BackgroundCard>
              );
            })}

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
