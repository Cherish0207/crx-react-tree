import React from "react";
import { TreeData, Props } from "../typings";
import closedFolder from "../assets/closed-folder.png";
import file from "../assets/file.png";
import openedFolder from "../assets/opened-folder.png";

class TreeNode extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    let {
      data: { name, children, collapsed = false, checked = false, key },
    } = this.props;
    let caret, icon;
    if (children) {
      if (children.length > 0) {
        caret = (
          <span
            className={`collapse ${collapsed ? "caret-right" : "caret-down"}`}
            onClick={() => this.props.onCollapse(key)}
          />
        );
        icon = collapsed ? closedFolder : openedFolder;
      } else {
        caret = null;
        icon = file;
      }
    } else {
      caret = (
        <span
          className={`collapse caret-right`}
          onClick={() => this.props.onCollapse(key)}
        />
      );
      icon = closedFolder;
    }
    return (
      <div className="tree-node">
        <div className="inner">
          {caret}
          <span className="content">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => this.props.onCheck(key)}
            />
            <img style={{ width: 20 }} src={icon} />
            {name}
          </span>
        </div>
        {children && children.length > 0 && !collapsed && (
          <div className="children">
            {children.map((item: TreeData) => (
              <TreeNode
                onCheck={this.props.onCheck}
                onCollapse={this.props.onCollapse}
                key={item.key}
                data={item}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default TreeNode;
