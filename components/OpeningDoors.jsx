'use client';

import { motion } from 'framer-motion';

export default function OpeningDoors({ open, onOpen, couple, copy }) {
  return (
    <motion.section
      className="opening-screen"
      animate={{ opacity: open ? 0 : 1 }}
      transition={{ duration: 0.85, delay: open ? 1.35 : 0 }}
      style={{ pointerEvents: open ? 'none' : 'auto' }}
      aria-label="Wedding invitation opening"
    >
      <div className="opening-backdrop">
        <div className="reveal-card">
          <div className="reveal-card__seal">✦</div>
          <div className="reveal-card__script">You are invited</div>
          <div className="reveal-card__names">{couple.bride} <span>&</span> {couple.groom}</div>
          <div className="reveal-card__line" />
          <div className="reveal-card__date">{copy.saveDate}</div>
        </div>
      </div>

      <div className="opening-glow" />
      <div className="opening-particles" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>

      <div className="door-frame">
        <motion.div
          className="door door-left"
          animate={{ x: open ? '-101%' : '0%' }}
          transition={{ duration: 1.65, ease: [0.76, 0, 0.24, 1] }}
          onClick={onOpen}
        >
          <span className="door-edge" />
        </motion.div>
        <motion.div
          className="door door-right"
          animate={{ x: open ? '101%' : '0%' }}
          transition={{ duration: 1.65, ease: [0.76, 0, 0.24, 1] }}
          onClick={onOpen}
        >
          <span className="door-edge" />
        </motion.div>
      </div>

      <motion.div
        className="opening-copy"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: open ? 0 : 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="mini-bismillah">✦ {copy.bismillah} ✦</div>
        <div className="opening-kicker">A WEDDING INVITATION</div>
        <h1>{couple.bride} <span>&</span> {couple.groom}</h1>
        <p>{copy.tap}</p>
        <button className="open-button" onClick={onOpen}>
          <span className="open-button__icon">⌁</span>
          {copy.open}
          <span className="open-button__arrow">→</span>
        </button>
        <div className="swipe-hint">TAP ANYWHERE ON THE DOORS</div>
      </motion.div>

      <motion.div
        className="gold-sweep"
        animate={{ scaleX: open ? 1 : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 1.05, delay: 0.7, ease: 'easeInOut' }}
      />
    </motion.section>
  );
}
