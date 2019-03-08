const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    frequency: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' }
});

activitySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Activity', activitySchema);
