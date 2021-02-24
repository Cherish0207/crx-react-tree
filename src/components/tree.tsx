import React from "react";
import "./index.less";
import { TreeData, Props, State, keyToNodeMap } from "../typings";
import TreeNode from "./tree-node";


class Tree extends React.Component<Props, State> {
  keyToNodeMap: keyToNodeMap;
  constructor(props: Props) {
    super(props);
    this.state = { data: this.props.data };
    this.buildKeyMap();
    console.log(this.keyToNodeMap);
    
  }
  buildKeyMap = () => {
    const data = this.state.data;
    this.keyToNodeMap = {};
    this.keyToNodeMap[data.key] = data;
    if (data.children && data.children.length > 0) {
      this.walk(data.children);
    }
  };
  walk = (children: TreeData[]) => {
    children.forEach((item: TreeData) => {
      this.keyToNodeMap[item.key] = item;
      if (item.children && item.children.length > 0) {
        this.walk(item.children);
      }
    });
  };
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
