/**
 * Represents the core data structure of a tag node,
 * suitable for import/export.
 */
export type RawTagNode = {
  name: string;
  children?: RawTagNode[];
  data?: string;
};

/**
 * Represents a tag node within the UI's state,
 * extending the raw node with properties needed for rendering and interaction.
 */
export interface TagNode extends RawTagNode {
  id: string;
  isCollapsed: boolean;
  children?: TagNode[];
}
