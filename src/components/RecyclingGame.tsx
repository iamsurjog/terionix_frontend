import { useState, useEffect, useCallback, useRef } from 'react'
import { createServerFn } from '@tanstack/react-start'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import _content from '../../content.json'

const data: Record<string, any> = JSON.parse(JSON.stringify(_content))

async function persist() {
  await writeFile(join(process.cwd(), 'content.json'), JSON.stringify(data, null, 2), 'utf-8')
}

const submitScore = createServerFn({ method: 'POST' })
  .inputValidator((d: { name: string; time: number }) => d)
  .handler(async ({ data: d }) => {
    data.leaderboard.push({ name: d.name, time: d.time })
    data.leaderboard.sort((a: { time: number }, b: { time: number }) => a.time - b.time)
    data.leaderboard = data.leaderboard.slice(0, 10)
    await persist()
    return { success: true }
  })

interface Item {
  name: string
  recyclable: boolean
}

interface GameProps {
  items: Item[]
}

export function RecyclingGame({ items }: GameProps) {
  const [round, setRound] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const [current, setCurrent] = useState<Item | null>(null)
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const pickItem = useCallback((): Item | null => {
    if (items.length === 0) return null
    return items[Math.floor(Math.random() * items.length)]
  }, [items])

  const startGame = useCallback(() => {
    setCurrent(pickItem())
    setRound(1)
    setCorrect(0)
    const now = Date.now()
    setStartTime(now)
    setElapsed(0)
    setSubmitted(false)
    setName('')
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setElapsed((Date.now() - now) / 1000), 100)
  }, [items, pickItem])

  useEffect(() => {
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const handleAnswer = (recyclable: boolean) => {
    const newCorrect = current && current.recyclable === recyclable ? correct + 1 : correct

    if (newCorrect === 10) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      setCurrent(null)
      setCorrect(newCorrect)
      return
    }

    setCurrent(pickItem())
    setRound(r => r + 1)
    setCorrect(newCorrect)
  }

  const handleSubmit = async () => {
    if (!name.trim()) return
    await submitScore({ data: { name: name.trim(), time: elapsed } })
    setSubmitted(true)
  }

  if (round === 0) {
    return (
      <div className="text-center">
        <h2 className="font-title text-2xl font-bold mb-3">Recycling Game</h2>
        <p className="text-text/60 mb-6">Sort 10 items as Recyclable or Not Recyclable. Beat the clock!</p>
        <button onClick={startGame} className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all">
          Start Game
        </button>
      </div>
    )
  }

  if (correct === 10) {
    const timeStr = elapsed.toFixed(2)
    return (
      <div className="text-center">
        <h2 className="font-title text-2xl font-bold mb-1">Done!</h2>
        <p className="text-lg font-bold text-primary mb-1">{correct} correct</p>
        <p className="text-3xl font-title font-bold text-text mb-6">{timeStr}s</p>
        {!submitted && (
          <div className="space-y-3 max-w-xs mx-auto">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg border border-primary/20 bg-white focus:border-primary outline-none transition-colors"
              maxLength={20}
            />
            <button onClick={handleSubmit} disabled={!name.trim()} className="w-full bg-primary text-white font-semibold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all disabled:opacity-50">
              Submit Score
            </button>
          </div>
        )}
        {submitted && <p className="text-green-600 font-medium">Score submitted!</p>}
        <button onClick={startGame} className="mt-6 text-primary font-medium hover:underline">Play Again</button>
      </div>
    )
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-6 max-w-sm mx-auto">
        <span className="text-sm font-medium">{round}/10</span>
        <span className="text-lg font-mono font-bold">{elapsed.toFixed(2)}s</span>
        <span className="text-sm text-green-600">{correct} correct</span>
      </div>
      <div className="mb-8">
        <p className="text-sm text-text/50 mb-2">Is this recyclable?</p>
        <p className="font-title text-2xl font-bold">{current?.name}</p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleAnswer(true)}
          className="bg-green-500 text-white font-semibold px-10 py-3 rounded-lg hover:brightness-110 transition-all"
        >
          Yes
        </button>
        <button
          onClick={() => handleAnswer(false)}
          className="bg-red-500 text-white font-semibold px-10 py-3 rounded-lg hover:brightness-110 transition-all"
        >
          No
        </button>
      </div>
    </div>
  )
}

interface LeaderboardProps {
  scores: { name: string; time: number }[]
}

export function Leaderboard({ scores }: LeaderboardProps) {
  const sorted = [...scores].sort((a, b) => a.time - b.time).slice(0, 10)
  return (
    <div className="mt-8">
      <h3 className="font-title text-xl font-bold mb-3">Leaderboard</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs text-text/50 uppercase tracking-wide border-b border-primary/10">
            <th className="pb-2 pr-4">#</th>
            <th className="pb-2">Name</th>
            <th className="pb-2 text-right">Time</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((s, i) => (
            <tr key={i} className="border-b border-primary/5">
              <td className="py-2 pr-4 text-text/50 text-sm">{i + 1}</td>
              <td className="py-2 font-medium">{s.name}</td>
              <td className="py-2 text-right font-mono text-sm">{s.time.toFixed(2)}s</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}