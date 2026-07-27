import logger from '../utils/logger.js'

export const uploadCarImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const imagePath = `/uploads/images/${req.file.filename}`

    logger.info('Image uploaded successfully', {
      filename: req.file.filename,
      path: imagePath,
      size: req.file.size
    })

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      imagePath: imagePath,
      filename: req.file.filename
    })
  } catch (error) {
    logger.error('Image upload error', { error: error.message })
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload image'
    })
  }
}

export const uploadLogoImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const imagePath = `/uploads/images/${req.file.filename}`

    logger.info('Logo image uploaded successfully', {
      filename: req.file.filename,
      path: imagePath,
      size: req.file.size
    })

    res.json({
      success: true,
      message: 'Logo uploaded successfully',
      imagePath: imagePath,
      filename: req.file.filename
    })
  } catch (error) {
    logger.error('Logo upload error', { error: error.message })
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload logo'
    })
  }
}

export const uploadHeroImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      })
    }

    const imagePath = `/uploads/images/${req.file.filename}`

    logger.info('Hero image uploaded successfully', {
      filename: req.file.filename,
      path: imagePath,
      size: req.file.size
    })

    res.json({
      success: true,
      message: 'Hero image uploaded successfully',
      imagePath: imagePath,
      filename: req.file.filename
    })
  } catch (error) {
    logger.error('Hero upload error', { error: error.message })
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to upload hero image'
    })
  }
}
