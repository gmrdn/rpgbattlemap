import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { selectToken } from "../actions";

class TokenChip extends React.Component {
  handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  handleClick = (e) => {
    e.preventDefault();
    const tokenId = e.target.parentNode.id;
    console.info("You clicked the Chip.");
    console.log(tokenId);
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
          color={this.props.token.selected ? "primary" : ""}
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
};

// export default TokenChip;
export default connect(mapStateToProps, mapDispatchToProps)(TokenChip);
