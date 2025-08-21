
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
      <div
        role="toolbar"
        aria-label="Formatting"
        className="mb-2 inline-flex flex-wrap gap-1 rounded-md border bg-background px-1 py-1 shadow-sm"
      >
        {[
          {
            label: 'B',
            title: 'Bold (⌘/Ctrl+B)',
            active: editor.isActive('bold'),
            onClick: () => editor.chain().focus().toggleBold().run(),
          },
          {
            label: 'I',
            title: 'Italic (⌘/Ctrl+I)',
            active: editor.isActive('italic'),
            onClick: () => editor.chain().focus().toggleItalic().run(),
          },
          {
            label: 'H2',
            title: 'Heading 2',
            active: editor.isActive('heading', { level: 2 }),
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          },
          {
            label: '•',
            title: 'Bulleted list',
            active: editor.isActive('bulletList'),
            onClick: () => editor.chain().focus().toggleBulletList().run(),
          },
          {
            label: '1.',
            title: 'Numbered list',
            active: editor.isActive('orderedList'),
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
          },
          {
            label: '<>',
            title: 'Code block',
            active: editor.isActive('codeBlock'),
            onClick: () => editor.chain().focus().toggleCodeBlock().run(),
          },
          {
            label: '🔗',
            title: 'Link (⌘/Ctrl+K)',
            active: editor.isActive('link'),
            onClick: () => {
              const url = window.prompt('Enter URL');
              if (url) editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            },
          },
          {
            label: '⌫',
            title: 'Unlink',
            active: false,
            onClick: () => editor.chain().focus().unsetLink().run(),
          },
        ].map((b, i) => (
          <button
            key={i}
            type="button"
            title={b.title}
            onClick={b.onClick}
            className={[
              'min-w-8 rounded-md border px-2 py-1 text-xs leading-none',
              'hover:bg-accent hover:text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              b.active ? 'bg-primary/10 text-primary' : 'bg-background'
            ].join(' ')}
            aria-pressed={b.active || false}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border bg-background p-3">
        <EditorContent editor={editor} className="prose max-w-none focus:outline-none" />
      </div>
    </div>
  );
}
