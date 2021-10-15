let yargs = require('yargs');
let {hideBin} = require('yargs/helpers');
let fs = require('fs');

function getArgs() {
    return yargs(hideBin(process.argv))
    .option('i', {
        alias: 'input',
        describe: 'Provide filename to covert html',
        type: 'string',
        required: false
    })
    .option('l', {
        alias: 'lang',
        describe: 'lang attribute for html',
        type: 'string',
        required: false
    })
    .option('c', {
        alias: 'config',
        describe: 'Provide filename to covert html',
        type: 'string',
        required: false
    })
    .alias('v', 'version')
    .version('v', '0.0.1')
    .alias('h', 'help')
    .help('h', 'Display help');
}

function isKeyInObject(obj, key) {
    var res = Object.keys(obj).some(v => v == key);
    return res;
}

const getHTML = (title, contents, lang) => `<!doctype html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${contents}
</body>
</html>
`

async function HTMLgenerator(argv, output){
    const { input, lang } = argv; // const input = argv.input; 
    
    let files = [];
    if (fs.lstatSync(input).isDirectory()) {
        const filesFromDir = await fs.promises.readdir(input, 'utf-8');
        files = filesFromDir.map(e => `${input}/${e}`);
    } else {
        files.push(input);
    }

    for (const file of files) {

        const res = await fs.promises.readFile(file, 'utf-8');
        fileType = file.split('.').pop();
        let html ='';
        const deli = process.platform === 'win32' ? '\r\n' : '\n'; 
        if(fileType == 'md'){
            let resArr = res.split(deli);
            resArr.filter(e => e).map(e =>{
                if(e.includes('###### '))
                    html += `<h6>${e.replace('###### ', ' ').trim()}</h6>${deli}`; 
                else if(e.includes('##### '))
                    html += `<h5>${e.replace('##### ', ' ').trim()}</h5>${deli}`; 
                else if(e.includes('#### '))
                    html += `<h4>${e.replace('#### ', ' ').trim()}</h4>${deli}`; 
                else if(e.includes('### '))
                    html += `<h3>${e.replace('### ', ' ').trim()}</h3>${deli}`; 
                else if(e.includes('## '))
                    html += `<h2>${e.replace('## ', ' ').trim()}</h2>${deli}`; 
                else if(e.includes('# '))
                    html += `<h1>${e.replace('# ', ' ').trim()}</h1>${deli}`;
                else if(e === '---')  
                    html += `<hr>${deli}`;                    
                else
                    html += `<p>${e}</p>${deli}`;
            }).join(' ');
        }else if(fileType == 'txt'){
            let resArr = res.split('\n\n');
            resArr.forEach(e => html += `<p>${e}</p>\n`);
        }
        const fileNameExt = file.split('/')[file.split('/').length - 1];
        const filename = fileNameExt.split('.')[0];
        if (!fs.existsSync(output)) {
            fs.mkdirSync(output);
        }
        await fs.promises.writeFile(`${output}/${filename}.html`, getHTML(filename, html, lang));
    }
}

module.exports = {
    getArgs,
    isKeyInObject,
    HTMLgenerator
}