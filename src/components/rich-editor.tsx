'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Quote, Code, Link as LinkIcon, Link2Off, Undo, Redo, Heading2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOOLBTN =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground " +
  "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "transition-colors disabled:opacity-50 disabled:pointer-events-none " +
  "[aria-pressed=true]:bg-muted [aria-pressed=true]:text-foreground";


export default function RichEditor({
  initialHtml = '',
  onChange,
}: {
  initialHtml?: string;
  onChange?: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ 
        history: false,
        heading: { levels: [2, 3] },
      }),
      History.configure({ depth: 100 }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        protocols: ['http', 'https', 'mailto'],
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
    ],
    content: initialHtml,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
     editorProps: {
      attributes: {
        class: 'prose dark:prose-invert max-w-none min-h-[240px] focus:outline-none',
      },
      handleKeyDown(view, event) {
        const mod = event.metaKey || event.ctrlKey;
        if (mod && event.key.toLowerCase() === 'k') {
          event.preventDefault();
          const href = window.prompt('Enter URL', editor?.getAttributes('link')?.href ?? '');
          if (href) { // Note: an empty prompt returns "", which is falsy; cancel returns null.
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }
          return true;
        }
        return false;
      }
    }
  });

   useEffect(() => {
    if (!editor) return;
    // Don't reset content if it's the same, to avoid cursor jumps
    if (editor.getHTML() !== initialHtml) {
        editor.commands.setContent(initialHtml || '', false);
    }
  }, [initialHtml, editor]);

  if (!editor) return null;

  const canUndo = !!editor.can().undo?.();
  const canRedo = !!editor.can().redo?.();

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="sticky top-0 z-10 -mx-4 mb-3 flex flex-wrap items-center gap-2 border-b bg-background px-4 py-2 sm:mx-0"
      >
        <button type="button" aria-label="Bold" aria-pressed={editor?.isActive('bold') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBold().run()}>
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Italic" aria-pressed={editor?.isActive('italic') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Heading 2" aria-pressed={editor?.isActive('heading', { level: 2 }) ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Bullet list" aria-pressed={editor?.isActive('bulletList') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          <List className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Ordered list" aria-pressed={editor?.isActive('orderedList') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          <ListOrdered className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Blockquote" aria-pressed={editor?.isActive('blockquote') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleBlockquote().run()}>
          <Quote className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Code" aria-pressed={editor?.isActive('codeBlock') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
          <Code className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Link" aria-pressed={editor?.isActive('link') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => {
            const current = editor?.getAttributes('link')?.href ?? '';
            const href = window.prompt('Enter URL', current || 'https://');
            if (!href) return;
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }}>
          <LinkIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Unlink" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().unsetLink().run()}>
          <Link2Off className="h-4 w-4" />
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button type="button" aria-label="Undo" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().undo().run()} disabled={!canUndo}>
            <Undo className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Redo" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().redo().run()} disabled={!canRedo}>
            <Redo className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="min-h-[240px] px-4 pb-4 pt-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
