import React, { useEffect, useState } from "react";
import type { BaseProps } from "../types";
import BranchLayer from "./BranchLayer";
import NodeMarker from "./NodeMarker";
import { COLORS } from "../constants";

type TreeNodeProps = BaseProps & { expandedPath: Set<number> };

function TreeNode({
  node,
  x,
  y,
  offset,
  depth,
  foundedValue,
  expandedPath,
}: TreeNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (expandedPath.has(node.value)) {
      setIsCollapsed(false);
    }
  }, [expandedPath, node.value]);

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
        foundedValue={foundedValue}
        expandedPath={expandedPath}
      />

      <NodeMarker
        value={node.value}
        x={x}
        y={y}
        isCollapsed={isCollapsed}
        hasChildren={!!(node.left || node.right)}
        onToggle={handleToggle}
        color={color}
        foundedValue={foundedValue}
      />
    </g>
  );
}

export default React.memo(TreeNode);
