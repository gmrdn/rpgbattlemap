import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import {
  selectToken,
  prepareDeleteTokens,
  openDeleteTokenDialog,
} from "../actions";

export class TokenChip extends React.Component {
  handleDelete = (e) => {
    this.props.prepareDeleteTokens(this.props.token._id);
    this.props.openDeleteTokenDialog(true);
  };

  handleClick = (e) => {
    e.preventDefault();
    const tokenId = e.target.parentNode.id;
    this.props.selectToken(tokenId);
  };

  render() {
    return (
      <div id={`tokenchip-${this.props.token.x}-${this.props.token.y}`}>
        <Chip
          size="small"
          avatar={
            <Avatar
              alt={this.props.token.name}
              src={`/tokens/${this.props.token.image}`}
              style={{
                backgroundColor: this.props.token.color,
              }}
            />
          }
          label={this.props.token.name}
          color={this.props.token.selected ? "primary" : "default"}
          id={this.props.token._id}
          onClick={this.handleClick}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nickname: state.nickname,
    roomId: state.roomId,
    tokens: state.tokens,
  };
};

const mapDispatchToProps = {
  selectToken,
  prepareDeleteTokens,
  openDeleteTokenDialog,
};

export default connect(mapStateToProps, mapDispatchToProps)(TokenChip);
