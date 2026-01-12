// import type { TreeNodeType } from "./types";

export class TreeNode<T> {
  public value: T;
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}

export type TreeNodeType = typeof TreeNode.prototype;

function generateBalancedBST<T>(arr: T[]) {
  // Base case: if the array is empty, return null
  if (arr.length === 0) {
    return null;
  }

  // Find the middle element to serve as the root
  const midIndex = Math.floor(arr.length / 2);
  const root = new TreeNode(arr[midIndex]);

  // Recursively build the left and right subtrees
  root.left = generateBalancedBST(arr.slice(0, midIndex));
  root.right = generateBalancedBST(arr.slice(midIndex + 1));

  return root;
}

export const tree: TreeNodeType = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
      left: {
        value: 8,
        left: {
          value: 16,
          left: { value: 32, left: null, right: null },
          right: null,
        },
        right: { value: 17, left: null, right: null },
      },
      right: {
        value: 9,
        left: { value: 18, left: null, right: null },
        right: null,
      },
    },
    right: {
      value: 5,
      left: { value: 10, left: null, right: null },
      right: { value: 11, left: null, right: null },
    },
  },
  right: {
    value: 3,
    left: {
      value: 6,
      left: { value: 12, left: null, right: null },
      right: {
        value: 13,
        left: { value: 20, left: null, right: null },
        right: { value: 21, left: null, right: null },
      },
    },
    right: {
      value: 7,
      left: { value: 14, left: null, right: null },
      right: {
        value: 15,
        left: { value: 22, left: null, right: null },
        right: {
          value: 23,
          left: null,
          right: { value: 40, left: null, right: null },
        },
      },
    },
  },
};

/**
 * Generates a balanced binary tree with a specific number of nodes.
 */
export const generateLargeTree = (count: number): TreeNodeType => {
  let currentId = 1;

  const createNode = (targetCount: number): TreeNodeType | null => {
    if (currentId > targetCount) return null;

    const node: TreeNodeType = {
      value: currentId++,
      left: null,
      right: null,
    };

    // Calculate remaining nodes to distribute to branches
    const remaining = targetCount - currentId;
    if (remaining > 0) {
      // Divide remaining nodes roughly in half for balance
      node.left = createNode(currentId + Math.floor(remaining / 2));
      node.right = createNode(targetCount);
    }

    return node;
  };

  return createNode(count)!;
};

export const NODE_COUNT = 300;
export const treeData400 = generateLargeTree(NODE_COUNT);

const sortedArray = Array.from({ length: NODE_COUNT }, (_, i) => i + 1);
export const balancedTree = generateBalancedBST(sortedArray);
