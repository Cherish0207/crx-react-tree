// 声明一个接口,名字叫 Treedata , 定义一个变量的类型,定义对象的属性名和属性的类型
export interface TreeData {
  name: string;
  key: string;
  type: string;
  collapsed: boolean;
  children?: TreeData[]; // ?:表示可选属性,可以给也可以不给
  // parent: TreeData;
}

// 接口类型,可以用来装饰或者说约束组件属性对象
export interface Props {
  data: TreeData;
}
