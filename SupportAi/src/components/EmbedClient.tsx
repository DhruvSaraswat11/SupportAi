
"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from 'motion/react'

function EmbedClient({ ownerId }: { ownerId: string }) {
  const Router = useRouter()
  const [copied, setCopied] = useState(false)

  const embedCode = `<script src="${process.env.NEXT_PUBLIC_URL}/chatBot.js"
  data-owner-id="${ownerId}">
</script>`

  const CopyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const steps = [
    { title: 'Copy the snippet', body: 'Grab the script tag above — it already has your owner ID baked in.' },
    { title: 'Paste before </body>', body: 'Drop it near the end of your HTML, on every page you want the widget on.' },
    { title: 'Reload your site', body: 'The launcher appears in the bottom-right corner within a few seconds.' },
  ]

  return (
    <div className="min-h-screen" style={{ background: '#FAF8F3', color: '#1C1B1A' }}>
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-sm" style={{ background: '#FAF8F3ee', borderBottom: '1px solid #E8E3D8' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div
            onClick={() => Router.push('/')}
            className="text-base sm:text-lg font-semibold cursor-pointer tracking-tight"
          >
            Support<span className=' text-zinc-300 ' >Ai</span>
          </div>
          <button
            onClick={() => Router.push('/dashboard')}
            className="px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer transition"
            style={{ border: '1px solid #E8E3D8' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#EAF3EC')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Back to dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 sm:mb-14 max-w-2xl"
        >
          <span
            className="inline-block text-[11px] sm:text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full mb-4"
            style={{ background: '#EAF3EC', color: '#2D6A4F' }}
          >
            Website chatbot
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight mb-3 leading-tight">
            Embed your chatbot in three steps
          </h1>
          <p className="text-sm sm:text-base" style={{ color: '#8A8578' }}>
            One script tag connects your site to this assistant. No build step, no dependencies — just paste and reload.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-10">
          {/* Left: code + steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Code block */}
            <div
              className="relative rounded-xl p-4 sm:p-5 mb-4 font-mono text-xs sm:text-sm overflow-hidden"
              style={{ background: '#1C1B1A', color: '#F4F1EA' }}
            >
              <div className="flex items-center gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#EF6B5A' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#F0C351' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#5FAE7F' }} />
              </div>
              <pre className="overflow-x-auto pr-2 leading-relaxed whitespace-pre-wrap sm:whitespace-pre break-words">
                {embedCode}
              </pre>
              <button
                onClick={CopyCode}
                disabled={copied}
                className="absolute top-4 right-4 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition whitespace-nowrap"
                style={{
                  background: copied ? '#2D6A4F' : '#F4F1EA',
                  color: copied ? '#F4F1EA' : '#1C1B1A',
                }}
              >
                {copied ? 'Copied ✓' : 'Copy'}
              </button>
            </div>
            <p className="text-xs sm:text-sm mb-8 sm:mb-10" style={{ color: '#8A8578' }}>
              Paste this right before the closing <code className="px-1 py-0.5 rounded" style={{ background: '#EAF3EC' }}>&lt;/body&gt;</code> tag.
            </p>

            {/* Steps timeline */}
            <div className="relative pl-2">
              {steps.map((step, i) => (
                <div key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < steps.length - 1 && (
                    <span
                      className="absolute left-[15px] top-8 bottom-0 w-px"
                      style={{ background: '#E8E3D8' }}
                    />
                  )}
                  <div
                    className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{ background: '#1C1B1A', color: '#F4F1EA' }}
                  >
                    {i + 1}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs sm:text-sm" style={{ color: '#8A8578' }}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: live preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-sm font-semibold mb-1">Live preview</h2>
            <p className="text-xs sm:text-sm mb-4" style={{ color: '#8A8578' }}>
              A rough idea of how the widget sits on your page.
            </p>

            <div
              className="rounded-xl overflow-hidden shadow-sm"
              style={{ border: '1px solid #E8E3D8', background: '#fff' }}
            >
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-3 sm:px-4 h-10" style={{ background: '#F4F1EA', borderBottom: '1px solid #E8E3D8' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: '#EF6B5A' }} />
                <span className="w-2 h-2 rounded-full" style={{ background: '#F0C351' }} />
                <span className="w-2 h-2 rounded-full" style={{ background: '#5FAE7F' }} />
                <div
                  className="ml-2 flex-1 h-6 rounded-md text-[11px] flex items-center px-2 truncate"
                  style={{ background: '#fff', border: '1px solid #E8E3D8', color: '#8A8578' }}
                >
                  yourwebsite.com
                </div>
              </div>

              {/* Page body */}
              <div className="relative h-80 sm:h-96 p-5 sm:p-6" style={{ color: '#C9C4B6' }}>
                <div className="space-y-2">
                  <div className="h-2.5 w-2/3 rounded" style={{ background: '#EFEBE1' }} />
                  <div className="h-2.5 w-1/2 rounded" style={{ background: '#EFEBE1' }} />
                  <div className="h-2.5 w-5/6 rounded" style={{ background: '#EFEBE1' }} />
                </div>

                {/* Chat panel */}
                <div
                  className="absolute bottom-20 sm:bottom-24 right-3 left-3 sm:left-auto sm:w-64 rounded-xl overflow-hidden shadow-lg"
                  style={{ border: '1px solid #E8E3D8', background: '#fff' }}
                >
                  <div
                    className="flex items-center justify-between px-3 py-2 text-xs font-medium"
                    style={{ background: '#1C1B1A', color: '#F4F1EA' }}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#5FAE7F' }} />
                      Customer support
                    </span>
                    <span className="opacity-60 cursor-pointer">✕</span>
                  </div>
                  <div className="p-3 space-y-2" style={{ background: '#FAF8F3' }}>
                    <div
                      className="text-xs px-3 py-2 rounded-lg w-fit max-w-[85%]"
                      style={{ background: '#EAF3EC', color: '#1C1B1A' }}
                    >
                      Hi! How can I help you today?
                    </div>
                    <div
                      className="text-xs px-3 py-2 rounded-lg ml-auto w-fit max-w-[85%]"
                      style={{ background: '#1C1B1A', color: '#F4F1EA' }}
                    >
                      What&apos;s your return policy?
                    </div>
                    {/* typing indicator */}
                    <div
                      className="flex items-center gap-1 px-3 py-2.5 rounded-lg w-fit"
                      style={{ background: '#EAF3EC' }}
                    >
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: '#2D6A4F', animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Launcher */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                  style={{ background: '#1C1B1A' }}
                >
                  <span
                    className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full animate-pulse"
                    style={{ background: '#5FAE7F', border: '2px solid #FAF8F3' }}
                  />
                  <span className="text-lg sm:text-xl" style={{ color: '#F4F1EA' }}>💬</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EmbedClient

