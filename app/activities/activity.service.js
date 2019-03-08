const config = require('../../config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');
const Activity = db.Activity;
const mongoose = require('mongoose');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll(userId) {
    return await Activity.find({user_id: userId}).select('-hash');
}

async function getById(id) {
    return await Activity.findById(id).select('-hash');
}

async function create(activityParam) {

    const activity = new Activity(activityParam);
    console.log(activity);

    // validate
    if (await Activity.findOne({ name: activityParam.name, user_id: activity.user_id })) {
        throw 'Activity "' + activityParam.name + '" is already created';
    }

    // save activity
    await activity.save();
}

async function update(id, activityParam) {
    const activity = await Activity.findById(id);

    // validate
    if (!activity) throw 'Activity not found';
    if (activity.name !== activity.name && await Activity.findOne({ name: activity.name , user_id: activityParam.user_id })) {
        throw 'Activity "' + activity.name + '" is already created.';
    }

    // copy userParam properties to user
    Object.assign(activity, activityParam);

    await activity.save();
}

async function _delete(id) {
    await Activity.findByIdAndRemove(id);
}
