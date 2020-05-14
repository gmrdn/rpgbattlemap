import React from "react";
import TokenChip from "./TokenChip";
import { connect } from "react-redux";
import { openNewTokenDialog } from "../actions";

const TokenBar = (props) => {
  const handleAddToken = (e) => {
    props.openNewTokenDialog(true);
  };

  return (
    <div className="container-fluid mt-3 p-0" style={{ opacity: "0.8" }}>
      <div
        className="container-fluid overflow-auto p-0"
        style={{ height: "50vh" }}
      >
        <ul className="list-group border-0">
          {props.tokens.map((token) => {
            return (
              <li
                key={token._id}
                className="list-group-item border-0 pl-0 pr-2 pb-0 pt-0"
              >
                <TokenChip
                  token={token}
                  tileSide={40}
                  socket={props.socket}
                ></TokenChip>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="btn" onClick={handleAddToken}>
        Add
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = { openNewTokenDialog };

export default connect(mapStateToProps, mapDispatchToProps)(TokenBar);
