type TreeNode = {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
};

export const tree: TreeNode = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: {
    value: 3,
    left: { value: 6, left: null, right: null },
    right: {
      value: 7,
      left: { value: 8, left: null, right: null },
      right: { value: 9, left: null, right: null },
    },
  },
};
