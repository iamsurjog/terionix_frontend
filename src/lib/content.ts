import { createServerFn } from '@tanstack/react-start'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { createHash } from 'crypto'

import _content from '../../content.json'

const data: Record<string, any> = JSON.parse(JSON.stringify(_content))

async function persist() {
  await writeFile(join(process.cwd(), 'content.json'), JSON.stringify(data, null, 2), 'utf-8')
}

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
      await persist()
      return { success: true }
    }
  })

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex')
}

export const verifyPassword = createServerFn({ method: 'POST' })
  .inputValidator((d: { password: string }) => {
    console.log('[server] verifyPassword inputValidator received:', JSON.stringify(d))
    return d
  })
  .handler(async ({ data: d }) => {
    console.log('[server] verifyPassword handler data:', JSON.stringify({ hasPassword: !!d?.password, pwLen: d?.password?.length }))
    const storedHash = data.admin?.passwordHash
    console.log('[server] storedHash:', storedHash ? storedHash.substring(0, 10) + '...' : 'null')
    const inputHash = d?.password ? hashPassword(d.password) : 'NO_PASSWORD'
    console.log('[server] inputHash:', inputHash.substring(0, 10) + '...')
    const defaultHash = hashPassword('admin')
    if (!storedHash) {
      const match = inputHash === defaultHash
      console.log('[server] no stored hash, comparing to default admin. Match:', match)
      return match
    }
    const match = storedHash === inputHash
    console.log('[server] comparing stored vs input. Match:', match)
    return match
  })

export const updatePassword = createServerFn({ method: 'POST' })
  .inputValidator((d: { currentPassword: string; newPassword: string }) => {
    console.log('[server] updatePassword inputValidator received:', JSON.stringify({ hasCurrent: !!d?.currentPassword, hasNew: !!d?.newPassword }))
    return d
  })
  .handler(async ({ data: d }) => {
    console.log('[server] updatePassword handler called')
    const storedHash = data.admin?.passwordHash
    const defaultHash = hashPassword('admin')
    const currentHash = d?.currentPassword ? hashPassword(d.currentPassword) : ''
    console.log('[server] storedHash:', storedHash ? 'present' : 'null')
    console.log('[server] currentHash matches default:', currentHash === defaultHash)

    if (storedHash) {
      if (storedHash !== currentHash) {
        console.log('[server] stored hash mismatch')
        return { success: false, error: 'Current password is incorrect' }
      }
    } else if (defaultHash !== currentHash) {
      console.log('[server] default hash mismatch')
      return { success: false, error: 'Current password is incorrect' }
    }

    if (d.newPassword.length < 4) {
      return { success: false, error: 'New password must be at least 4 characters' }
    }

    const newHash = hashPassword(d.newPassword)
    data.admin = { ...(data.admin || {}), passwordHash: newHash }
    await persist()
    console.log('[server] password updated successfully')
    return { success: true }
  })


