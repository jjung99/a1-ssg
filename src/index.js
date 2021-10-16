#!/usr/bin/env node

let jsonfile = require('jsonfile');
const { getArgs } = require('./util/command');
const { isKeyInObject, HTMLgenerator } = require('./util/html');

async function main() {
    const { argv } = getArgs();
    
    try {
        if(isKeyInObject(argv, 'config')){
            let flags = {inputFlag : false, langFlag : false, outputFlag : false};
            
            const file = argv['c'];
            try {
                let obj = jsonfile.readFileSync(file)
                for(let index in obj){
                    if(index === 'input'){
                        argv[index] = obj[index];
                        flags['inputFlag'] = true;
                    }else if(index === 'lang'){
                        argv[index] = obj[index];
                        flags['langFlag'] = true;
                    }
                    else if(index === 'output'){
                        argv[index] = obj[index];
                        flags['outputFlag'] = true;
                    }
                }
            } catch (e) {
                if (e.code === 'ENOENT') {
                    console.error(e);
                    return null;
                } else {
                    console.error(e);
                    return null;
                }
            }      
        }
    
        await HTMLgenerator(argv);
    } catch(err) {
        console.error(err.message);
    }
    
}

main();
