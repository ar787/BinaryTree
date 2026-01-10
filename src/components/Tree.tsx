import TreeNode from "./TreeNode";
import { tree, treeData400 } from "../data";

export default function Tree() {
  return (
    <div className="svg-container">
      <svg width="100%" height="700" viewBox="0 0 600 500">
        <TreeNode node={treeData400} x={300} y={40} offset={200} />
      </svg>
    </div>
  );
}
