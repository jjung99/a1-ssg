#!/usr/bin/env node




let jsonfile = require('jsonfile');
const { getArgs, isKeyInObject, HTMLgenerator } = require('./util');

async function main() {
    const { argv } = getArgs();
    
    let output = "dist";
    if( isKeyInObject(argv, 'c') || isKeyInObject(argv, 'config')){
        let flags = {inputFlag : false, langFlag : false, outputFlag : false};
        
        const file = argv['c'];
        try {
            let obj = jsonfile.readFileSync(file)
            for(let index in obj){
                if( (index == 'i') || (index == 'input')){
                    argv[index] = obj[index];
                    flags['inputFlag'] = true;
                }else if( (index == 'l') || (index == 'lang')){
                    argv[index] = obj[index];
                    flags['langFlag'] = true;
                }
                else if( (index == 'o') || (index == 'output')){
                    output = obj[index];
                    flags['outputFlag'] = true;
                }
            }
            if(flags['inputFlag'] == false){
                argv['input'] = "test/The Naval Treaty.txt"
                argv['i'] = "test/The Naval Treaty.txt"
            }
            if(flags['langFlag'] == false){
                argv['lang'] = "english"
                argv['l'] = "english"
            }
            if(flags['outputFlag'] == false){
                argv['output'] = "dist"
                argv['o'] = "dist"
            }
        
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.error(e)
                return null
            } else {
                console.error(e)
                return null
            }
        }      
    }

    await HTMLgenerator(argv,output);
}

main();
