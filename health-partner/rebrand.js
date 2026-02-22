const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.html') || file.endsWith('.md') || file.endsWith('.json')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
files.push('./index.html');
files.push('./vite.config.js');
files.push('./public/manifest.json');

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf8');
    let original = content;
    
    content = content.replace(/VYTAL/g, 'VYVON');
    content = content.replace(/Vytal/g, 'Vyvon');
    content = content.replace(/vytal-/g, 'vyvon-');

    if (content !== original) {
      fs.writeFileSync(f, content, 'utf8');
      console.log('Rebranded:', f);
    }
  }
});
