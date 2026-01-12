import { useMemo, useState, type CSSProperties } from "react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

import { balancedTree } from "../data";
import { getMaxTreeWidth } from "../utils/getMaxTreeWidth";
import TreeNode from "./TreeNode";
import { NODE_COUNT, CIRCLE_RADIUS } from "../constants";

const SVG_WIDTH = getMaxTreeWidth(NODE_COUNT, CIRCLE_RADIUS * 2, 0);
const INITIAL_OFFSET = SVG_WIDTH / 4;
const SVG_HEIGHT = Math.log2(NODE_COUNT + 1) * (2 * 40);

export default function Tree() {
  const [panning, setPanning] = useState(false);
  const wrapperStyle: CSSProperties = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      cursor: panning ? "grabbing" : "grab",
    }),
    [panning]
  );

  if (balancedTree === null) {
    return;
  }

  return (
    <section className="svg-container">
      <TransformWrapper
        initialScale={1}
        centerOnInit
        minScale={0.1}
        onPanningStart={() => setPanning(true)}
        onPanningStop={() => setPanning(false)}
      >
        {(props) => (
          <>
            <ToolBar {...props} />
            <TransformComponent wrapperStyle={wrapperStyle}>
              <svg
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              >
                <g>
                  <TreeNode
                    node={balancedTree}
                    x={SVG_WIDTH / 2}
                    y={40}
                    offset={INITIAL_OFFSET}
                    depth={0}
                  />
                </g>
              </svg>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </section>
  );
}

function ToolBar({
  zoomIn,
  zoomOut,
  resetTransform,
}: ReactZoomPanPinchContentRef) {
  return (
    <div>
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform(300, "easeInCubic")}>reset</button>
    </div>
  );
}
