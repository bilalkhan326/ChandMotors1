let logger = null

// Try to dynamically import winston; if unavailable, fall back to a simple console logger
const initLogger = async () => {
  try {
    const winston = await import('winston')
    const DailyRotateFile = await import('winston-daily-rotate-file').then(m => m.default || m)
    const { combine, timestamp, printf, colorize, json } = winston.format
    const env = process.env.NODE_ENV || 'development'
    const isDev = env === 'development'

    const consoleFormat = combine(
      colorize(),
      timestamp(),
      printf(({ timestamp, level, message, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : ''
        return `${timestamp} ${level}: ${message} ${metaStr}`
      })
    )

    const jsonFormat = combine(
      timestamp(),
      json()
    )

    const transports = []
    if (isDev) {
      transports.push(new winston.transports.Console({ format: consoleFormat }))
    } else {
      transports.push(new winston.transports.Console({ format: jsonFormat }))
      transports.push(new DailyRotateFile.default({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: jsonFormat
      }))
    }

    logger = winston.createLogger({ level: isDev ? 'debug' : 'info', transports, exitOnError: false })
  } catch (err) {
    // Fallback console logger
    const fallback = ({ level, message, meta }) => {
      const ts = new Date().toISOString()
      const metaStr = meta ? JSON.stringify(meta) : ''
      console.log(`${ts} ${level.toUpperCase()}: ${message} ${metaStr}`)
    }
    logger = {
      info: (msg, meta) => fallback({ level: 'info', message: msg, meta }),
      warn: (msg, meta) => fallback({ level: 'warn', message: msg, meta }),
      error: (msg, meta) => fallback({ level: 'error', message: msg, meta }),
      debug: (msg, meta) => fallback({ level: 'debug', message: msg, meta })
    }
  }
}

await initLogger()

export default logger
