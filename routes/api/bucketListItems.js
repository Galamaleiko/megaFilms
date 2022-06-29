const {Router} = require('express')
const BucketListItem = require('../../models/BucketListItem')

const router = Router()

router.get('/', async (req, res) => {
    try {
        const bucketListItems = await BucketListItem.find()
        if (!bucketListItems) throw new Error('No bucketListItems')
        const sorted = bucketListItems.sort((b, a) => {
            let aDate = a.filmDate.substring(0, 4)
            let bDate = b.filmDate.substring(0, 4)
            return aDate - bDate
        })
        res.status(201).json(sorted)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/:name', async (req, res) => {
    const {name} = req.params
    try {

        if (name.match("action|comedy|crime|family")) {
            let find = await BucketListItem.find({genre: {$regex: new RegExp('.*' + name + '.*', 'i')}});
            res.status(200).json(find)
        } else {
            let find = await BucketListItem.find({name: {$regex: new RegExp('.*' + name + '.*', 'i')}});
            res.status(200).json(find)
        }

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router
