import React from "react";
import {
  Container,
  Item,
  Inner,
  Pane,
  Title,
  SubTitle,
  Image,
} from "./styles/jumbotron";

export default function Jumbotron({
  children,
  direction = "row",
  ...restProps
}) {
  return (
    <Item {...restProps}>
      <Inner direction={direction}>{children}</Inner>
    </Item>
  );
}

Jumbotron.Container = function JumbotronContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Jumbotron.Pane = function JumbotronPane({ children }) {
  return <Pane>{children}</Pane>;
};

Jumbotron.Title = function JumbotronTitle({ children }) {
  return <Title>{children}</Title>;
};

Jumbotron.SubTitle = function JumbotronSubTitle({ children }) {
  return <SubTitle>{children}</SubTitle>;
};

Jumbotron.Image = function JumbotronImage({ ...restProps }) {
  return <Image {...restProps} />;
};
