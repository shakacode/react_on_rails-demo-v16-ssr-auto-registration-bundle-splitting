import React from 'react';
import { marked } from 'marked';
import MarkdownViewer from '../../MarkdownViewer/ror_components/MarkdownViewer';
import * as style from './RSCMarkdownPage.module.css';

/**
 * RSC (React Server Component) version of markdown display
 *
 * This component demonstrates Bob's shared component pattern:
 * - Heavy markdown processing (via 'marked' library) happens server-side
 * - The 'marked' library NEVER ships to the client
 * - Only the processed HTML is sent to the browser
 * - Uses the lightweight shared MarkdownViewer component for display
 *
 * Key benefits:
 * - Zero client-side JavaScript for markdown processing
 * - Faster initial page load
 * - Smaller client bundle size
 * - Server can access files, databases, etc.
 */
async function RSCMarkdownPage({ initialText, title, author, lastModified }) {
  // Default markdown content
  const defaultMarkdown = `# React Server Components Demo

## What's Happening Here?

This markdown is being **processed on the server** using the \`marked\` library.

The heavy markdown library (\`marked\`) is imported in this server component,
which means it:
- ✅ Runs only on the server
- ✅ Never ships to the client
- ✅ Keeps the client bundle size minimal

Compare this to the **HeavyMarkdownEditor** which processes markdown client-side
for live preview functionality.

## Shared Component Pattern

Both this RSC component and the HeavyMarkdownEditor use the same lightweight
\`MarkdownViewer\` component to display the processed HTML.

\`\`\`
Server Component (RSC)        Client Component (Editor)
     |                              |
     |--[imports marked]            |--[imports react-markdown]
     |--[processes MD]              |--[processes MD]
     |                              |
     +------[MarkdownViewer]--------+
            (lightweight, no deps)
\`\`\`

## Features Demonstrated

### GitHub Flavored Markdown

- [x] Task lists
- [x] Tables
- [x] Code blocks
- [ ] More features to come

### Code Highlighting

\`\`\`javascript
const serverComponent = async () => {
  // Heavy processing on server
  const html = await marked(markdown);
  return <MarkdownViewer processedHtml={html} />;
};
\`\`\`

### Tables

| Feature | Client-Side | Server-Side (RSC) |
|---------|-------------|-------------------|
| Bundle Size | Large (~1.1MB) | Minimal (~12KB) |
| Processing | Client | Server |
| Interactivity | High | Static |
| SEO | Good (after hydration) | Excellent (immediate) |

### Quotes

> "React Server Components represent a paradigm shift in how we think about
> bundle splitting and server/client boundaries." - React Team

## Try It Out!

1. Check the network tab - notice no markdown library is downloaded
2. View page source - the HTML is already rendered
3. Compare bundle sizes: this page vs HeavyMarkdownEditor
`;

  const markdown = initialText || defaultMarkdown;

  // Server-side markdown processing using 'marked'
  // This heavy library stays on the server and never ships to client
  const processedHtml = await marked(markdown, {
    gfm: true, // GitHub Flavored Markdown
    breaks: true,
  });

  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2 className={style.title}>RSC Markdown Page</h2>
        <p className={style.subtitle}>
          Server-rendered markdown - processing happens on the server, zero client-side JS for markdown!
        </p>
      </div>

      <div className={style.content}>
        <div className={style.metadataPanel}>
          <h3 className={style.panelTitle}>📄 Document Info</h3>
          <div className={style.metadata}>
            {title && (
              <div className={style.metadataItem}>
                <strong>Title:</strong> {title}
              </div>
            )}
            {author && (
              <div className={style.metadataItem}>
                <strong>Author:</strong> {author}
              </div>
            )}
            {lastModified && (
              <div className={style.metadataItem}>
                <strong>Last Modified:</strong>{' '}
                {new Date(lastModified).toLocaleDateString()}
              </div>
            )}
            <div className={style.metadataItem}>
              <strong>Rendered:</strong> Server-side (RSC)
            </div>
          </div>
        </div>

        <div className={style.markdownPanel}>
          <h3 className={style.panelTitle}>📖 Content</h3>
          <div className={style.viewerWrapper}>
            <MarkdownViewer processedHtml={processedHtml} />
          </div>
        </div>
      </div>

      <div className={style.navigation}>
        <a href="/hello_world" className={style.link}>
          ← Back to Lightweight HelloWorld
        </a>
        <a href="/heavy_markdown_editor" className={style.link}>
          View Client-Side Editor →
        </a>
        <div className={style.bundleInfo}>
          <strong>Bundle Impact:</strong> Minimal - markdown processing stays on server!
          The 'marked' library ({'>'}120KB) never ships to the client.
        </div>
      </div>
    </div>
  );
}

export default RSCMarkdownPage;
