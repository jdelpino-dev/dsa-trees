/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth(node = this.root) {
    if (!node) return 0;
    if (!node.left && !node.right) return 1;
    if (!node.left) return this.minDepth(node.right) + 1;
    if (!node.right) return this.minDepth(node.left) + 1;
    return Math.min(this.minDepth(node.left), this.minDepth(node.right)) + 1;
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth(node = this.root) {
    if (!node) return 0;
    return Math.max(this.maxDepth(node.left), this.maxDepth(node.right)) + 1;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum() {
    let result = { maxSum: -Infinity };

    function helper(node) {
      if (!node) return 0;
      let left = Math.max(0, helper(node.left));
      let right = Math.max(0, helper(node.right));
      result.maxSum = Math.max(result.maxSum, node.val + left + right);
      return node.val + Math.max(left, right);
    }

    helper(this.root);
    return result.maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) return null;
    let queue = [this.root];
    let nextLargerValue = null;

    while (queue.length) {
      let current = queue.shift();
      if (
        current.val > lowerBound &&
        (nextLargerValue === null || current.val < nextLargerValue)
      ) {
        nextLargerValue = current.val;
      }
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return nextLargerValue;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
