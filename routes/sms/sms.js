const express = require('express')
const router = express.Router()
const smsController = require('../../controllers/sms')
const authMiddleware = require('../../middlewares/auth').verifyAccount


router.post('/api/v1/inbound/sms', authMiddleware, smsController.inbound)
router.post('/api/v1/outbound/sms', authMiddleware, smsController.outbound)

router.get('/', smsController.default)

module.exports = router
