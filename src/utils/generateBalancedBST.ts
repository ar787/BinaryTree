import { BinaryTreeNode } from "../structures/BinaryTreeNode";

export function generateBalancedBST<T>(arr: T[]) {
  if (arr.length === 0) {
    return null;
  }

  const midIndex = Math.floor(arr.length / 2);
  const root = new BinaryTreeNode(arr[midIndex]);

  root.left = generateBalancedBST(arr.slice(0, midIndex));
  root.right = generateBalancedBST(arr.slice(midIndex + 1));

  return root;
}
