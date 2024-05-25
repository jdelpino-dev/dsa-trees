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
    if (!this.root) return 0;
    let result = { maxSum: -Infinity };

    function helper(node) {
      if (!node) return 0;
      let left = Math.max(0, helper(node.left));
      let right = Math.max(0, helper(node.right));
      result.maxSum = Math.max(result.maxSum, node.val + left + right);
      return node.val + Math.max(left, right);
    }

    helper(this.root);
    return result.maxSum === -Infinity ? 0 : result.maxSum;
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

  /** areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */
  areCousins(node1, node2) {
    if (!this.root) return false;

    function getLevelAndParent(node, target, level = 0, parent = null) {
      if (!node) return null;
      if (node === target) return { level, parent };
      return (
        getLevelAndParent(node.left, target, level + 1, node) ||
        getLevelAndParent(node.right, target, level + 1, node)
      );
    }

    const node1Info = getLevelAndParent(this.root, node1);
    const node2Info = getLevelAndParent(this.root, node2);

    return (
      node1Info &&
      node2Info &&
      node1Info.level === node2Info.level &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(tree) {
    const result = [];
    function helper(node) {
      if (node === null) {
        result.push(null);
      } else {
        result.push(node.val);
        helper(node.left);
        helper(node.right);
      }
    }
    helper(tree.root);
    return JSON.stringify(result);
  }

  /** deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(stringTree) {
    const values = JSON.parse(stringTree);
    let index = 0;

    function helper() {
      if (index >= values.length || values[index] === null) {
        index++;
        return null;
      }
      const node = new BinaryTreeNode(values[index]);
      index++;
      node.left = helper();
      node.right = helper();
      return node;
    }

    const root = helper();
    return new BinaryTree(root);
  }

  /** lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    function helper(node) {
      if (!node || node === node1 || node === node2) return node;
      const left = helper(node.left);
      const right = helper(node.right);
      if (left && right) return node;
      return left ? left : right;
    }
    return helper(this.root);
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
