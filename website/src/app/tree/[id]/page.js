'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import InfoCard from '@/components/InfoCard'
import ScrollProgress from '@/components/ScrollProgress'

const treeData = {
  mangga: {
    name: 'Pohon Mangga',
    latinName: 'Mangifera indica',
    family: 'Anacardiaceae',
    sections: {
      akar: {
        title: 'Sistem Perakaran',
        description: 'Akar tunggang yang kuat dan dalam, mampu menembus tanah hingga kedalaman 6 meter. Akar lateral menyebar luas untuk menyerap air dan nutrisi.',
        facts: [
          'Akar tunggang utama bisa mencapai 6m',
          'Sistem akar lateral menyebar 2x lebar tajuk',
          'Simbiosis dengan mikoriza untuk penyerapan nutrisi'
        ]
      },
      batang: {
        title: 'Batang & Kayu',
        description: 'Batang tegak dengan kulit kasar berwarna abu-abu kehitaman. Kayu mangga termasuk kayu keras yang sering digunakan untuk furniture.',
        facts: [
          'Tinggi pohon bisa mencapai 40 meter',
          'Diameter batang hingga 1.2 meter',
          'Kayu digunakan untuk furniture dan konstruksi'
        ]
      },
      daun: {
        title: 'Daun & Tajuk',
        description: 'Daun berbentuk lanset dengan ujung runcing, berwarna hijau tua mengkilap. Tajuk rimbun berbentuk kubah memberikan keteduhan yang luas.',
        facts: [
          'Daun menghasilkan O₂ untuk 4 orang/hari',
          'Menyerap CO₂ hingga 22kg per tahun',
          'Tajuk bisa mencapai diameter 25 meter'
        ]
      }
    },
    benefits: [
      'Buah kaya vitamin A dan C',
      'Daun untuk obat tradisional',
      'Peneduh dan penyejuk udara',
      'Habitat burung dan serangga'
    ]
  }
}

export default function TreePage({ params }) {
  const [currentSection, setCurrentSection] = useState('akar')
  const [isLoaded, setIsLoaded] = useState(false)
  const { scrollYProgress } = useScroll()
  const containerRef = useRef(null)
  
  const tree = treeData[params.id] || treeData.mangga

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' })
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPercent > 0.7) setCurrentSection('akar')
      else if (scrollPercent > 0.3) setCurrentSection('batang')
      else setCurrentSection('daun')
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main 
      ref={containerRef}
      className={`relative transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <ScrollProgress progress={scrollYProgress} />
      <InfoCard tree={tree} currentSection={currentSection} />

      {/* ===== SECTION DAUN (PALING ATAS) ===== */}
      <section className="relative min-h-[120vh]">
        {/* Background sky */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/seamless-sky.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Overlay daun */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/TreeD-daun.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Content */}
        <div className="relative z-10 pt-20 px-4">
          <motion.div 
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {tree.sections.daun.title}
            </h2>
            <p className="text-gray-100 mb-8 drop-shadow">{tree.sections.daun.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {tree.sections.daun.facts.map((fact, i) => (
                <motion.div key={i} className="glass p-4 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <p className="text-white text-sm">{fact}</p>
                </motion.div>
              ))}
            </div>
            <div className="glass-dark rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-forest-300 mb-4">Manfaat {tree.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {tree.benefits.map((benefit, i) => (
                  <motion.div key={i} className="flex items-center gap-2 text-left"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-forest-400">✓</span>
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION BATANG (TENGAH) - SKY + BATANG KEDUANYA LOOP ===== */}
      <section className="relative min-h-[300vh]">
        {/* Background sky - LOOP */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/seamless-sky.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: 'center',
          }}
        />
        {/* Batang overlay - LOOP */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/TreeD-batang.png)',
            backgroundRepeat: 'repeat-y',
            backgroundSize: '100% auto',
            backgroundPosition: 'center',
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-[300vh] py-20 px-4">
          <motion.div 
            className="glass-dark rounded-2xl p-8 max-w-lg text-center sticky top-1/2 -translate-y-1/2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tree.sections.batang.title}</h2>
            <p className="text-gray-300 mb-6">{tree.sections.batang.description}</p>
            <div className="space-y-3">
              {tree.sections.batang.facts.map((fact, i) => (
                <motion.div key={i} className="flex items-center gap-3 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <span className="w-2 h-2 bg-forest-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-200 text-sm">{fact}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION AKAR (PALING BAWAH) ===== */}
      <section className="relative min-h-[120vh]">
        {/* Background grass */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/grass.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
        {/* Overlay akar */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/assets/TreeD-akar.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex items-end justify-center min-h-[120vh] pb-20 px-4">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-forest-300 text-sm mb-2">Mulai dari sini</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {tree.sections.akar.title}
            </h2>
            <p className="text-gray-200 max-w-lg mx-auto drop-shadow">{tree.sections.akar.description}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {tree.sections.akar.facts.map((fact, i) => (
                <motion.span key={i} className="glass px-4 py-2 rounded-full text-sm text-white"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {fact}
                </motion.span>
              ))}
            </div>
            <motion.div 
              className="mt-12 text-white/70 text-sm flex flex-col items-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <span className="text-2xl">↑</span>
              <span>Scroll ke atas untuk menjelajah pohon</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-earth-900 py-6 text-center">
        <p className="text-gray-500 text-sm">I.Q.R.A - Intelligent Quick-Response Arboretum</p>
        <p className="text-gray-600 text-xs mt-1">© 2025 - Proyek Edukasi Digital</p>
      </footer>
    </main>
  )
}
