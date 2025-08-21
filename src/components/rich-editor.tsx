'use client';
import React, {useEffect, useState} from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// A tiny helper to register Cmd/Ctrl+K shortcuts
const LinkShortcuts = Link.extend({
  addKeyboardShortcuts() {
    return {
      // Open link dialog
      'Mod-k': () => {
        // trigger a custom event the component listens for
        (this.editor as any).commands.dispatchCustomEvent?.('open-link-dialog');
        return true;
      },
      // Remove link
      'Shift-Mod-k': () => this.editor.commands.unsetLink(),
    };
  },
});

type Props = {
  initialHtml?: string;
  onChange?: (html: string) => void;
  className?: string;
};

export default function RichEditor({ initialHtml = '', onChange, className }: Props) {
  const [showLinkUI, setShowLinkUI] = useState(false);
  const [url, setUrl] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2,3,4] }}),
      LinkShortcuts.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer', target: '_blank' },
      }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: { class: 'prose prose-neutral dark:prose-invert min-h-[180px] focus:outline-none' },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  // let the extension tell us to open the dialog
  useEffect(() => {
    if (!editor) return;
    (editor.commands as any).dispatchCustomEvent = (name: string) => {
      if (name === 'open-link-dialog') {
        const prev = editor.getAttributes('link')?.href ?? '';
        setUrl(prev);
        setShowLinkUI(true);
      }
    };
  }, [editor]);

  if (!editor) return null;

  const applyLink = () => {
    // empty => remove
   if (!url) {
      editor.chain().focus().unsetLink().run();
    } else {
      // ensure selection (expand if cursor is inside a word)
      if (editor.state.selection.empty) editor.commands.selectParentNode();
      editor.chain().focus().setLink({ href: url }).run();
    }
    setShowLinkUI(false);
    editor.chain().focus().run();
  };

  return (
    <div className={cn('rounded-lg border', className)}>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/40 p-2">
        <Button size="sm" variant={editor.isActive('bold') ? 'default' : 'outline'}
          aria-label="Bold (Cmd+B)" title="Bold (Cmd+B)"
          onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button size="sm" variant={editor.isActive('italic') ? 'default' : 'outline'}
          aria-label="Italic (Cmd+I)" title="Italic (Cmd+I)"
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button size="sm" variant={editor.isActive('bulletList') ? 'default' : 'outline'}
          aria-label="Bullet list" title="Bullet list"
          onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </Button>
        <Button size="sm" variant={editor.isActive('orderedList') ? 'default' : 'outline'}
          aria-label="Numbered list" title="Numbered list"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          1. List
        </Button>
        <div className="ml-1 h-6 w-px bg-border" aria-hidden />
        <Button size="sm" variant={editor.isActive('link') ? 'default' : 'outline'}
          aria-label="Add link (Cmd+K)" title="Add link (Cmd+K)"
          onClick={() => {
            const prev = editor.getAttributes('link')?.href ?? '';
            setUrl(prev);
            setShowLinkUI(true);
          }}>
          Link
        </Button>
        <Button size="sm" variant="outline"
          aria-label="Remove link (Shift+Cmd+K)" title="Remove link (Shift+Cmd+K)"
          onClick={() => editor.chain().focus().unsetLink().run()}>
          Unlink
        </Button>
      </div>

      {/* Editable area */}
      <div className="p-3">
        <EditorContent editor={editor} />
      </div>

      {/* Minimal, accessible link dialog */}
      {showLinkUI && (
        <div
          role="dialog" aria-modal="true" aria-label="Insert link"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setShowLinkUI(false);
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) applyLink();
          }}
        >
          <div className="w-full max-w-md rounded-lg bg-background p-4 shadow-lg outline outline-1 outline-border">
            <label className="block text-sm font-medium mb-2" htmlFor="editor-link-input">
              URL
            </label>
            <input
              id="editor-link-input"
              className="w-full rounded-md border px-3 py-2 outline-none focus-visible:ring"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoFocus
            />
            <div className="mt-3 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowLinkUI(false)}>Cancel</Button>
              <Button onClick={applyLink} title="Apply (Cmd+Enter)">Apply</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}