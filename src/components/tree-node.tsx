import React from "react";
import { TreeData, Props } from "../typings";
import closedFolder from "../assets/closed-folder.png";
import file from "../assets/file.png";
import openedFolder from "../assets/opened-folder.png";
import loadingSrc from "../assets/loading.gif";

class TreeNode extends React.Component<Props> {
  treeNodeRef: React.RefObject<HTMLDivElement>;
  constructor(props: Props) {
    super(props);
    this.treeNodeRef = React.createRef();
  }
  componentDidMount() {
    this.treeNodeRef.current.addEventListener(
      "dragstart",
      (event: DragEvent): void => {
        this.props.setFromNode(this.props.data);
        event.stopPropagation();
      },
      false
    ); //useCapture=false
    this.treeNodeRef.current.addEventListener(
      "dragenter",
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
    this.treeNodeRef.current.addEventListener(
      "dragover",
      (event: DragEvent) => {
        event.preventDefault();
        event.stopPropagation();
      },
      false
    );
    this.treeNodeRef.current.addEventListener(
      "drop",
      (event: DragEvent) => {
        event.preventDefault();
        this.props.onMove(this.props.data);
        event.stopPropagation();
      },
      false
    );
  }
  render() {
    let {
      data: {
        name,
        children,
        collapsed = false,
        checked = false,
        key,
        loading,
      },
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
      caret = loading ? (
        <img
          className="collapse"
          src={loadingSrc}
          style={{ width: 14, top: "50%", marginTop: -7 }}
        />
      ) : (
        <span
          className={`collapse caret-right`}
          onClick={() => this.props.onCollapse(key)}
        />
      );
      icon = closedFolder;
    }
    return (
      <div className="tree-node" draggable={true} ref={this.treeNodeRef}>
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
                setFromNode={this.props.setFromNode}
                onMove={this.props.onMove}
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
