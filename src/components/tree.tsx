import React from "react";
import "./index.less";
import { Props } from "../typings";

class Tree extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return <div className="tree">tree</div>;
  }
}
export default Tree;
