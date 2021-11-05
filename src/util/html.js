let fs = require('fs');

function isKeyInObject(obj, key) {
  var res = Object.keys(obj).some((v) => v == key);
  return res;
}

const getHTML = (title, contents, lang, theme) => `<!doctype html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
    .container {
        width: 70%;
        margin: 0 auto;
    }
    ${theme && getThemeStyle(theme)}
    </style>
</head>
<body>
<div class="container">
${contents}
</div>
</body>
</html>
`;

function getThemeStyle(theme) {
  return theme === 'dark'
    ? `body {background-color: black; color: white;}`
    : `body {background-color: white; color: black;}`;
}

async function HTMLgenerator(argv) {
  const { input, lang, theme } = argv;
  //console.log("test:", argv);
  let files = [];
  if (fs.lstatSync(input).isDirectory()) {
    const filesFromDir = await fs.promises.readdir(input, 'utf-8');
    files = filesFromDir.map((e) => `${input}/${e}`);
  } else {
    files.push(input);
  }

  for (const file of files) {
    const res = await fs.promises.readFile(file, 'utf-8');
    const fileType = file.split('.').pop();
    let html = '';
    const deli = process.platform === 'win32' ? '\r\n' : '\n';
    if (fileType == 'md') {
      let resArr = res.split(deli);
      resArr
        .filter((e) => e)
        .map((e) => {
          if (e.includes('###### '))
            html += `<h6>${e.replace('###### ', ' ').trim()}</h6>${deli}`;
          else if (e.includes('##### '))
            html += `<h5>${e.replace('##### ', ' ').trim()}</h5>${deli}`;
          else if (e.includes('#### '))
            html += `<h4>${e.replace('#### ', ' ').trim()}</h4>${deli}`;
          else if (e.includes('### '))
            html += `<h3>${e.replace('### ', ' ').trim()}</h3>${deli}`;
          else if (e.includes('## '))
            html += `<h2>${e.replace('## ', ' ').trim()}</h2>${deli}`;
          else if (e.includes('# '))
            html += `<h1>${e.replace('# ', ' ').trim()}</h1>${deli}`;
          else if (e === '---') html += `<hr>${deli}`;
          else html += `<p>${e}</p>${deli}`;
        })
        .join(' ');
    } else if (fileType == 'txt') {
      let resArr = res.split('\n\n');
      resArr.forEach((e, i) => {
        if (i === 0) {
          html += `<h1>${e}</h1>\n`;
        } else {
          html += `<p>${e}</p>\n`;
        }
      });
    }
    const fileNameExt = file.split('/')[file.split('/').length - 1];
    const filename = fileNameExt.split('.')[0];
    const output = argv.output ?? 'dist'
    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }
    await fs.promises.writeFile(
      `${output}/${filename}.html`,
      getHTML(filename, html, lang, theme)
    );
  }
}

module.exports = {
  isKeyInObject,
  HTMLgenerator,
};
