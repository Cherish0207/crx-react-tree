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
      data: { name, children },
    } = this.props;
    return (
      <div className="tree-node">
        <div className="inner">
          <span className="content">{name}</span>
        </div>
        {children && children.length > 0 && (
          <div className="children">
            {children.map((item: TreeData) => (
              <TreeNode key={item.key} data={item} />
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default TreeNode;
