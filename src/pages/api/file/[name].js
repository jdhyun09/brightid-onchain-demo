export const config = {
    api: { externalResolver: true }
}

import express from 'express'
const handler = express()

const serveFiles = express.static('./path/to/files')
handler.use(['/api/file','/file'], serveFiles)

export default handler