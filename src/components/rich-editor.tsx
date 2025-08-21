
'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
};

export default function RichEditor({ initialHtml = '', onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      History.configure({
        depth: 100,
        newGroupDelay: 500,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.commands.setContent(initialHtml || '', false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialHtml, editor]);

  if (!editor) return null;

  const canUndo = !!editor.can().undo?.();
  const canRedo = !!editor.can().redo?.();

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-1 rounded-md bg-muted/70 p-1">
        <button
          type="button"
          title="Bold (⌘/Ctrl+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('bold')}
        >
          Bold
        </button>

        <button
          type="button"
          title="Italic (⌘/Ctrl+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('italic')}
        >
          Italic
        </button>

        <button
          type="button"
          title="Bulleted list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('bulletList')}
        >
          • List
        </button>

        <button
          type="button"
          title="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('orderedList')}
        >
          1. List
        </button>

        <button
          type="button"
          title="Quote"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('blockquote')}
        >
          Quote
        </button>

        <button
          type="button"
          title="Code"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring data-[active=true]:bg-primary/10 data-[active=true]:text-primary"
          data-active={editor.isActive('codeBlock')}
        >
          Code
        </button>

        <button
          type="button"
          title="Link (⌘/Ctrl+K)"
          onClick={() => {
            const url = window.prompt('Enter URL');
            if (!url) return;
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
          }}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Link
        </button>

        <button
          type="button"
          title="Unlink"
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          Unlink
        </button>

        <button
          type="button"
          title="Undo (⌘/Ctrl+Z)"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!canUndo}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          Undo
        </button>

        <button
          type="button"
          title="Redo (⌘/Ctrl+Shift+Z)"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!canRedo}
          className="px-3 py-1 text-xs rounded-md border bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40"
        >
          Redo
        </button>
      </div>

      <div className="rounded-md border bg-background p-3">
        <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
      </div>
    </div>
  );
}
