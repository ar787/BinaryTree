import React, { useState } from "react";
import type { BaseProps } from "../types";
import BranchLayer from "./BranchLayer";
import NodeMarker from "./NodeMarker";
import { COLORS } from "../constants";

type TreeNodeProps = Readonly<BaseProps>;

function TreeNode({ node, x, y, offset, depth }: TreeNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!node) return null;

  const handleToggle = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsCollapsed((prev) => !prev);
  };

  const color = COLORS[depth % COLORS.length];

  return (
    <g>
      <BranchLayer
        node={node}
        x={x}
        y={y}
        offset={offset}
        depth={depth}
        isCollapsed={isCollapsed}
        color={color}
      />

      <NodeMarker
        value={node.value}
        x={x}
        y={y}
        isCollapsed={isCollapsed}
        hasChildren={!!(node.left || node.right)}
        onToggle={handleToggle}
        color={color}
      />
    </g>
  );
}

export default React.memo(TreeNode);
