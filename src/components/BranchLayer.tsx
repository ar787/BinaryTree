import { VERTICAL_SPACING } from "../constants";
import type { BaseProps } from "../types";
import TreeNode from "./TreeNode";

type BranchLayerProps = BaseProps & { isCollapsed: boolean; color: string };

export default function BranchLayer({
  node,
  x,
  y,
  offset,
  isCollapsed,
  depth,
  color,
}: BranchLayerProps) {
  const children = [
    { child: node.left, direction: -1, key: "left" },
    { child: node.right, direction: 1, key: "right" },
  ];

  return (
    <g
      style={{
        opacity: isCollapsed ? 0 : 1,
        transition: "opacity 300ms ease",
        pointerEvents: isCollapsed ? "none" : "auto",
      }}
    >
      {children.map(
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
