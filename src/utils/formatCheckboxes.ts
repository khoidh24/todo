// utils/formatContent.ts

export function formatCheckboxes(content: string): string {
  return content.replace(/- \[([ x])\] /g, (match, checked) => {
    return `- [${checked === 'x' ? 'x' : ' '}] `
  })
}
