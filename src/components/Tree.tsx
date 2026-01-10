import TreeNode from "./TreeNode";
import { tree } from "../data";

export default function Tree() {
  return (
    <div className="svg-container">
      <svg
        // id="tree-svg"
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMin meet"
      >
        <TreeNode node={tree} x={40} y={10} />
      </svg>
    </div>
  );
}
