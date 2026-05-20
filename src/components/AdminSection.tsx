import { useState } from 'react'
import { contentAction } from '#/lib/content'

interface SectionProps {
  title: string
  onSave: (data: unknown) => Promise<void>
  defaultValues: unknown
  validate?: (data: unknown) => string | null
  children: (values: unknown, onChange: (path: string, value: unknown) => void) => React.ReactNode
}

export function AdminSection({ title, onSave, defaultValues, validate, children }: SectionProps) {
  const [values, setValues] = useState(defaultValues)
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  const handleChange = (path: string, value: unknown) => {
    setValues(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const parts = path.split('.')
      let curr = next
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in curr)) curr[parts[i]] = {}
        curr = curr[parts[i]]
      }
      curr[parts[parts.length - 1]] = value
      return next
    })
  }

  const handleSave = async () => {
    setMsg(null)
    if (validate) {
      const err = validate(values)
      if (err) { setMsg({ type: 'error', text: err }); return }
    }
    setSaving(true)
    try {
      await onSave(values)
      setMsg({ type: 'success', text: 'Saved successfully!' })
    } catch (e: unknown) {
      setMsg({ type: 'error', text: 'Error: ' + (e instanceof Error ? e.message : String(e)) })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="font-sans text-text">
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-title text-3xl font-bold mb-2">{title}</h1>
          <div className="bg-white/50 rounded-xl border border-primary/20 p-6 space-y-5">
            {children(values, handleChange)}
            <div className="pt-4 border-t border-primary/10">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-white font-semibold px-8 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              {msg && (
                <p className={`mt-2 text-sm ${msg.type === 'success' ? 'text-green-600' : 'text-red-500'}`}>
                  {msg.text}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FieldProps {
  label: string
  children: React.ReactNode
}

export function Field({ label, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  )
}

interface InputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Input({ value, onChange, placeholder, className = '' }: InputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white focus:bg-white focus:border-primary outline-none transition-colors ${className}`}
    />
  )
}

interface TextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function Textarea({ value, onChange, placeholder, rows = 4 }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white focus:bg-white focus:border-primary outline-none transition-colors resize-y"
    />
  )
}

export function writeSection(section: string, content: unknown) {
  return contentAction({ data: { action: 'write', section, content } })
}