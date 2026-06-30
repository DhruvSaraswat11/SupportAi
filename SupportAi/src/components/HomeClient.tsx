'use client'
import React, { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import axios from 'axios'
import { useRouter } from "next/navigation"; 

const HomeClient = ({ email }: { email: string | undefined }) => {
  const [loading , setLoading] = useState( false ) ;
  // console.log(email) 
  email = email ? email?.toUpperCase()[0] : undefined
  const hAndleLogin = () => {
    setLoading( true )
    // wAy 1
    window.location.href = "/api/auth/login"
  }
  const HAndleLogout = async () => {
    try {
      // wAy 2
      await axios.get("/api/auth/logout")
      window.location.href = "/"
    } catch (error) {
      console.log(error)
    }
  }

  const [open, setOpen] = useState(false);
  const navigate = useRouter();
  const popupRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const hAndler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", hAndler)
    return () => document.removeEventListener("mousedown", hAndler)
  }, [])
  const feAtures = [
    {
      title: " Plug & Play ",
      desc: " Add the chatbot to your site with a single script Tag "
    },
    {
      title: " Admin controlled ",
      desc: " You control exactly what the AI knows and Answers "
    },
    {
      title: " Always Online ",
      desc: " Your customer get instant support 24/7 . "
    }
  ]

  return (
    <div className='min-h-screen bg-linear-to-br from-white to-zinc-50 overflow-x-hidden text-zinc-900'>
      <motion.nav
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className=' fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 '
      >
        <div className=' max-w-7xl mx-auto px-6 h-16 flex justify-between items-center'>
          <div className='text-lg font-semibold tracking-tight' >Support<span className='text-zinc-400'>Ai</span></div>

          {
            email ? <div className=' relative' ref={popupRef}
            > <button className='w-10 h-10 cursor-pointer bg-black font-semibold rounded-full text-white flex items-center justify-center hover:scale-105 transition'
              onClick={() => setOpen(!open)}
            >
                {email}
              </button>
              <AnimatePresence>

                {open && (<motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className=' absolute right-0 mt-2.5 w-44 bg-white rounded-xl shadow-xl border border-zinc-300 overflow-hidden flex flex-col items-center justify-center '
                >
                  <button onClick={() => navigate.push("/dashboard")} className=' w-full cursor-pointer text-left px-7 py-1.5 text-sm hover:bg-zinc-100  '> Dashboard </button>

                  <button onClick={HAndleLogout} className=' w-full text-left py-1.5 px-7 text-red-600 cursor-pointer text-sm hover:bg-zinc-100 '> Logout </button>
                </motion.div>)}

              </AnimatePresence>


            </div> :
              <button onClick={hAndleLogin}
                className=' tracking-tight px-6 py-2 text-center cursor-pointer rounded-full
            bg-black text-white hover:bg-zinc-800 transition text-sm flex items-center gap-2 font-medium disabled:opacity-60'
            disabled = { loading }
              > { loading ? "Loading..." : "Login" } </button>

          }


        </div>
      </motion.nav>

      <section className='pt-36 pb-27 px-6'>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
          { /* left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className='text-4xl md:text-5xl font-semibold leading-tight'> Ai customer support <br />
              Built for modern websites
            </h1>
            <p className='mt-6 text-lg text-zinc-600 max-w-xl'> Add a powerful AI chatbot to your website in minutes.
              Let your customers get instant answers using your own business knowledge</p>
            <div className=' mt-10 flex gap-4 '>
              {email ? <button onClick={() => navigate.push("/dashboard")}  className='bg-zinc-950 text-white px-7 cursor-pointer py-2.5 font-medium hover:bg-zinc-800 transition disabled:opacity-60 rounded-xl '> Go to Dashboard </button>
                : <button className='bg-zinc-950 text-white px-7 py-2.5 font-medium hover:bg-zinc-800 transition disabled:opacity-60 rounded-xl '> get started </button>
              }

              < a href="#scroll" className=' px-7 py-2.5 rounded-xl border border-zinc-400 
            hover:bg-zinc-100 transition '> Learn more </ a >
            </div>
          </motion.div>
          { /* right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='relative'
          >
            <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
              <div className='text-sm text-zinc-500 mb-2.5 '> Live chat Preview </div>
              <div className=' space-y-2 '>
                <div className='bg-zinc-950 text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit '> do you offer cash on delivery ?  </div>
                <div className=' bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit ' > yes , cash on delivery available  </div>
              </div>
              < motion.div
                animate={{ y: [0, -11, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className=' absolute right-0 w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center'
              >
                🗨️
              </ motion.div >
            </div>
          </motion.div>
        </div>
      </section>

      <section className=' bg-zinc-50 py-28 px-6 border-t border-zinc-200 '>
        <div id='scroll' className=' max-w-6xl mx-auto'>
          < motion.h2 className=' text-3xl font-semibold text-center '
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
          > Why Businesses Choose SupportAi  </ motion.h2 >

          <div className=' mt-16 grid grid-cols-1 md:grid-cols-3 gap-11 '>

            {feAtures.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className=' bg-white rounded-2xl p-8 shadow-lg border border-zinc-200 '
              >
                <h1 className=' text-lg font-medium '> {f.title} </h1>
                <p className=' mt-3 text-zinc-600 text-sm '> {f.desc} </p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      <footer className=' py-10 text-center text-sm text-zinc-500 '>
        &copy; {new Date().getFullYear()} support Ai. All rights reserved
      </footer>
    </div>
  )
}

export default HomeClient
