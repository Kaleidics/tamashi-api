const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const RecordSchema = mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mood: {
        type: Number,
        required: true
    },
    activity: [{
        type: String
    }],
    notes: {
        type: String
    },
});

RecordSchema.methods.serialize = () => {
    return {
        user: this.user || '',
        createdAt: this.createdAt || '',
        mood: this.mood || '',
        note: this.notes || '',
        activity: this.activity || '',
    }
}

const Record = mongoose.model('Record', RecordSchema);

module.exports = { Record };