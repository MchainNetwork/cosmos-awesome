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
const headerAndToc = sections[0].split('## Collection')[0];

// Rebuild the markdown with the sorted collection
const updatedMarkdown =
  headerAndToc + collection + '## Contributions' + sections[1];

// Update the table of contents
const updatedTocMarkdown = toc.insert(updatedMarkdown, { maxdepth: 2 });

// Overwrite the original file
fs.writeFileSync(filePath, updatedTocMarkdown, 'utf8');

console.log('The file has been sorted and updated.');
