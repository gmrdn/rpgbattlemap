import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUserName } from "../actions";
import EnterButton from "../components/EnterButton/EnterButton";

export class NicknameSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
    };
  }

  handleSetNickname = () => {
    this.props.setUserName(this.state.nickname);
    localStorage.setItem("nickname", this.state.nickname);
  };

  handleChangeNickname = (e) => {
    this.setState({ nickname: e.target.value });
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
              onChange={this.handleChangeNickname}
            ></input>
          </div>
          <Link
            id="btn-join"
            to={{
              pathname: `/room/${this.props.roomId}`,
            }}
            onClick={this.handleSetNickname}
          >
            <EnterButton text="Join"></EnterButton>
          </Link>
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
