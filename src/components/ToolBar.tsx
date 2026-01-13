import { useEffect, useState, type CSSProperties } from "react";
import { balancedTree, BinaryTreeNode } from "../data";
import DebounceInput from "./DebounceInput";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

export type ToolBarProps = ReactZoomPanPinchContentRef & {
  onValueFounded: (value: number | null) => void;
};

const toolBarStyle: CSSProperties = {
  display: "flex",
  gap: 4,
};

export default function ToolBar({
  zoomIn,
  zoomOut,
  resetTransform,
  zoomToElement,
  onValueFounded,
}: ToolBarProps) {
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
    <div style={toolBarStyle}>
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
