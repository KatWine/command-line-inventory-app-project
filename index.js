const inform = console.log;
const { writeJSONFile, readJSONFile } = require('./src/helpers');
const { create, index, show, edit, destroy } = require('./src/controller');

function run() {
    const action = process.argv[2];
    const soapItem = process.argv[3];
    let soap = readJSONFile('./data', 'soap.json');
    let writeToFile = false;
    let updatedSoap = [];

    switch(action) {
        case 'index':
            const soapView = index(soap);
            inform(soapView);
            break;
        case 'create':
            updatedSoap = create(soap, soapItem);
            writeToFile = true;
            break;
        case 'show':
            const singleSoap = show(soap, soapItem);
            inform(singleSoap);
            break;
        case 'update':
            updatedSoap = edit(soap, soapItem, process.argv[4]);
            writeToFile = true;
            break;
        case 'destroy':
            updatedSoap = destroy(soap, soapItem);
            writeToFile = true;
            break;
        case 'total':
            const total = soap.reduce((acc, currentSoapItem) => acc += currentSoapItem.cost, 0);
            inform(`Your grand total for all the soap items is: ${total}`);
            break;
        default:
            inform('There was an error');
    }

    if(writeToFile) {
        writeJSONFile('./data', 'soap.json', updatedSoap);
    }
}

run();
