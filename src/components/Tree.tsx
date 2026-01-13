import { useState, useEffect, useMemo, type CSSProperties } from "react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchContentRef,
} from "react-zoom-pan-pinch";

import { balancedTree, BinaryTreeNode } from "../data";
import { getMaxTreeWidth } from "../utils/getMaxTreeWidth";
import TreeNode from "./TreeNode";
import { NODE_COUNT, CIRCLE_RADIUS } from "../constants";

const SVG_WIDTH = getMaxTreeWidth(NODE_COUNT, CIRCLE_RADIUS * 2, 0);
const INITIAL_OFFSET = SVG_WIDTH / 4;
const SVG_HEIGHT = Math.log2(NODE_COUNT + 1) * (2 * 40);

export default function Tree() {
  const [panning, setPanning] = useState(false);
  const [foundedValue, setFoundedValue] = useState<number | null>(null);
  const [expandedPath, setExpandedPath] = useState<Set<number>>(new Set());

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

  const handleOnValueFounded: ToolBarProps["onValueFounded"] = (value) => {
    setFoundedValue(value);
    if (value === null) {
      return;
    }
    const path = BinaryTreeNode.findPathToValue(balancedTree, value);

    if (path) {
      setExpandedPath(new Set(path));
    }
  };

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
            <ToolBar {...props} onValueFounded={handleOnValueFounded} />
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
                    foundedValue={foundedValue}
                    expandedPath={expandedPath}
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

type ToolBarProps = ReactZoomPanPinchContentRef & {
  onValueFounded: (value: number | null) => void;
};
function ToolBar({
  zoomIn,
  zoomOut,
  resetTransform,
  zoomToElement,
  onValueFounded,
}: Readonly<ToolBarProps>) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const node = BinaryTreeNode.findNodeBST(balancedTree, +value);
    if (value.trim().length === 0) {
      onValueFounded(null);
      resetTransform();
      return;
    }
    if (node === null) {
      alert("Node not found");
      onValueFounded(null);
      return;
    }
    const id = String(node.value);
    zoomToElement(id);
    onValueFounded(node.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div style={{ display: "flex", gap: 4 }}>
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform(300, "easeInCubic")}>reset</button>
      <DebounceInput
        type="number"
        placeholder="Search node"
        onDebounce={(value) => setValue(value)}
      />
    </div>
  );
}

type DebounceInputProps = {
  onDebounce: (value: string) => void;
  delay?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

const DebounceInput = ({
  onDebounce,
  delay = 500,
  ...rest
}: DebounceInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onDebounce(inputValue);
    }, delay);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return <input value={inputValue} onChange={handleInputChange} {...rest} />;
};
