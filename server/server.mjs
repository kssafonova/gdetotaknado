import http from 'node:http'
import { appendFile, mkdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..', 'dist')
const dataDir = path.resolve(__dirname, 'data')
const port = Number(process.env.PORT || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json'
}

async function bodyJson(req) {
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > 1_000_000) throw new Error('payload-too-large')
  }
  return JSON.parse(raw || '{}')
}

async function sendFile(res, file) {
  const ext = path.extname(file)
  const data = await readFile(file)
  res.writeHead(200, { 'content-type': types[ext] || 'application/octet-stream' })
  res.end(data)
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/leads') {
    try {
      const lead = await bodyJson(req)
      if (!lead.name || !lead.phone) {
        res.writeHead(400, { 'content-type': 'application/json' })
        return res.end(JSON.stringify({ ok: false, error: 'name-and-phone-required' }))
      }
      await mkdir(dataDir, { recursive: true })
      const row = JSON.stringify({ ...lead, createdAt: new Date().toISOString(), ip: req.socket.remoteAddress }) + '\n'
      await appendFile(path.join(dataDir, 'leads.ndjson'), row, 'utf8')
      res.writeHead(201, { 'content-type': 'application/json' })
      return res.end(JSON.stringify({ ok: true }))
    } catch {
      res.writeHead(400, { 'content-type': 'application/json' })
      return res.end(JSON.stringify({ ok: false }))
    }
  }

  if (req.method !== 'GET') {
    res.writeHead(405).end()
    return
  }

  try {
    const pathname = decodeURIComponent((req.url || '/').split('?')[0])
    const candidate = path.resolve(root, '.' + pathname)
    if (!candidate.startsWith(root)) throw new Error('bad-path')
    let target = candidate
    try {
      const info = await stat(target)
      if (info.isDirectory()) target = path.join(target, 'index.html')
    } catch {
      target = path.join(root, 'index.html')
    }
    await sendFile(res, target)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    res.end('Not found')
  }
})

server.listen(port, () => console.log(`NORD site: http://localhost:${port}`))
