import { NODE_COUNT } from "./constants";

export class BinaryTreeNode<T> {
  public value: T;
  public left: BinaryTreeNode<T> | null = null;
  public right: BinaryTreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }

  static findNodeBST<T>(
    root: BinaryTreeNode<T> | null,
    value: T
  ): BinaryTreeNode<T> | null {
    let current: BinaryTreeNode<T> | null = root;

    while (current) {
      if (value === current.value) return current;
      if (value < current.value) current = current.left;
      else current = current.right;
    }

    return null;
  }

  static findPathToValue<T>(
    root: BinaryTreeNode<T> | null,
    target: T
  ): T[] | null {
    if (!root) return null;

    const stack: {
      node: BinaryTreeNode<T>;
      visitedLeft: boolean;
      visitedRight: boolean;
    }[] = [];

    const path: T[] = [];

    let current: BinaryTreeNode<T> | null = root;

    while (current || stack.length) {
      while (current) {
        stack.push({
          node: current,
          visitedLeft: false,
          visitedRight: false,
        });

        path.push(current.value);

        if (current.value === target) {
          return [...path];
        }

        current = current.left;
      }

      const top = stack[stack.length - 1];

      if (top.visitedLeft) {
        stack.pop();
        path.pop();
      } else {
        top.visitedLeft = true;
        current = top.node.right;
      }
    }

    return null;
  }
}

export type TreeNodeType = typeof BinaryTreeNode.prototype;

function generateBalancedBST<T>(arr: T[]) {
  if (arr.length === 0) {
    return null;
  }

  const midIndex = Math.floor(arr.length / 2);
  const root = new BinaryTreeNode(arr[midIndex]);

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

const sortedArray = Array.from({ length: NODE_COUNT }, (_, i) => i + 1);
export const balancedTree = generateBalancedBST(
  sortedArray
) as BinaryTreeNode<number>;

export type BalancedTree = typeof balancedTree;
