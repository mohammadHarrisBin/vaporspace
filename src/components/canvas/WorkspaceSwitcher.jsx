import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Plus, Trash2 } from 'lucide-react';

export default function WorkspaceSwitcher({ canvases, currentCanvas, onSelect, onCreate, onRename, onDelete }) {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [newName, setNewName] = useState('');
  const ref = useRef(null);

  useEffect(() => {
    const handler = e => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setEditing(false); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleDoubleClick = e => {
    e.stopPropagation();
    setEditing(true);
    setEditValue(currentCanvas?.title || '');
    setOpen(false);
  };

  const saveEdit = () => {
    const t = editValue.trim();
    if (t && t !== currentCanvas?.title) onRename(t);
    setEditing(false);
  };

  const handleCreate = () => {
    if (newName.trim()) {
      onCreate(newName.trim());
      setNewName('');
      setOpen(false);
    }
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    e.preventDefault();
    if (window.confirm('Delete this workspace? This cannot be undone.')) {
      onDelete(id);
      setOpen(false);
    }
  };

  if (editing) {
    return (
      <div className="flex items-center" ref={ref}>
        <input
          autoFocus
          value={editValue}
          onChange={e => setEditValue(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditing(false); }}
          className="w-44 sm:w-64 bg-card border border-border rounded-md px-2 py-0.5 text-sm font-medium text-foreground outline-none focus:border-primary/40"
        />
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        onDoubleClick={handleDoubleClick}
        title="Click to switch · Double-click to rename"
        className="flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-[260px]"
      >
        <span className="truncate">{currentCanvas?.title || 'Untitled'}</span>
        <ChevronDown size={13} className="text-muted-foreground shrink-0" />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-72 rounded-lg border border-border bg-card shadow-[0_16px_50px_rgba(0,0,0,.35)] backdrop-blur-xl z-50 p-2">
          <div className="max-h-64 overflow-y-auto">
            {canvases.map(c => (
              <div
                key={c.id}
                onClick={() => { onSelect(c.id); setOpen(false); }}
                className={`flex items-center justify-between gap-2 rounded-md px-3 py-2 cursor-pointer text-sm transition-colors ${c.id === currentCanvas?.id ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'}`}
              >
                <span className="truncate flex-1">{c.title}</span>
                <button onMouseDown={e => e.preventDefault()} onClick={(e) => handleDelete(c.id, e)} className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded shrink-0 transition-colors" aria-label="Delete workspace" title="Delete workspace">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t border-border mt-2 pt-2">
            <div className="flex items-center gap-2 px-1">
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleCreate(); }}
                placeholder="New workspace name…"
                className="flex-1 bg-background border border-border rounded-md px-2.5 py-1.5 text-sm text-foreground outline-none focus:border-primary/40 placeholder:text-muted-foreground"
              />
              <button onClick={handleCreate} className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shrink-0" aria-label="Create workspace">
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}