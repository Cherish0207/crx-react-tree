import React from "react";
import "./index.less";
import { TreeData, Props, State, keyToNodeMap } from "../typings";
import TreeNode from "./tree-node";

class Tree extends React.Component<Props, State> {
  keyToNodeMap: keyToNodeMap;
  constructor(props: Props) {
    super(props);
    this.state = { data: this.props.data };
  }
  componentDidMount() {
    this.buildKeyMap();
  }
  buildKeyMap = () => {
    const data = this.state.data;
    this.keyToNodeMap = {};
    this.keyToNodeMap[data.key] = data;
    if (data.children && data.children.length > 0) {
      this.walk(data.children);
    }
    this.setState({ data: this.state.data });
  };
  walk = (children: TreeData[]) => {
    children.forEach((item: TreeData) => {
      this.keyToNodeMap[item.key] = item;
      if (item.children && item.children.length > 0) {
        this.walk(item.children);
      }
    });
  };
  onCollapse = (key: string) => {
    let data = this.keyToNodeMap[key];
    if (data) {
      data.collapsed = !data.collapsed;
      data.children = data.children || []; // 后面会改成懒加载
      this.buildKeyMap();
    }
  };
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode onCollapse={this.onCollapse} data={this.props.data} />
        </div>
      </div>
    );
  }
}
export default Tree;
