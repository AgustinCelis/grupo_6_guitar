const fs = require('fs');

const rutaJson = '';

const actions = {
    path: '',
    get: function () {
        if(data) {
            return fs.readFileSync(__dirname + this.path);
        }
        return fs.readFileSync(__dirname + this.path);
    },
    create: function (data) {
        const jsonData = JSON.parse(fs.readFileSync(__dirname + this.path), 'utf8');
        let id = 0;
        if(jsonData.length > 0) {
            id = jsonData.length + 1;
        }
        const objectoACrear = { ...data, id };
        jsonData.push(objectoACrear);
        fs.writeFileSync(__dirname + this.path, JSON.stringify(jsonData));
        return jsonData;
    },
    modify: function(data) {
        const jsonData = JSON.parse(fs.readFileSync(__dirname + this.path), 'utf8');
        
        const objectoAModificar = jsonData.find(dato => dato.id == data.id);
        objectoAModificar = data;

        fs.writeFileSync(__dirname + this.path, JSON.stringify(jsonData));
        return jsonData;
    },
    delete: function(data) {
        const jsonData = JSON.parse(fs.readFileSync(__dirname + this.path), 'utf8');
        
        jsonData = jsonData.filter(dato => dato.id != data.id);

        fs.writeFileSync(__dirname + this.path, JSON.stringify(jsonData));
        return jsonData;
    }
}

module.exports = actions;