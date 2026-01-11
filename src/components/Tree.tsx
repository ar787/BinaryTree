import TreeNode from "./TreeNode";
import { tree, treeData400 } from "../data";

const SVG_WIDTH = 4000;
const SVG_HEIGHT = 3000;

export default function Tree() {
  return (
    <div className="svg-container">
      <svg width={SVG_WIDTH} viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
        <TreeNode node={tree} x={window.innerWidth / 2} y={40} offset={200} />
      </svg>
    </div>
  );
}
