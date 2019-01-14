
var conns = [];

var id = function(c) {
    // eindeutiger key
    return c.id;
};

exports.addConnection = function(c) {
    conns[id(c)] = c;
    console.log('add connection:', c.id);
}

exports.removeConnection = function(c) {
    const index = conns.indexOf(c);
    conns.splice(index, 1);
    console.log('remove connection:', c.id);
}

exports.setType = function(c, data) {
    console.log('set type', id(c), data);
    conns[id(c)].type = data;
}
