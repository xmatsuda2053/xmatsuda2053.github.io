const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const htmlFileName = process.argv[2] || 'index.html';
const htmlFilePath = path.join(distPath, htmlFileName);

fs.readFile(htmlFilePath, 'utf-8', (err, htmlData) => {
  if (err) throw err;

  const regex = /<script\s.+\s+src="(.+\.js)"><\/script>/g;
  let result = htmlData;
  let match;
  while ((match = regex.exec(htmlData)) !== null) {
    const jsFilePath = path.join(distPath, match[1]);
    const jsContent = fs.readFileSync(jsFilePath, 'utf-8');
    result = result.replace(match[0], `<script>${jsContent}</script>`);
  }

  fs.writeFile(htmlFilePath, result, 'utf-8', (err) => {
    if (err) throw err;
    console.log('Script tags have been replaced with inline JS content.');
  });
});
