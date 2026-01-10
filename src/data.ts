import type { TreeNodeType } from "./types";

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

export const treeData400 = generateLargeTree(40);
