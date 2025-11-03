# Nested Tags Tree

A small web application built with Next.js for creating, editing and visualizing a hierarchical tree of tags. The app provides an intuitive UI for building nested structures, editing node metadata and exporting the tree as JSON.

## Key Features

- Dynamic Tree View: create and display a hierarchical tree of tags with nested children.
- Add Children: add new child nodes to any tag.
- Edit Names and Data: inline editing of tag names and associated data.
- Collapsible Nodes: expand and collapse parent nodes to navigate large trees.
- Export to JSON: export the entire tree structure to a clean JSON file.
- Persisted Local State: the UI state can be saved and reloaded from localStorage (if enabled in the app).

## Quick Links (where to look in the codebase)

- Main app entry: `src/app/page.tsx`
- Tree rendering component(s): `src/components/tag-view.tsx`
- Data manipulation and helpers: `src/lib/tree-data.ts`
- Common UI primitives or hooks: `src/components/*` and `src/lib/*`

(If filenames have moved, search the repository for `tag-view`, `tree-data` or `page.tsx`.)

## Local Development

Requirements
- Node.js 18+ (recommended)
- npm (or yarn/pnpm)

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

Build for production:
```bash
npm run build
npm run start
```

Other useful scripts (if present in package.json):
- npm run lint — run linting tools
- npm run test — run tests (if any)

## Usage / UX Notes

- Click a node to edit its name or data.
- Use the "Add child" control on any node to create a nested tag.
- Click the collapse/expand icon to hide or show a node's children.
- Use the "Export" button to download the tree as a JSON file. The exported structure is a nested array/object structure representing each node and its children.

Example exported JSON structure:
```json
[
  {
    "id": "root-1",
    "name": "Root",
    "data": { "color": "blue" },
    "children": [
      {
        "id": "child-1",
        "name": "Child",
        "data": {},
        "children": []
      }
    ]
  }
]
```

## Development Notes

- The tree data utilities in `src/lib/tree-data.ts` contain functions for adding/removing/updating nodes and traversing trees. If you need to modify the persistence or serialization format, start there.
- The UI components in `src/components/tag-view.tsx` are responsible for rendering nodes and handling user interactions (edit, add child, collapse).
- If you add features that change the data shape, make sure the export and import logic are kept in sync.

## Contributing

Contributions are welcome. A good way to start:
1. Fork the repository.
2. Create a branch for your change.
3. Add tests (if applicable) and update the README if you change behavior or APIs.
4. Open a pull request describing the change.

Please follow existing code style and run linters/tests before opening a PR.

## License

Include your preferred license here (e.g., MIT). If you don't want to specify one, add a LICENSE file to the repo.

## Contact

For questions or suggestions, open an issue in this repository.
