const {Schema, model} = require('mongoose')

const BucketListItemSchema = new Schema({
    description: {
        type: String, required: true,
    },
    date: {
        type: Date, default: Date.now,
    },
    imgUrl: {
        type: String, required: true,
    },
    name: {
        type: String, required: true,
    },
    filmDate: {
        type: String, required: true,
    },
    genre: {
        type: String, required: true,
    },
    cinemas: {
        type: String, required: true,
    },
    trailerUrl: {
        type: String, default: "https://ia904503.us.archive.org/15/items/kikTXNL6MvX6ZpRXM/kikTXNL6MvX6ZpRXM.mp4",
    },
    bookingUrl: {
        type: String, default: "https://kiev.ticketsbox.com/en/cinema/"
    }
})

const BucketListItem = model('bucketListItem', BucketListItemSchema)

module.exports = BucketListItem
