import { createServerFn } from '@tanstack/react-start'

import _content from '../../content.json'

const data: Record<string, any> = JSON.parse(JSON.stringify(_content))

export const readContent = createServerFn().handler(async () => {
  return data
})

export const contentAction = createServerFn({ method: 'POST' })
  .inputValidator((d: { action: string; section?: string; content?: unknown }) => d)
  .handler(async ({ data: d }) => {
    if (d.action === 'read') {
      return data
    }
    if (d.action === 'write') {
      data[d.section!] = d.content
      return { success: true }
    }
  })
