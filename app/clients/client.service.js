const db = require('../_helpers/db');
const Client = db.Client;
const Activity = db.Activity;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {
    return await Client.
    find({user_id: userId}).select('-hash').
    populate({ path: 'activity', model: Activity });
}

async function getById(id) {
    return await Client.findById(id).select('-hash').
    populate({ path: 'activity', model: Activity });
}

async function create(clientParam) {

    const client = new Client(clientParam);

    // validate DNI
    if (await Client.findOne({ dni: clientParam.dni, user_id: client.user_id })) {
        throw 'Client "' + clientParam.dni + '" is already created';
    }

    // save client
    await client.save();
}

async function update(id, clientParam) {
    const client = await Client.findById(id);

    // validate
    if (!client) throw 'Client not found';
    if (client.dni !== client.dni && await Client.findOne({ dni: client.dni , user_id: client.user_id })) {
        throw 'Activity "' + client.dni + '" is already created.';
    }

    // copy userParam properties to client
    Object.assign(client, clientParam);

    await client.save();
}

async function _delete(id) {
    await Client.findByIdAndRemove(id);
}
