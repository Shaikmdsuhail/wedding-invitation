'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function LanguageSelector({ languages, current, onChange, label }) {
  const [open, setOpen] = useState(false);
  const selected = languages.find((item) => item.code === current) || languages[0];
  return (
    <div className="language-wrap">
      <button className="language-trigger" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="globe">◎</span><span>{selected.native}</span><span className="chevron">⌄</span>
      </button>
      <AnimatePresence>
        {open && <>
          <motion.div className="language-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.div className="language-menu" initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }}>
            <div className="language-menu__head"><span>{label}</span><button onClick={() => setOpen(false)}>×</button></div>
            <div className="language-grid">
              {languages.map((item) => <button key={item.code} dir={item.dir} className={item.code === current ? 'language-option active' : 'language-option'} onClick={() => { onChange(item.code); setOpen(false); }}>
                <span>{item.native}</span><small>{item.label}</small>{item.code === current && <b>✓</b>}
              </button>)}
            </div>
          </motion.div>
        </>}
      </AnimatePresence>
    </div>
  );
}
