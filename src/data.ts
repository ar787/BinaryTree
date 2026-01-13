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

const sortedArray = Array.from({ length: NODE_COUNT }, (_, i) => i + 1);
export const balancedTree = generateBalancedBST(
  sortedArray
) as BinaryTreeNode<number>;

export type BalancedTree = typeof balancedTree;
