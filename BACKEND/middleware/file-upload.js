const multer = require('multer')
const fs = require('fs')
const maxSize = 5000000

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'BACKEND/uploads/images'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({
  storage: fileStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: maxSize,
  },
})
