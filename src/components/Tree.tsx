import TreeNode from "./TreeNode";
import { tree, treeData400, balancedTree, NODE_COUNT } from "../data";
import { useEffect, useRef, useState } from "react";

const SVG_WIDTH = getMaxTreeWidth(NODE_COUNT, 40, 0);

const INITIAL_OFFSET = SVG_WIDTH / 4;

const SVG_HEIGHT = 3000; // Math.log2(NODE_COUNT + 1) * (2 * 40)

function getMaxTreeWidth(nodeCount: number, nodeWidth: number, spacing = 20) {
  const depth = Math.ceil(Math.log2(nodeCount + 1));
  const maxNodesAtBottom = Math.pow(2, depth - 1);

  // Add a safety margin (padding) of 100-200px
  const padding = 200;
  return maxNodesAtBottom * (nodeWidth + spacing) + padding;
}

export default function Tree() {
  const [viewX, setViewX] = useState(0);
  const [cursor, setCursor] = useState<"grab" | "grabbing">("grab");

  // Refs to track movement without triggering re-renders during the animation
  const isDragging = useRef(false);
  const velocity = useRef(0);
  const lastMouseX = useRef(0);
  const animationRef = useRef<number | null>(null);

  // 1. Core Dragging Logic
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setCursor("grabbing");
    velocity.current = 0; // Stop any existing slide
    lastMouseX.current = e.clientX;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - lastMouseX.current;
    lastMouseX.current = e.clientX;

    // Track velocity (how fast was the mouse moving?)
    velocity.current = deltaX;

    // Move the view immediately
    setViewX((prev) => prev - deltaX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setCursor("grab");
    startInertia();
  };

  // 2. Inertia (The "Slide" Effect)
  const startInertia = () => {
    if (Math.abs(velocity.current) < 0.1) return; // Stop if too slow

    setViewX((prev) => prev - velocity.current);

    // Friction: Reduce velocity by 5% every frame
    velocity.current *= 0.95;

    animationRef.current = requestAnimationFrame(startInertia);
  };

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);
  return (
    <section className="svg-container">
      <svg
        width="100%"
        viewBox={`${viewX} 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        style={{ overflow: "visible", cursor }}
        height={SVG_HEIGHT}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <g>
          <TreeNode
            node={balancedTree}
            x={SVG_WIDTH / 2}
            y={40}
            offset={INITIAL_OFFSET}
          />
        </g>
      </svg>
    </section>
  );
}
