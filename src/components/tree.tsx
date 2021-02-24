import React from "react";
import "./index.less";
import { TreeData, Props, State, keyToNodeMap } from "../typings";
import TreeNode from "./tree-node";
import { getChildren } from "../api";
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
      this.walk(data.children, data);
    }
    this.setState({ data: this.state.data });
  };
  walk = (children: TreeData[], data: TreeData) => {
    children.forEach((item: TreeData) => {
      item.parent = data;
      this.keyToNodeMap[item.key] = item;
      if (item.children && item.children.length > 0) {
        this.walk(item.children, item);
      }
    });
  };
  onCollapse = async (key: string) => {
    let data = this.keyToNodeMap[key];
    if (data) {
      if (!data.children) {
        data.loading = true;
        this.buildKeyMap();
        this.setState({ data: this.state.data });
        let result = await getChildren(data);
        if (result.code == 0) {
          data.children = result.data;
          data.collapsed = false;
          data.loading = false;
          this.buildKeyMap();
          this.setState({ data: this.state.data });
        } else {
          alert("加载失败");
        }
      } else {
        // 如果没有 children属性,则说明儿子未加载,需要加载
        data.collapsed = !data.collapsed;
        this.setState({ data: this.state.data });
      }
    }
  };
  onCheck = (key: string) => {
    let data: TreeData = this.keyToNodeMap[key];
    if (data) {
      data.checked = !data.checked;
      if (data.checked) {
        this.checkChildren(data.children, true);
        this.checkParentCheckAll(data.parent);
      } else {
        this.checkChildren(data.children, false);
        this.checkParent(data.parent, false);
      }
      this.setState({ data: this.state.data });
    }
  };
  checkParentCheckAll = (parent: TreeData) => {
    while (parent) {
      parent.checked = parent.children.every((item) => item.checked);
      parent = parent.parent;
    }
  };
  checkParent = (parent: TreeData, checked: boolean) => {
    // 可以优化,不用找到顶点 只需要找到当前节点和传入的状态一致就可以停止递归查找了
    while (parent) {
      parent.checked = checked;
      parent = parent.parent;
    }
  };
  checkChildren = (children: Array<TreeData> = [], checked: boolean) => {
    children.forEach((item: TreeData) => {
      item.checked = checked;
      this.checkChildren(item.children, checked);
    });
  };
  render() {
    return (
      <div className="tree">
        <div className="tree-nodes">
          <TreeNode
            onCheck={this.onCheck}
            onCollapse={this.onCollapse}
            data={this.props.data}
          />
        </div>
      </div>
    );
  }
}
export default Tree;
