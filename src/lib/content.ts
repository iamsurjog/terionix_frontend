import { createServerFn } from '@tanstack/react-start'
import fs from 'node:fs'
import path from 'node:path'

const resolvePath = () => path.resolve(process.cwd(), 'content.json')

export const readContent = createServerFn().handler(async () => {
  const raw = fs.readFileSync(resolvePath(), 'utf-8')
  return JSON.parse(raw)
})

export const contentAction = createServerFn({ method: 'POST' })
  .inputValidator((data: { action: string; section?: string; content?: unknown }) => data)
  .handler(async ({ data }) => {
    if (data.action === 'read') {
      const raw = fs.readFileSync(resolvePath(), 'utf-8')
      return JSON.parse(raw)
    }
    if (data.action === 'write') {
      const current = JSON.parse(fs.readFileSync(resolvePath(), 'utf-8'))
      current[data.section!] = data.content
      fs.writeFileSync(resolvePath(), JSON.stringify(current, null, 2))
      return { success: true }
    }
  })
