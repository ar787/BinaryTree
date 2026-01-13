import { CIRCLE_RADIUS } from "../constants";
import type { BaseProps } from "../types";

type NodeMarkerProps = Readonly<
  Omit<
    BaseProps & {
      value: NonNullable<BaseProps["node"]>["value"];
      hasChildren: boolean;
      isCollapsed: boolean;
      color: string;
      onToggle: (e: React.MouseEvent<SVGElement>) => void;
    },
    "node" | "offset" | "depth"
  >
>;

export default function NodeMarker({
  value,
  x,
  y,
  isCollapsed,
  hasChildren,
  onToggle,
  color,
}: NodeMarkerProps) {
  return (
    <g
      onClick={onToggle}
      style={{ cursor: "pointer", userSelect: "none" }}
      id={String(value)}
    >
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
