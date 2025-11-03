"use client";

import * as React from 'react';
import { ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { TagNode } from '@/lib/types';

interface TagViewProps {
  node: TagNode;
  onToggleCollapse: (id: string) => void;
  onUpdateData: (id: string, data: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onAddChild: (id: string) => void;
}

const TagView: React.FC<TagViewProps> = ({
  node,
  onToggleCollapse,
  onUpdateData,
  onUpdateName,
  onAddChild,
}) => {
  const [isEditingName, setIsEditingName] = React.useState(false);
  const [nameValue, setNameValue] = React.useState(node.name);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isEditingName) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditingName]);

  const handleNameClick = () => {
    setNameValue(node.name);
    setIsEditingName(true);
  };

  const handleNameChangeCommit = () => {
    if (nameValue.trim() && nameValue.trim() !== node.name) {
      onUpdateName(node.id, nameValue.trim());
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleNameChangeCommit();
    } else if (e.key === 'Escape') {
      setIsEditingName(false);
    }
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <Card className="mb-4 shadow-sm bg-card border-border/60">
      <Collapsible open={!node.isCollapsed} onOpenChange={() => onToggleCollapse(node.id)}>
        <div className="flex items-center justify-between p-2 pr-3 bg-accent/20 rounded-t-lg border-b">
          <div className="flex items-center gap-1 flex-grow">
            {(node.children || node.data) && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  {node.isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  <span className="sr-only">Toggle collapse</span>
                </Button>
              </CollapsibleTrigger>
            )}
            {isEditingName ? (
              <Input
                ref={inputRef}
                value={nameValue}
                onChange={e => setNameValue(e.target.value)}
                onBlur={handleNameChangeCommit}
                onKeyDown={handleNameKeyDown}
                className="h-8 text-sm font-semibold"
              />
            ) : (
              <span
                onClick={handleNameClick}
                className="px-2 py-1 text-sm font-semibold rounded-md cursor-pointer hover:bg-accent/30 transition-colors"
              >
                {node.name}
              </span>
            )}
          </div>
          <Button size="sm" onClick={() => onAddChild(node.id)} className="shrink-0">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Child
          </Button>
        </div>

        <CollapsibleContent>
          <CardContent className="p-4">
            {node.data !== undefined && (
              <div className="flex items-center gap-2">
                <label htmlFor={`data-${node.id}`} className="text-sm font-medium text-muted-foreground">Data:</label>
                <Input
                  id={`data-${node.id}`}
                  value={node.data}
                  onChange={e => onUpdateData(node.id, e.target.value)}
                  placeholder="Enter data..."
                  className="h-9"
                />
              </div>
            )}
            {hasChildren && (
              <div className="flex flex-col gap-4">
                {node.children!.map((child) => (
                  <TagView
                    key={child.id}
                    node={child}
                    onToggleCollapse={onToggleCollapse}
                    onUpdateData={onUpdateData}
                    onUpdateName={onUpdateName}
                    onAddChild={onAddChild}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default React.memo(TagView);
