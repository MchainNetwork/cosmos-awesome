const fs = require('fs');
const toc = require('markdown-toc');

// Read the markdown file
const filePath = 'README.md';
const markdown = fs.readFileSync(filePath, 'utf8');

// Split the markdown into sections
const sections = markdown.split('## Contributions');

// Extract and sort the collection section
const collectionSections = sections[0].split(/\n(?=### )/).slice(1);
collectionSections.sort((a, b) =>
  a.localeCompare(b, undefined, { sensitivity: 'base' })
);

// Rebuild the collection section
const collection = '## Collection\n\n' + collectionSections.join('\n');

// Extract the header and TOC section
const header = sections[0].split('## Table of Contents')[0];

// Rebuild the markdown without the old TOC
let updatedMarkdown = header + collection + '## Contributions' + sections[1];

// Create a new sorted TOC
const tocItems = collectionSections
  .map((section) => {
    const title = section.split('\n')[0].slice(4);
    const anchor = title.toLowerCase().replace(/ /g, '-');
    return `- [${title}](#${anchor})`;
  })
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

// Insert the new sorted TOC into the markdown
updatedMarkdown = updatedMarkdown.replace(
  header,
  header + '## Table of Contents\n' + tocItems.join('\n') + '\n'
);

// Overwrite the original file
fs.writeFileSync(filePath, updatedMarkdown, 'utf8');

console.log('The file has been sorted and updated.');
