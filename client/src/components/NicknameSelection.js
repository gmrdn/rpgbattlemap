import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName } from "../actions";

class NicknameSelection extends React.Component {
  handleSetNickname = () => {
    this.props.setUserName(this.nickname.value);
    localStorage.setItem("nickname", this.nickname.value);
  };

  render() {
    return (
      <>
        <div
          className="card mx-auto mb-5 border-0 d-flex justify-content-center bg-transparent"
          style={{ width: "15rem", minHeight: "50vh" }}
        >
          <div className="input-group input-group-lg">
            <input
              id="nickname"
              className="form-control mb-3 border-secondary"
              placeholder="Nickname"
              aria-label="Nickname"
              required
              ref={(input) => (this.nickname = input)}
            ></input>
          </div>
          <NavLink
            id="btn-join"
            to={{
              pathname: `/room/${this.props.roomId}`,
            }}
            className="btn btn-dark btn-lg"
            onClick={this.handleSetNickname}
          >
            <strong>Join</strong>
          </NavLink>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
  };
};

const mapDispatchToProps = { setUserName };

export default connect(mapStateToProps, mapDispatchToProps)(NicknameSelection);
