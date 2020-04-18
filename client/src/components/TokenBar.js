import React from "react";
import Token from "./Token";
import { connect } from "react-redux";
import { addToken } from "../actions";

const TokenBar = (props) => {
  return (
    <div
      className="container-fluid overflow-auto mt-3 p-0"
      style={{ height: "50vh" }}
    >
      <ul className="list-group border-0">
        {props.tokens.map((token) => {
          return (
            <li className="list-group-item border-0 pl-1 pr-2">
              <Token token={token} tileSide={40} position="static"></Token>
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
