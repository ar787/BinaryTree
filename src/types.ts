import type { BalancedTree } from "./data";

export type BaseProps = {
  node: BalancedTree;
  x: number;
  y: number;
  offset: number;
  depth: number;
  foundedValue: number | null;
};
