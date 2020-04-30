import React from "react";
import TokenChip from "./TokenChip";
import { connect } from "react-redux";
import { addToken } from "../actions";

const TokenBar = (props) => {
  return (
    <div className="container-fluid overflow-auto mt-3 p-0">
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
  );
};

const mapStateToProps = (state) => {
  return {
    tokens: state.tokens,
  };
};

const mapDispatchToProps = { addToken };

export default connect(mapStateToProps, mapDispatchToProps)(TokenBar);
