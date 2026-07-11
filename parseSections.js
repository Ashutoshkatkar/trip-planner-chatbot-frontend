/**
 * Splits a markdown string on "## " headings into { title, body } sections.
 * Any content before the first heading is returned as a section with title null.
 */
export function parseSections(markdown) {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const sections = [];
  let current = { title: null, body: [] };

  for (const line of lines) {
    const match = line.match(/^##\s+(.*)$/);
    if (match) {
      if (current.title || current.body.length) sections.push(current);
      current = { title: match[1].trim(), body: [] };
    } else {
      current.body.push(line);
    }
  }
  if (current.title || current.body.length) sections.push(current);

  return sections
    .map((s) => ({ title: s.title, body: s.body.join('\n').trim() }))
    .filter((s) => s.body || s.title);
}
