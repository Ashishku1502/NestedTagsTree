import type { RawTagNode, TagNode } from './types';

// The initial data structure for the tag tree as specified.
export const initialTreeData: RawTagNode = {
  name: 'root',
  children: [
    {
      name: 'child1',
      children: [
        { name: 'child1-child1', data: 'c1-c1 Hello' },
        { name: 'child1-child2', data: 'c1-c2 JS' },
      ],
    },
    { name: 'child2', data: 'c2 World' },
  ],
};

// This function should only be called on the client-side.
function generateId() {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID (e.g., older browsers, non-secure contexts)
  return `id-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}


/**
 * Recursively processes a raw tag node to add properties needed for the UI,
 * such as a unique ID and collapse state.
 * @param node The raw tag node.
 * @returns A TagNode with UI properties.
 */
export const addNodeIds = (node: RawTagNode): TagNode => {
  const newNode: TagNode = {
    ...node,
    id: generateId(),
    isCollapsed: false,
  };

  if (node.children) {
    newNode.children = node.children.map(addNodeIds);
  }

  return newNode;
};

/**
 * Finds a node by its ID in the tree and applies an update function to it,
 * returning a new tree with the updated node in an immutable way.
 * @param node The root node of the tree to search.
 * @param targetId The ID of the node to update.
 * @param updateFn The function to apply to the found node.
 * @returns A new root node with the updated node.
 */
export const findAndUpdateNode = (
  node: TagNode,
  targetId: string,
  updateFn: (node: TagNode) => TagNode
): TagNode => {
  if (node.id === targetId) {
    return updateFn(node);
  }

  if (node.children) {
    let hasChanged = false;
    const newChildren = node.children.map((child) => {
      const updatedChild = findAndUpdateNode(child, targetId, updateFn);
      if (updatedChild !== child) {
        hasChanged = true;
      }
      return updatedChild;
    });

    if (hasChanged) {
      return { ...node, children: newChildren };
    }
  }

  return node;
};

/**
 * Recursively cleans a tag node to remove UI-specific properties,
 * preparing it for export to JSON.
 * @param node The TagNode with UI properties.
 * @returns A RawTagNode containing only core data.
 */
export const cleanNodeForExport = (node: TagNode): RawTagNode => {
  const cleanedNode: RawTagNode = { name: node.name };

  if (node.data !== undefined) {
    cleanedNode.data = node.data;
  } else if (node.children && node.children.length > 0) {
    cleanedNode.children = node.children.map(cleanNodeForExport);
  }
  
  return cleanedNode;
};
