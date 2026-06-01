import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { isAuthenticated } from '#/lib/auth'
import { AdminNavbar } from '#/components/AdminNavbar'
import { readContent } from '#/lib/content'
import { AdminSection, Field, Input, Textarea, writeSection } from '#/components/AdminSection'

export const Route = createFileRoute('/admin/learn')({
  loader: async () => readContent(),
  component: AdminLearn,
})

function AdminLearn() {
  const navigate = useNavigate()
  useEffect(() => { if (!isAuthenticated()) navigate({ to: '/admin/login' }) }, [navigate])
  const data = Route.useLoaderData()!
  return (
    <div className="font-sans text-text">
      <AdminNavbar active="Learn" links={data.navbar.links} logo={data.site.logo} siteName={data.site.name} />
      <AdminSection
        title="Learn Page"
        onSave={(vals) => writeSection('learn', vals)}
        defaultValues={data.learn}
        validate={(v: unknown) => {
          const o = v as { courseTitle?: string; whatIsEwaste?: { heroTitle?: string }; quiz?: { heroTitle?: string } }
          if (!o.courseTitle?.trim()) return 'Course title is required'
          if (!o.whatIsEwaste?.heroTitle?.trim()) return 'What is E-Waste? hero title is required'
          if (!o.quiz?.heroTitle?.trim()) return 'Quiz hero title is required'
          return null
        }}
      >
        {(values, onChange) => (
          <>
            {/* ===== COURSE SETTINGS ===== */}
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">📚</span>
              <h2 className="font-title text-xl font-bold text-primary">Course Settings</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Course Title">
                <Input value={values.courseTitle} onChange={(v) => onChange('courseTitle', v)} placeholder="E-Waste Recycling 101" />
              </Field>
              <Field label="Course Subtitle">
                <Textarea value={values.courseSubtitle} onChange={(v) => onChange('courseSubtitle', v)} placeholder="A beginner-friendly course..." rows={2} />
              </Field>
            </div>

            <h4 className="font-medium text-sm text-text/70 mt-4 mb-2">Modules (display order in sidebar)</h4>
            {values.moduleList.map((_: { id: string; contentKey: string; title: string; emoji: string; desc: string; time: string }, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Module {i + 1}</div>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="ID (URL slug)">
                    <Input value={values.moduleList[i].id} onChange={(v) => onChange(`moduleList.${i}.id`, v)} placeholder="what-is-ewaste" />
                  </Field>
                  <Field label="Content Key (section key)">
                    <Input value={values.moduleList[i].contentKey} onChange={(v) => onChange(`moduleList.${i}.contentKey`, v)} placeholder="whatIsEwaste" />
                  </Field>
                  <Field label="Title">
                    <Input value={values.moduleList[i].title} onChange={(v) => onChange(`moduleList.${i}.title`, v)} placeholder="What is E-Waste?" />
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Emoji">
                    <Input value={values.moduleList[i].emoji} onChange={(v) => onChange(`moduleList.${i}.emoji`, v)} placeholder="🤔" />
                  </Field>
                  <Field label="Description">
                    <Input value={values.moduleList[i].desc} onChange={(v) => onChange(`moduleList.${i}.desc`, v)} placeholder="Learn what counts as e-waste..." />
                  </Field>
                  <Field label="Time">
                    <Input value={values.moduleList[i].time} onChange={(v) => onChange(`moduleList.${i}.time`, v)} placeholder="6 min" />
                  </Field>
                </div>
              </div>
            ))}

            {/* ===== DASHBOARD ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">📊</span>
              <h2 className="font-title text-xl font-bold text-primary">Dashboard</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Heading">
                <Input value={values.dashboard.heading} onChange={(v) => onChange('dashboard.heading', v)} placeholder="Welcome to..." />
              </Field>
              <Field label="Body Text">
                <Textarea value={values.dashboard.body} onChange={(v) => onChange('dashboard.body', v)} placeholder="This course will..." rows={3} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Stats (4 items)</h4>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Dashboard Stat {i + 1}</div>
                <div className="grid grid-cols-3 gap-3">
                  <Field label="Value">
                    <Input value={values.dashboard.stats[i].value} onChange={(v) => onChange(`dashboard.stats.${i}.value`, v)} placeholder="6" />
                  </Field>
                  <Field label="Unit">
                    <Input value={values.dashboard.stats[i].unit} onChange={(v) => onChange(`dashboard.stats.${i}.unit`, v)} placeholder="modules" />
                  </Field>
                  <Field label="Label">
                    <Input value={values.dashboard.stats[i].label} onChange={(v) => onChange(`dashboard.stats.${i}.label`, v)} placeholder="to complete" />
                  </Field>
                </div>
              </div>
            ))}

            {/* ===== MODULE: WHAT IS E-WASTE ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">🤔</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: What is E-Waste?</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.whatIsEwaste.heroTitle} onChange={(v) => onChange('whatIsEwaste.heroTitle', v)} placeholder="What is E-Waste?" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.whatIsEwaste.heroSubtitle} onChange={(v) => onChange('whatIsEwaste.heroSubtitle', v)} placeholder="Before we can solve..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Sections</h4>
            {values.whatIsEwaste.sections.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1} — {s.type}</div>
                <Field label="Type">
                  <Input value={s.type} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.type`, v)} placeholder="text / grid / stats / callout" />
                </Field>
                <Field label="ID">
                  <Input value={s.id} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.id`, v)} placeholder="intro" />
                </Field>
                <Field label="Title">
                  <Input value={s.title} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.title`, v)} placeholder="Section title" />
                </Field>
                {(s.type === 'text' || s.type === 'callout') && (
                  <Field label="Body">
                    <Textarea value={s.body} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.body`, v)} placeholder="Body text" rows={3} />
                  </Field>
                )}
                {s.type === 'callout' && (
                  <Field label="Emoji">
                    <Input value={s.emoji} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.emoji`, v)} placeholder="⚠️" />
                  </Field>
                )}
                {(s.type === 'grid' || s.type === 'list') && s.items && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Items ({s.items.length})</div>
                    {s.items.map((item: any, ii: number) => (
                      <div key={ii} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Item {ii + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Emoji">
                            <Input value={item.emoji} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.items.${ii}.emoji`, v)} placeholder="📱" />
                          </Field>
                          <Field label="Label">
                            <Input value={item.label} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.items.${ii}.label`, v)} placeholder="Phones & Tablets" />
                          </Field>
                          <Field label="Desc">
                            <Input value={item.desc} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.items.${ii}.desc`, v)} placeholder="Description" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {s.type === 'stats' && s.stats && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Stats ({s.stats.length})</div>
                    {s.stats.map((stat: any, si: number) => (
                      <div key={si} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Stat {si + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Value">
                            <Input value={stat.value} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.stats.${si}.value`, v)} placeholder="62M" />
                          </Field>
                          <Field label="Unit">
                            <Input value={stat.unit} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.stats.${si}.unit`, v)} placeholder="metric tons" />
                          </Field>
                          <Field label="Label">
                            <Input value={stat.label} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.stats.${si}.label`, v)} placeholder="e-waste generated" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {s.type === 'timeline' && s.steps && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Steps ({s.steps.length})</div>
                    {s.steps.map((step: any, ti: number) => (
                      <div key={ti} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Step {ti + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Number">
                            <Input value={String(step.number)} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.steps.${ti}.number`, Number(v))} placeholder="1" />
                          </Field>
                          <Field label="Emoji">
                            <Input value={step.emoji} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.steps.${ti}.emoji`, v)} placeholder="🚛" />
                          </Field>
                          <Field label="Title">
                            <Input value={step.title} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.steps.${ti}.title`, v)} placeholder="Step title" />
                          </Field>
                        </div>
                        <Field label="Body">
                          <Textarea value={step.body} onChange={(v) => onChange(`whatIsEwaste.sections.${i}.steps.${ti}.body`, v)} placeholder="Step description" rows={2} />
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ===== MODULE: THE HIDDEN VALUE ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">💎</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: The Hidden Value</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.hiddenValue.heroTitle} onChange={(v) => onChange('hiddenValue.heroTitle', v)} placeholder="The Hidden Value in Your Drawer" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.hiddenValue.heroSubtitle} onChange={(v) => onChange('hiddenValue.heroSubtitle', v)} placeholder="That drawer full of old phones..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Sections</h4>
            {values.hiddenValue.sections.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1} — {s.type}</div>
                <Field label="Type">
                  <Input value={s.type} onChange={(v) => onChange(`hiddenValue.sections.${i}.type`, v)} placeholder="text / grid / stats / callout" />
                </Field>
                <Field label="ID">
                  <Input value={s.id} onChange={(v) => onChange(`hiddenValue.sections.${i}.id`, v)} placeholder="intro" />
                </Field>
                <Field label="Title">
                  <Input value={s.title} onChange={(v) => onChange(`hiddenValue.sections.${i}.title`, v)} placeholder="Section title" />
                </Field>
                {(s.type === 'text' || s.type === 'callout') && (
                  <Field label="Body">
                    <Textarea value={s.body} onChange={(v) => onChange(`hiddenValue.sections.${i}.body`, v)} placeholder="Body text" rows={3} />
                  </Field>
                )}
                {s.type === 'callout' && (
                  <Field label="Emoji">
                    <Input value={s.emoji} onChange={(v) => onChange(`hiddenValue.sections.${i}.emoji`, v)} placeholder="💎" />
                  </Field>
                )}
                {(s.type === 'grid' || s.type === 'list') && s.items && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Items ({s.items.length})</div>
                    {s.items.map((item: any, ii: number) => (
                      <div key={ii} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Item {ii + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Emoji">
                            <Input value={item.emoji} onChange={(v) => onChange(`hiddenValue.sections.${i}.items.${ii}.emoji`, v)} placeholder="🥇" />
                          </Field>
                          <Field label="Label">
                            <Input value={item.label} onChange={(v) => onChange(`hiddenValue.sections.${i}.items.${ii}.label`, v)} placeholder="Gold" />
                          </Field>
                          <Field label="Desc">
                            <Input value={item.desc} onChange={(v) => onChange(`hiddenValue.sections.${i}.items.${ii}.desc`, v)} placeholder="Description" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {s.type === 'stats' && s.stats && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Stats ({s.stats.length})</div>
                    {s.stats.map((stat: any, si: number) => (
                      <div key={si} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Stat {si + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Value">
                            <Input value={stat.value} onChange={(v) => onChange(`hiddenValue.sections.${i}.stats.${si}.value`, v)} placeholder="100x" />
                          </Field>
                          <Field label="Unit">
                            <Input value={stat.unit} onChange={(v) => onChange(`hiddenValue.sections.${i}.stats.${si}.unit`, v)} placeholder="more gold" />
                          </Field>
                          <Field label="Label">
                            <Input value={stat.label} onChange={(v) => onChange(`hiddenValue.sections.${i}.stats.${si}.label`, v)} placeholder="Comparison label" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ===== MODULE: ENVIRONMENTAL IMPACT ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">🌍</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: Environmental Impact</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.environmentalImpact.heroTitle} onChange={(v) => onChange('environmentalImpact.heroTitle', v)} placeholder="Environmental Impact" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.environmentalImpact.heroSubtitle} onChange={(v) => onChange('environmentalImpact.heroSubtitle', v)} placeholder="What happens when e-waste ends up in landfills..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Sections</h4>
            {values.environmentalImpact.sections.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1} — {s.type}</div>
                <Field label="Type">
                  <Input value={s.type} onChange={(v) => onChange(`environmentalImpact.sections.${i}.type`, v)} placeholder="text / list / grid / callout" />
                </Field>
                <Field label="ID">
                  <Input value={s.id} onChange={(v) => onChange(`environmentalImpact.sections.${i}.id`, v)} placeholder="intro" />
                </Field>
                <Field label="Title">
                  <Input value={s.title} onChange={(v) => onChange(`environmentalImpact.sections.${i}.title`, v)} placeholder="Section title" />
                </Field>
                {(s.type === 'text' || s.type === 'callout') && (
                  <Field label="Body">
                    <Textarea value={s.body} onChange={(v) => onChange(`environmentalImpact.sections.${i}.body`, v)} placeholder="Body text" rows={3} />
                  </Field>
                )}
                {s.type === 'callout' && (
                  <Field label="Emoji">
                    <Input value={s.emoji} onChange={(v) => onChange(`environmentalImpact.sections.${i}.emoji`, v)} placeholder="🌱" />
                  </Field>
                )}
                {(s.type === 'list' || s.type === 'grid') && s.items && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Items ({s.items.length})</div>
                    {s.items.map((item: any, ii: number) => (
                      <div key={ii} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Item {ii + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Emoji">
                            <Input value={item.emoji} onChange={(v) => onChange(`environmentalImpact.sections.${i}.items.${ii}.emoji`, v)} placeholder="☠️" />
                          </Field>
                          <Field label="Label">
                            <Input value={item.label} onChange={(v) => onChange(`environmentalImpact.sections.${i}.items.${ii}.label`, v)} placeholder="Lead" />
                          </Field>
                          <Field label="Desc">
                            <Input value={item.desc} onChange={(v) => onChange(`environmentalImpact.sections.${i}.items.${ii}.desc`, v)} placeholder="Description" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ===== MODULE: THE RECYCLING PROCESS ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">🔄</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: The Recycling Process</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.theProcess.heroTitle} onChange={(v) => onChange('theProcess.heroTitle', v)} placeholder="The Recycling Process" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.theProcess.heroSubtitle} onChange={(v) => onChange('theProcess.heroSubtitle', v)} placeholder="What actually happens to your device..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Sections</h4>
            {values.theProcess.sections.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1} — {s.type}</div>
                <Field label="Type">
                  <Input value={s.type} onChange={(v) => onChange(`theProcess.sections.${i}.type`, v)} placeholder="text / timeline / stats" />
                </Field>
                <Field label="ID">
                  <Input value={s.id} onChange={(v) => onChange(`theProcess.sections.${i}.id`, v)} placeholder="intro" />
                </Field>
                <Field label="Title">
                  <Input value={s.title} onChange={(v) => onChange(`theProcess.sections.${i}.title`, v)} placeholder="Section title" />
                </Field>
                {s.type === 'text' && (
                  <Field label="Body">
                    <Textarea value={s.body} onChange={(v) => onChange(`theProcess.sections.${i}.body`, v)} placeholder="Body text" rows={3} />
                  </Field>
                )}
                {s.type === 'timeline' && s.steps && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Steps ({s.steps.length})</div>
                    {s.steps.map((step: any, ti: number) => (
                      <div key={ti} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Step {ti + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Number">
                            <Input value={String(step.number)} onChange={(v) => onChange(`theProcess.sections.${i}.steps.${ti}.number`, Number(v))} placeholder="1" />
                          </Field>
                          <Field label="Emoji">
                            <Input value={step.emoji} onChange={(v) => onChange(`theProcess.sections.${i}.steps.${ti}.emoji`, v)} placeholder="🚛" />
                          </Field>
                          <Field label="Title">
                            <Input value={step.title} onChange={(v) => onChange(`theProcess.sections.${i}.steps.${ti}.title`, v)} placeholder="Collection & Transport" />
                          </Field>
                        </div>
                        <Field label="Body">
                          <Textarea value={step.body} onChange={(v) => onChange(`theProcess.sections.${i}.steps.${ti}.body`, v)} placeholder="Step description" rows={2} />
                        </Field>
                      </div>
                    ))}
                  </div>
                )}
                {s.type === 'stats' && s.stats && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Stats ({s.stats.length})</div>
                    {s.stats.map((stat: any, si: number) => (
                      <div key={si} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Stat {si + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Value">
                            <Input value={stat.value} onChange={(v) => onChange(`theProcess.sections.${i}.stats.${si}.value`, v)} placeholder="95%" />
                          </Field>
                          <Field label="Unit">
                            <Input value={stat.unit} onChange={(v) => onChange(`theProcess.sections.${i}.stats.${si}.unit`, v)} placeholder="recovery rate" />
                          </Field>
                          <Field label="Label">
                            <Input value={stat.label} onChange={(v) => onChange(`theProcess.sections.${i}.stats.${si}.label`, v)} placeholder="Description" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ===== QUIZ ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">🧠</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: Knowledge Check (Quiz)</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.quiz.heroTitle} onChange={(v) => onChange('quiz.heroTitle', v)} placeholder="Knowledge Check" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.quiz.heroSubtitle} onChange={(v) => onChange('quiz.heroSubtitle', v)} placeholder="You've learned a lot! Now let's see..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Questions</h4>
            {values.quiz.questions.map((_: { question: string; options: string[]; correct: number; explanation: string }, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Question {i + 1}</div>
                <Field label="Question Text">
                  <Textarea value={values.quiz.questions[i].question} onChange={(v) => onChange(`quiz.questions.${i}.question`, v)} placeholder="Question" rows={2} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  {[0, 1, 2, 3].map((oi) => (
                    <Field key={oi} label={`Option ${oi + 1}`}>
                      <Input value={values.quiz.questions[i].options[oi]} onChange={(v) => onChange(`quiz.questions.${i}.options.${oi}`, v)} placeholder={`Option ${oi + 1}`} />
                    </Field>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Correct Answer (index 0-3)">
                    <Input value={String(values.quiz.questions[i].correct)} onChange={(v) => onChange(`quiz.questions.${i}.correct`, Number(v))} placeholder="0" />
                  </Field>
                </div>
                <Field label="Explanation">
                  <Textarea value={values.quiz.questions[i].explanation} onChange={(v) => onChange(`quiz.questions.${i}.explanation`, v)} placeholder="Explanation" rows={3} />
                </Field>
              </div>
            ))}

            {/* ===== MODULE: TAKE ACTION ===== */}
            <div className="flex items-center gap-3 mt-8 mb-4 pb-2 border-b border-primary/10">
              <span className="text-xl">🤝</span>
              <h2 className="font-title text-xl font-bold text-primary">Module: Take Action</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Hero Title">
                <Input value={values.takeAction.heroTitle} onChange={(v) => onChange('takeAction.heroTitle', v)} placeholder="Take Action" />
              </Field>
              <Field label="Hero Subtitle">
                <Textarea value={values.takeAction.heroSubtitle} onChange={(v) => onChange('takeAction.heroSubtitle', v)} placeholder="Knowledge is only the first step..." rows={2} />
              </Field>
            </div>
            <h4 className="font-medium text-sm text-text/70 mt-3 mb-2">Sections</h4>
            {values.takeAction.sections.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Section {i + 1} — {s.type}</div>
                <Field label="Type">
                  <Input value={s.type} onChange={(v) => onChange(`takeAction.sections.${i}.type`, v)} placeholder="text / list" />
                </Field>
                <Field label="ID">
                  <Input value={s.id} onChange={(v) => onChange(`takeAction.sections.${i}.id`, v)} placeholder="why-act" />
                </Field>
                <Field label="Title">
                  <Input value={s.title} onChange={(v) => onChange(`takeAction.sections.${i}.title`, v)} placeholder="Your Actions Matter" />
                </Field>
                {s.type === 'text' && (
                  <Field label="Body">
                    <Textarea value={s.body} onChange={(v) => onChange(`takeAction.sections.${i}.body`, v)} placeholder="Body text" rows={3} />
                  </Field>
                )}
                {(s.type === 'list') && s.items && (
                  <div className="mt-3 pt-3 border-t border-dashed border-primary/10">
                    <div className="text-xs text-text/50 font-medium mb-2">Items ({s.items.length})</div>
                    {s.items.map((item: any, ii: number) => (
                      <div key={ii} className="p-3 bg-white/60 rounded-lg border border-primary/10 space-y-1.5 mb-2">
                        <div className="text-[11px] text-text/40 font-mono">Item {ii + 1}</div>
                        <div className="grid grid-cols-3 gap-2">
                          <Field label="Emoji">
                            <Input value={item.emoji} onChange={(v) => onChange(`takeAction.sections.${i}.items.${ii}.emoji`, v)} placeholder="1️⃣" />
                          </Field>
                          <Field label="Label">
                            <Input value={item.label} onChange={(v) => onChange(`takeAction.sections.${i}.items.${ii}.label`, v)} placeholder="Find a Certified Recycler" />
                          </Field>
                          <Field label="Desc">
                            <Input value={item.desc} onChange={(v) => onChange(`takeAction.sections.${i}.items.${ii}.desc`, v)} placeholder="Description" />
                          </Field>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* ===== PLEDGE (inside Take Action) ===== */}
            <h4 className="font-medium text-sm text-text/70 mt-4 mb-2 border-t border-primary/10 pt-4">Pledge Section (inside Take Action)</h4>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Pledge Title">
                <Input value={values.takeAction.pledge.title} onChange={(v) => onChange('takeAction.pledge.title', v)} placeholder="Take the Pledge" />
              </Field>
              <Field label="Pledge Subtitle">
                <Textarea value={values.takeAction.pledge.subtitle} onChange={(v) => onChange('takeAction.pledge.subtitle', v)} placeholder="Make a personal commitment..." rows={2} />
              </Field>
            </div>
            <Field label="CTA Button Text">
              <Input value={values.takeAction.pledge.cta} onChange={(v) => onChange('takeAction.pledge.cta', v)} placeholder="I Take the Pledge!" />
            </Field>
            <h5 className="text-xs text-text/50 font-medium mt-2 mb-1.5">Commitments</h5>
            {values.takeAction.pledge.commitments.map((_: string, i: number) => (
              <div key={i} className="p-4 bg-white/50 rounded-lg border border-primary/10 space-y-2 mb-3">
                <div className="text-xs text-text/50 font-medium uppercase tracking-wide">Commitment {i + 1}</div>
                <Field label={`Commitment ${i + 1}`}>
                  <Textarea value={values.takeAction.pledge.commitments[i]} onChange={(v) => onChange(`takeAction.pledge.commitments.${i}`, v)} placeholder="Commitment text" rows={2} />
                </Field>
              </div>
            ))}
          </>
        )}
      </AdminSection>
    </div>
  )
}
