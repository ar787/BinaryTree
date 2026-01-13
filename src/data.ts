import { NODE_COUNT } from "./constants";
import type { BinaryTreeNode } from "./structures/BinaryTreeNode";
import { generateBalancedBST } from "./utils/generateBalancedBST";

const sortedArray = Array.from({ length: NODE_COUNT }, (_, i) => i + 1);
export const balancedTree = generateBalancedBST(
  sortedArray
) as BinaryTreeNode<number>;

export type BalancedTree = typeof balancedTree;
