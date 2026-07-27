import logger from '../utils/logger.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const debugUploadDir = (req, res) => {
  try {
    const uploadDir = path.join(__dirname, '../uploads/images')
    const filesExist = fs.existsSync(uploadDir)
    const files = filesExist ? fs.readdirSync(uploadDir) : []
    
    res.json({
      success: true,
      uploadDir,
      exists: filesExist,
      files,
      fileCount: files.length
    })
  } catch (error) {
    logger.error('Debug upload dir error', { error: error.message })
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
