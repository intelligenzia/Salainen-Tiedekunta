import { BLOCKS, type Block, type Document, type Inline, type Text } from '@contentful/rich-text-types';

export type ProseBlock = { kind: 'heading' | 'paragraph' | 'bullet'; text: string };

function textOf(node: Block | Inline | Text): string {
  if (node.nodeType === 'text') return (node as Text).value;
  return (node as Block).content.map((child) => textOf(child as Block)).join('');
}

/**
 * Flattens a Contentful rich-text document into plain blocks that every
 * platform renderer (SwiftUI, Compose, web) can draw. Marks are dropped and
 * empty spacer paragraphs are skipped.
 */
export function toProseBlocks(doc: Document | undefined): ProseBlock[] {
  if (!doc) return [];
  const blocks: ProseBlock[] = [];

  const visit = (node: Block) => {
    switch (node.nodeType) {
      case BLOCKS.HEADING_1:
      case BLOCKS.HEADING_2:
      case BLOCKS.HEADING_3:
      case BLOCKS.HEADING_4:
      case BLOCKS.HEADING_5:
      case BLOCKS.HEADING_6:
        blocks.push({ kind: 'heading', text: textOf(node).trim() });
        return;
      case BLOCKS.PARAGRAPH:
        blocks.push({ kind: 'paragraph', text: textOf(node).replace(/ /g, ' ').trim() });
        return;
      case BLOCKS.LIST_ITEM:
        blocks.push({ kind: 'bullet', text: textOf(node).trim() });
        return;
      default:
        node.content.forEach((child) => visit(child as Block));
    }
  };

  doc.content.forEach((node) => visit(node as Block));
  return blocks.filter((b) => b.text.length > 0);
}
