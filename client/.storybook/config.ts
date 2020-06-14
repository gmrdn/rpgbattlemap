import { addDecorator, configure } from "@storybook/react";

import StylesDecorator from "./styles-decorator";
import StoreDecorator from "./store-decorator";

addDecorator(StylesDecorator);
addDecorator(StoreDecorator);

configure(
  require.context("../src/components", true, /\.stories\.tsx$/),
  module
);
