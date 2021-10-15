let yargs = require('yargs');
let {hideBin} = require('yargs/helpers');

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

module.exports = {
    getArgs
}