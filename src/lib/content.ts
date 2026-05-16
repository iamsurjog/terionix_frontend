import { createServerFn } from '@tanstack/react-start'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import _content from '../../content.json'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentPath = path.resolve(__dirname, '../../content.json')

export const readContent = createServerFn().handler(async () => {
  try {
    return JSON.parse(fs.readFileSync(contentPath, 'utf-8'))
  } catch {
    return _content
  }
})

export const contentAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { action: string; section?: string; content?: unknown }) => data)
  .handler(async ({ data }) => {
    if (data.action === 'read') {
      try {
        return JSON.parse(fs.readFileSync(contentPath, 'utf-8'))
      } catch {
        return _content
      }
    }
    if (data.action === 'write') {
      let current
      try {
        current = JSON.parse(fs.readFileSync(contentPath, 'utf-8'))
      } catch {
        current = JSON.parse(JSON.stringify(_content))
      }
      current[data.section!] = data.content
      try {
        fs.writeFileSync(contentPath, JSON.stringify(current, null, 2))
      } catch {
        // read-only filesystem (e.g. Vercel)
      }
      return { success: true }
    }
  })
