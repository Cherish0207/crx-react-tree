// 声明一个接口,名字叫 Treedata , 定义一个变量的类型,定义对象的属性名和属性的类型
export interface TreeData {
  name: string;
  key: string; // 1.dom-diff 2.生成映射表的key
  type: string;
  collapsed: boolean; // 是否折叠
  children?: TreeData[]; // ?:表示可选属性,可以给也可以不给
  parent?: TreeData;
  checked?: boolean;
  loading?: boolean;
}

// 接口类型,可以用来装饰或者说约束组件属性对象
export interface Props {
  data: TreeData;
  onCollapse: collapse;
  onCheck: Check;
  setFromNode: SetFromNode;
  onMove: OnMove;
}
export interface State {
  data: TreeData;
  fromNode?: TreeData;
}
export interface keyToNodeMap {
  [key: string]: TreeData;
}
export interface collapse {
  (key: string): void;
}
export interface Check {
  (key: string): void;
}
export interface SetFromNode {
  (key: TreeData): void;
}
export interface OnMove {
  (key: TreeData): void;
}