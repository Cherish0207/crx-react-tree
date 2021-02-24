import React from "react";
import "./index.less";
import { Props } from "../typings";
import TreeNode from "./tree-node";

class Tree extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode data={this.props.data} />
        </div>
      </div>
    );
  }
}
export default Tree;
