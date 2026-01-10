export default function TreeNode({ node, x, y, level = 1 }) {
  if (!node) return null;

  const offset = 25 / level;
  const childY = y + 20;

  const leftX = x - offset;
  const rightX = x + offset;

  return (
    <>
      {/* lines */}
      {node.left && <line x1={x} y1={y} x2={leftX} y2={childY} stroke="#555" />}
      {node.right && (
        <line x1={x} y1={y} x2={rightX} y2={childY} stroke="#555" />
      )}

      {/* node */}
      <g onClick={() => alert(node.value)} style={{ background: "red" }}>
        <circle cx={x} cy={y} r="4" fill="white" stroke="#333" />
        <text x={x} y={y} dy="0.35em" textAnchor="middle" fontSize="5">
          {node.value}
        </text>
      </g>
      {/* children */}
      <TreeNode node={node.left} x={leftX} y={childY} level={level + 1} />
      <TreeNode node={node.right} x={rightX} y={childY} level={level + 1} />
    </>
  );
}
