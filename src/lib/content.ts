import { createServerFn } from '@tanstack/react-start'
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_PATH = path.resolve(process.cwd(), 'content.json')

export const readContent = createServerFn({ method: 'GET' }).handler(async () => {
  const raw = fs.readFileSync(CONTENT_PATH, 'utf-8')
  return JSON.parse(raw)
})

export const updateSection = createServerFn({ method: 'POST' })
  .inputValidator((data: { section: string; content: unknown }) => data)
  .handler(async ({ data }) => {
    const current = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'))
    current[data.section] = data.content
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(current, null, 2))
    return { success: true }
  })
