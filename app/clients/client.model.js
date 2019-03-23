const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const clientSchema = new Schema({
    dni: { type: String, unique: true, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true},
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    activity: { type: Schema.Types.ObjectId, ref: 'Activity' }
});

clientSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Client', clientSchema);
