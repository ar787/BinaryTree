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
