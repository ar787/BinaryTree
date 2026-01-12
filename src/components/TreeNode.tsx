import React, { useState } from "react";
import type { TreeNode as TreeNodeType } from "../data";

type TreeNodeProps<T> = Readonly<{
  node: TreeNodeType<T> | null;
  x: number;
  y: number;
  offset: number;
  depth: number;
}>;

const CIRCLE_RADIUS = 20;
const VERTICAL_SPACING = 70;
const COLORS = [
  "#00adac",
  "#09ad11",
  "#ffe200",
  "#ff9900",
  "#8000ff",
  "#0080ff",
];

function TreeNode<T>({ node, x, y, offset, depth }: TreeNodeProps<T>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!node) return null;

  const handleToggle = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setIsCollapsed((prev) => !prev);
  };

  const color = COLORS[depth % COLORS.length];

  return (
    <g>
      <TreeBranches
        node={node}
        x={x}
        y={y}
        offset={offset}
        depth={depth}
        isCollapsed={isCollapsed}
        color={color}
      />

      <NodeVisuals
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

function TreeBranches({ node, x, y, offset, isCollapsed, depth, color }: any) {
  return (
    <g
      style={{
        opacity: isCollapsed ? 0 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: isCollapsed ? "none" : "auto",
      }}
    >
      {[
        { child: node.left, direction: -1, key: "left" },
        { child: node.right, direction: 1, key: "right" },
      ].map(
        ({ child, direction, key }) =>
          child && (
            <g key={`${key}-${offset}`}>
              <line
                x1={x}
                y1={y}
                x2={x + offset * direction}
                y2={y + VERTICAL_SPACING}
                stroke={color}
                strokeWidth="2"
              />
              <TreeNode
                node={child}
                x={x + offset * direction}
                y={y + VERTICAL_SPACING}
                offset={offset / 2}
                depth={depth + 1}
              />
            </g>
          )
      )}
    </g>
  );
}

function NodeVisuals({
  value,
  x,
  y,
  isCollapsed,
  hasChildren,
  onToggle,
  color,
}: any) {
  return (
    <g onClick={onToggle} style={{ cursor: "pointer", userSelect: "none" }}>
      <circle cx={x} cy={y} r={CIRCLE_RADIUS} fill={color} />

      {hasChildren && (
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
        {value}
      </text>
    </g>
  );
}

export default React.memo(TreeNode);
