import React, { useState } from "react";
import type { TreeNodeType } from "../types";

type TreeNodeProps = Readonly<{
  node: TreeNodeType;
  x: number;
  y: number;
  offset: number;
}>;

function TreeNode({ node, x, y, offset }: TreeNodeProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!node) return null;

  const circleRadius = 20;
  const verticalSpacing = 70;

  function handleToggle(e) {
    e.stopPropagation();
    setIsCollapsed((prev) => !prev);
  }
  return (
    <g>
      <g
        style={{
          opacity: isCollapsed ? 0 : 1,
          transition: "opacity 300ms ease",
          pointerEvents: isCollapsed ? "none" : "auto",
        }}
      >
        {node.left && (
          <g key={`left-${offset}`}>
            <line
              x1={x}
              y1={y}
              x2={x - offset}
              y2={y + verticalSpacing}
              stroke="#333"
              strokeWidth="2"
            />
            <TreeNode
              node={node.left}
              x={x - offset}
              y={y + verticalSpacing}
              offset={offset / 2}
            />
          </g>
        )}

        {node.right && (
          <g key={`right-${offset}`}>
            <line
              x1={x}
              y1={y}
              x2={x + offset}
              y2={y + verticalSpacing}
              stroke="#333"
              strokeWidth="2"
            />
            <TreeNode
              node={node.right}
              x={x + offset}
              y={y + verticalSpacing}
              offset={offset / 2}
            />
          </g>
        )}
      </g>
      <g onClick={handleToggle} style={{ cursor: "pointer" }}>
        <circle
          cx={x}
          cy={y}
          r={circleRadius}
          fill={isCollapsed ? "#f3f4f6" : "white"}
          stroke="#333"
          strokeWidth="2"
        />

        {/* Simple Toggle Indicator */}
        {(node.left || node.right) && (
          <g transform={`translate(${x + 15}, ${y - 15})`}>
            <circle r="8" fill={isCollapsed ? "#3b82f6" : "#ef4444"} />
            <text
              textAnchor="middle"
              dy=".3em"
              fontSize="10"
              fill="white"
              fontWeight="bold"
            >
              {isCollapsed ? "+" : "-"}
            </text>
          </g>
        )}

        <text
          x={x}
          y={y}
          textAnchor="middle"
          dy=".3em"
          fontSize="12"
          fontWeight="bold"
        >
          {node.value}
        </text>
      </g>
    </g>
  );
}

export default React.memo(TreeNode);
