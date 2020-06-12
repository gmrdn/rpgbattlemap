import React from "react";
import Token from "../components/Token";

export default {
  title: "Token",
};
const token = {
  x: 1,
  y: 2,
  name: "Robert",
  color: "blue",
  image: "1.png",
};

const selectedToken = { ...token, selected: true };

export const Default = () => <Token token={token}></Token>;
export const Selected = () => <Token token={selectedToken}></Token>;
