const { Schema, model } = require('mongoose')

const BucketListItemSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    imgUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    filmDate: {
        type: String,
        required: true,
    }
})

const BucketListItem = model('bucketListItem', BucketListItemSchema)

module.exports = BucketListItem
