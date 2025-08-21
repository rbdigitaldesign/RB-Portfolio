
'use client';

import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import { Bold, Italic, List, ListOrdered, Quote, Code, Link as LinkIcon, Link2Off, Undo, Redo, Heading2 } from 'lucide-react';
import { cn } from '@/lib/utils';


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

  const ToolbarButton = ({
    label,
    onClick,
    isActive,
    isDisabled,
    children,
  }: {
    label: string;
    onClick: () => void;
    isActive?: boolean;
    isDisabled?: boolean;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      title={label}
      aria-label={label}
      onClick={(e) => { e.preventDefault(); onClick(); }}
      disabled={isDisabled}
      aria-pressed={!!isActive}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border text-sm text-foreground",
        "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "aria-pressed:bg-muted bg-background",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {children}
    </button>
  );

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="sticky top-0 z-10 -mx-4 mb-3 flex flex-wrap items-center gap-1 rounded-t-xl border-b bg-card px-3 py-2 shadow-sm sm:mx-0"
      >
        <ToolbarButton label="Bold (Cmd+B)" onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
            <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Italic (Cmd+I)" onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
            <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Heading 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
            <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Bulleted list" onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
            <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Numbered list" onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')}>
            <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
         <ToolbarButton label="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
            <Quote className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Code block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
            <Code className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Link (Cmd+K)" onClick={() => {
            const href = window.prompt('Enter URL', editor.getAttributes('link')?.href ?? '');
            if (href) {
                editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
            }
        }} isActive={editor.isActive('link')}>
            <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Unlink" onClick={() => editor.chain().focus().unsetLink().run()} isDisabled={!editor.isActive('link')}>
            <Link2Off className="h-4 w-4" />
        </ToolbarButton>
        <div className="ml-auto flex items-center gap-1">
            <ToolbarButton label="Undo (Cmd+Z)" onClick={() => editor.chain().focus().undo().run()} isDisabled={!canUndo}>
                <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton label="Redo (Cmd+Shift+Z)" onClick={() => editor.chain().focus().redo().run()} isDisabled={!canRedo}>
                <Redo className="h-4 w-4" />
            </ToolbarButton>
        </div>
      </div>
      <div className="min-h-[240px] px-4 pb-4 pt-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
