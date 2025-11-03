# NestedTagsTree

NestedTagsTree is a small library/tool to build and work with hierarchical (nested) tag trees from flat tag lists. It helps convert flat arrays of tags (with parent/child relationships or dot/slash-separated paths) into nested tree structures for UI rendering, searching, or exporting.

> NOTE: Replace the placeholders below (installation, usage, examples, license, etc.) with your project's exact commands and details.

## Features

- Build nested tag trees from flat tag lists
- Support for parent-id relationships and path-based tags
- Utility helpers to traverse, search, and flatten trees
- Small, dependency-free core (adapt as needed)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Node / JavaScript example](#node--javascript-example)
  - [Path-based example](#path-based-example)
- [API](#api)
- [Running tests](#running-tests)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Author / Contact](#author--contact)

## Installation

Replace with correct package manager and package name.

- Using npm:
  npm install nested-tags-tree

- Using yarn:
  yarn add nested-tags-tree

Or clone this repo and build locally:

git clone https://github.com/your-username/NestedTagsTree.git
cd NestedTagsTree
# install deps and build (replace with real commands)
npm install
npm run build

## Usage

Basic JS example (CommonJS):

const { buildTree } = require('nested-tags-tree');

const tags = [
  { id: 1, name: 'root', parentId: null },
  { id: 2, name: 'child A', parentId: 1 },
  { id: 3, name: 'child B', parentId: 1 },
  { id: 4, name: 'grandchild', parentId: 2 }
];

const tree = buildTree(tags, { idKey: 'id', parentKey: 'parentId', childrenKey: 'children' });
console.log(JSON.stringify(tree, null, 2));

ES module example:

import { buildTree } from 'nested-tags-tree';
const tree = buildTree(tags);
console.log(tree);

### Path-based example

If your tags are stored as paths:

const paths = ['animals/mammals/dog', 'animals/birds/sparrow', 'plants/tree/oak'];
const tree = buildFromPaths(paths, { separator: '/' });

## API

Document the exported functions/classes here. Example:

- buildTree(items, options)
  - items: Array of objects with id and parent id
  - options:
    - idKey (string) default: 'id'
    - parentKey (string) default: 'parentId'
    - childrenKey (string) default: 'children'
    - rootParentValues (Array|Set) default: [null, undefined, 0]

- buildFromPaths(paths, options)
  - paths: Array of strings like 'a/b/c'
  - options:
    - separator: '/' (default)
    - makeNodes?: callback to map path segment to node object

- flattenTree(tree, options)
  - flattens nested tree back into array

(Replace these signatures with your real API and examples.)

## Running tests

# replace with your test command
npm test

## Development

- Linting: npm run lint
- Formatting: npm run format
- Build: npm run build
- Example app: cd examples && npm start

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo
2. Create a feature branch: git checkout -b feat/your-feature
3. Make changes and add tests
4. Run tests and linters
5. Open a Pull Request describing your changes

Please follow the project's code style and include tests for new features and bug fixes.


