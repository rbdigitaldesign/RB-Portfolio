
'use client';

import React, { useEffect, useState } from 'react';
import { EditorContent, useEditor, type Editor, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import History from '@tiptap/extension-history';
import Link from '@tiptap/extension-link';
import { Image as TipTapImage } from '@tiptap/extension-image';
import { Bold, Italic, List, ListOrdered, Quote, Code, Link as LinkIcon, Link2Off, Undo, Redo, Heading2, Image as ImageIcon } from 'lucide-react';
import DOMPurify from 'isomorphic-dompurify';
import he from 'he';


const TOOLBTN =
  "inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background text-foreground " +
  "hover:bg-[#37605f]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "transition-colors disabled:opacity-50 disabled:pointer-events-none " +
  "[aria-pressed=true]:bg-muted [aria-pressed=true]:text-foreground";

function toDirectImgur(urlStr: string): string | null {
  try {
    const u = new URL(urlStr);
    if (u.hostname === 'i.imgur.com') return urlStr;
    if (u.hostname === 'imgur.com' || u.hostname === 'www.imgur.com') {
      const id = u.pathname.split('/').filter(Boolean).pop();
      if (!id) return null;
      return `https://i.imgur.com/${id}.jpg`;
    }
  } catch {}
  return null;
}

function isDirectImageUrl(urlStr: string): boolean {
  return /\.(png|jpe?g|gif|webp)$/i.test(urlStr);
}

const IMAGE_BASE = 'mx-auto my-4 h-auto rounded-md';
const SIZE_PRESETS = { sm: 'max-w-md', md: 'max-w-xl', full: 'w-full' } as const;
const ALIGN_PRESETS = { left: 'float-left mr-4', center: 'mx-auto', right: 'float-right ml-4' } as const;

const imageExt = TipTapImage.configure({
  inline: false,
  HTMLAttributes: {
    class: `${IMAGE_BASE} ${SIZE_PRESETS.md} ${ALIGN_PRESETS.center}`,
    loading: 'lazy',
    referrerpolicy: 'no-referrer',
    rel: 'noreferrer',
  },
});

function updateImageAttrs(editor: any, attrs: Record<string, any>) {
  if (!editor) return;

  const { state } = editor;
  const { from, to } = state.selection;

  let imgPos: number | null = null;

  state.doc.nodesBetween(from, to, (node: any, pos: number) => {
    if (node.type?.name === 'image') {
      imgPos = pos;
      return false;
    }
  });

  if (imgPos == null && editor.isActive('image')) {
    editor.chain().focus().updateAttributes('image', attrs).run();
    return;
  }

  if (imgPos != null) {
    editor
      .chain()
      .focus()
      .setNodeSelection(imgPos)
      .updateAttributes('image', attrs)
      .run();
  }
}

function buildImgClass({
  size,
  align,
}: {
  size?: keyof typeof SIZE_PRESETS;
  align?: keyof typeof ALIGN_PRESETS;
}) {
  const s = size ? SIZE_PRESETS[size] : SIZE_PRESETS.md;
  const a = align ? ALIGN_PRESETS[align] : ALIGN_PRESETS.center;
  return `${IMAGE_BASE} ${s} ${a}`;
}


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
      imageExt,
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
          if (href) {
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }
          return true;
        }
        return false;
      },
      handlePaste(view, event, slice) {
        const text = event.clipboardData?.getData('text/plain')?.trim();
        if (text && /^https?:\/\//i.test(text)) {
          const direct = isDirectImageUrl(text) ? text : toDirectImgur(text);
          if (direct) {
            event.preventDefault();
            editor?.chain().focus().setImage({ src: direct, alt: '' }).run();
            return true;
          }
        }
        
        const html = event.clipboardData?.getData('text/html');
        if (html) {
            event.preventDefault();
            const clean = DOMPurify.sanitize(html, {
                USE_PROFILES: { html: true },
                ALLOWED_TAGS: ['p','br','strong','em','u','s','ul','ol','li','blockquote','code','pre','a','img','figure','figcaption','iframe','h2','h3','h4'],
                ALLOWED_ATTR: ['href','title','target','rel','src','alt','width','height','loading','referrerpolicy','class','allow','allowfullscreen'],
            });
            if (clean) {
                editor?.commands.insertContent(clean);
                return true;
            }
        }

        return false;
      }
    }
  });
  
  const [imgWidthPct, setImgWidthPct] = useState<number>(100);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      if (!editor.isActive('image')) return;
      const attrs = editor.getAttributes('image') || {};
      const m = /width:\s*(\d+)%/.exec(attrs.style || '');
      setImgWidthPct(m ? Number(m[1]) : 100);
    };

    editor.on('selectionUpdate', update);
    editor.on('transaction', update);
    return () => {
      editor.off('selectionUpdate', update);
      editor.off('transaction', update);
    };
  }, [editor]);


   useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== initialHtml) {
        editor.commands.setContent(initialHtml || '', false);
    }
  }, [initialHtml, editor]);

  if (!editor) return null;

  const canUndo = !!editor.can().undo?.();
  const canRedo = !!editor.can().redo?.();
  
  const handleImageInsert = () => {
    const url = window.prompt('Paste image URL (https://…)');
    if (!url) return;
    editor?.chain().focus().setImage({
      src: url,
      alt: '',
      class: buildImgClass({ size: 'md', align: 'center' }),
      style: 'width:100%;',
      loading: 'lazy',
      referrerpolicy: 'no-referrer',
      rel: 'noreferrer',
    }).run();
  };

  return (
    <div className="rounded-xl border bg-background shadow-sm">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="sticky top-0 z-30 bg-background border-b rounded-t-md px-2 py-2 flex flex-wrap items-center gap-1"
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
        <button type="button" aria-label="Image" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={handleImageInsert}>
          <ImageIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Link" aria-pressed={editor?.isActive('link') ?? false} className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => {
            const current = editor?.getAttributes('link')?.href ?? '';
            const href = window.prompt('Enter URL', current || 'https://');
            if (!href) return;
            editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
          }}>
          <LinkIcon className="h-4 w-4" />
        </button>
        <button type="button" aria-label="Unlink" className={TOOLBTN} onMouseDown={(e) => e.preventDefault()} onClick={() => editor?.chain().focus().unsetLink().run()} disabled={!editor.isActive('link')}>
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
       {editor && (
        <BubbleMenu
          editor={editor}
          shouldShow={({ editor }) => editor.isActive('image')}
          tippyOptions={{ placement: 'top', offset: [0, 8] }}
        >
          <div className="flex items-center gap-2 p-2 bg-background border rounded-lg shadow-md">
            <span className="text-xs text-muted-foreground">Width</span>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={imgWidthPct}
              className="w-40"
              onChange={(e) => {
                const w = Number(e.target.value);
                setImgWidthPct(w);
                updateImageAttrs(editor, { style: `width:${w}%;` });
              }}
            />
            <button
              type="button"
              className={TOOLBTN}
              title="Left"
              onClick={() => updateImageAttrs(editor, { class: buildImgClass({ align: 'left' }) })}
            >⟵</button>
            <button
              type="button"
              className={TOOLBTN}
              title="Center"
              onClick={() => updateImageAttrs(editor, { class: buildImgClass({ align: 'center' }) })}
            >⦿</button>
            <button
              type="button"
              className={TOOLBTN}
              title="Right"
              onClick={() => updateImageAttrs(editor, { class: buildImgClass({ align: 'right' }) })}
            >⟶</button>
            <button
              type="button"
              className={TOOLBTN}
              title="Reset"
              onClick={() => {
                setImgWidthPct(100);
                updateImageAttrs(editor, {
                  class: buildImgClass({ size: 'md', align: 'center' }),
                  style: '',
                });
              }}
            >Reset</button>
          </div>
        </BubbleMenu>
      )}
      <div className="min-h-[240px] px-4 pb-4 pt-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

