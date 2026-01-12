export function getMaxTreeWidth(
  nodeCount: number,
  nodeWidth: number,
  spacing = 20
) {
  const depth = Math.ceil(Math.log2(nodeCount + 1));
  const maxNodesAtBottom = Math.pow(2, depth - 1);

  const padding = 200;
  return maxNodesAtBottom * (nodeWidth + spacing) + padding;
}
