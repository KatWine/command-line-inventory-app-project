const inform = console.log;
const { nanoid } = require('nanoid');
const soapTotal = require('../data/soapPoints.json');

function create(soap, soapName) {
    const soapItem = { 
        name: soapName, id: nanoid(4), points: soapTotal[soapName] || Math.floor(Math.random() * 50)
    };
    soap.push(soapItem);
    return soap;
}

const index = (soap) => {
    return soap.map((soapItem) => `${soapItem.id}: ${soapItem.name}`).join('\n');
}

const show = (soap, soapId) => {
    const soapItem = soap.find((soapItem) => soapItem.id === soapId);
    return `${soapItem.id}: ${soapItem.name} cost ${soapItem.total} dollars`;
}

const destroy = (soap, soapId) => {
    const index = soap.findIndex((soapItem) => soapItem.id === soapId);
    if (index > -1) {
        soap.splice(index, 1);
        inform('Soap item successfully removed from the collection');
        return soap;
    } else {
        inform('Soap item not found. No action taken.');
        return soap;
    }
}

const edit = (soap, soapId, updatedSoap) => {
    const index = soap.findIndex((soapItem) => soapItem.id === soapId);
    if (index > -1) {
        soap[index].id = soapId;
        soap[index].name = updatedSoap;
        soap[index].total = soapTotal[updatedSoap] || Math.floor(Math.random() * 50);
        return soap;
    } else {
        inform('Soap item not found. No action taken');
        return soap;
    }
}

module.exports = { create, index, show, edit, destroy };

