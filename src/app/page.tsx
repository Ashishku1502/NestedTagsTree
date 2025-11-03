"use client";

import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import TagView from '@/components/tag-view';
import { initialTreeData, addNodeIds, findAndUpdateNode, cleanNodeForExport } from '@/lib/tree-data';
import type { TagNode } from '@/lib/types';
import { FileJson2 } from 'lucide-react';

export default function Home() {
  const [tree, setTree] = useState<TagNode | null>(null);
  const [exportedJson, setExportedJson] = useState('');

  useEffect(() => {
    setTree(addNodeIds(initialTreeData));
  }, []);

  const handleToggleCollapse = (id: string) => {
    setTree(prevTree => prevTree ? findAndUpdateNode(prevTree, id, node => ({ ...node, isCollapsed: !node.isCollapsed })) : null);
  };

  const handleUpdateData = (id: string, data: string) => {
    setTree(prevTree => prevTree ? findAndUpdateNode(prevTree, id, node => ({ ...node, data })) : null);
  };

  const handleUpdateName = (id: string, name: string) => {
    setTree(prevTree => prevTree ? findAndUpdateNode(prevTree, id, node => ({ ...node, name })) : null);
  };

  const handleAddChild = (id: string) => {
    setTree(prevTree => prevTree ? findAndUpdateNode(prevTree, id, node => {
      const newChild = addNodeIds({ name: 'New Child', data: 'Data' });
      const newChildren = node.children ? [...node.children, newChild] : [newChild];
      const { data, ...rest } = node; // Remove data property
      return { ...rest, children: newChildren, isCollapsed: false };
    }) : null);
  };

  const handleExport = () => {
    if (tree) {
      const cleanedTree = cleanNodeForExport(tree);
      setExportedJson(JSON.stringify(cleanedTree, null, 2));
    }
  };
  
  const memoizedTagView = useMemo(() => {
    if (!tree) return null;
    return (
      <TagView
        node={tree}
        onToggleCollapse={handleToggleCollapse}
        onUpdateData={handleUpdateData}
        onUpdateName={handleUpdateName}
        onAddChild={handleAddChild}
      />
    );
  }, [tree]);

  return (
    <main className="container mx-auto p-4 sm:p-6 md:p-8">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Nested Tags Tree
        </h1>
        <Dialog onOpenChange={(isOpen) => isOpen && handleExport()}>
          <DialogTrigger asChild>
            <Button>
              <FileJson2 className="mr-2 h-4 w-4" />
              Export JSON
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Exported Tree Structure</DialogTitle>
            </DialogHeader>
            <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-md bg-muted/50 p-4">
              <pre className="text-sm font-code text-foreground">{exportedJson}</pre>
            </div>
          </DialogContent>
        </Dialog>
      </header>
      
      <div className="max-w-4xl mx-auto">
        {memoizedTagView}
      </div>
    </main>
  );
}
