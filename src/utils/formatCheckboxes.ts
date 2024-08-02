export function formatCheckboxes(content: string): string {
  return content.replace(/- \[([ x])\] /g, (checked) => {
    return `- [${checked === 'x' ? 'x' : ' '}] `
  })
}
