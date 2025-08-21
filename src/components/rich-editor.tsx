'use client';

import { useEffect, useMemo, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Simple toolbar button
function Tb({
  onClick,
  active = false,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button" // <— CRITICAL: never submit the parent form
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center rounded-md px-3 py-1.5 text-sm',
        'border border-border/60 bg-muted hover:bg-muted/70',
        active ? 'ring-2 ring-primary/40' : '',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60'
      )}
    >
      {children}
    </button>
  );
}

export default function RichEditor({
  initialHtml = '',
  onChange,
}: {
  initialHtml?: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true },
        orderedList: { keepMarks: true },
      }),
      Link.configure({
        openOnClick: false, // we’ll handle clicks to avoid navigating away
        autolink: true,
        protocols: ['http', 'https', 'mailto', 'tel'],
      }),
    ],
    content: initialHtml || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          'min-h-[240px] w-full rounded-md border border-input bg-background p-3 text-sm leading-6 focus:outline-none',
      },
      handleClickOn: (view, pos, node, nodePos, event) => {
        // prevent clicking <a> tags from navigating away in admin screens
        const target = event.target as HTMLElement;
        if (target.closest('a')) {
          event.preventDefault();
          return true;
        }
        return false;
      },
    },
  });

  // Keyboard shortcuts (Cmd/Ctrl-B, Cmd/Ctrl-I, Cmd/Ctrl-K)
  useEffect(() => {
    if (!editor) return;
    function onKey(e: KeyboardEvent) {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;
      // Bold
      if (e.key.toLowerCase() === 'b') {
        e.preventDefault();
        editor.chain().focus().toggleBold().run();
      }
      // Italic
      if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        editor.chain().focus().toggleItalic().run();
      }
      // Link
      if (e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const url = window.prompt('Enter URL') || '';
        if (!url) {
          editor.chain().focus().unsetLink().run();
        } else {
          editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap gap-2 rounded-md border border-border/60 bg-muted p-2"
      >
        <Tb
          title="Bold (⌘/Ctrl+B)"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </Tb>
        <Tb
          title="Italic (⌘/Ctrl+I)"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </Tb>
        <Tb
          title="Bullet list"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </Tb>
        <Tb
          title="Numbered list"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </Tb>
        <Tb
          title="Blockquote"
          active={editor.isActive('blockquote')}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          Quote
        </Tb>
        <Tb
          title="Code block"
          active={editor.isActive('codeBlock')}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          Code
        </Tb>
        <Tb
          title="Link (⌘/Ctrl+K)"
          active={editor.isActive('link')}
          onClick={() => {
            const url = window.prompt('Enter URL') || '';
            if (!url) {
              editor.chain().focus().unsetLink().run();
            } else {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run();
            }
          }}
        >
          Link
        </Tb>
        <Tb
          title="Remove link"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          Unlink
        </Tb>
        <Tb title="Undo" onClick={() => editor.chain().focus().undo().run()}>
          Undo
        </Tb>
        <Tb title="Redo" onClick={() => editor.chain().focus().redo().run()}>
          Redo
        </Tb>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
