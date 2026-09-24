'use client';

import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import OpeningDoors from './OpeningDoors';
import LanguageSelector from './LanguageSelector';
import { languages, t } from '../data/translations';
import { wedding } from '../data/wedding';

const keys = ['open','tap','bismillah','blessing','saveDate','ourStory','storyBody','events','ceremony','reception','venue','viewMap','countdown','days','hours','minutes','seconds','gallery','rsvp','rsvpBody','rsvpButton','closing','chooseLanguage','shukrana','nikah','valima','invitationIntro','familyInvitation'];
const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: .72, ease: 'easeOut' } } };

function useCountdown(target) {
  const [left, setLeft] = useState(null);

  useEffect(() => {
    const calculate = () => {
      const difference = Math.max(
        0,
        new Date(target).getTime() - Date.now()
      );

      setLeft(difference);
    };

    calculate();

    const id = setInterval(calculate, 1000);

    return () => clearInterval(id);
  }, [target]);

  if (left === null) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };
  }

  const total = Math.floor(left / 1000);

  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60
  };
}

function FloatingPetals() {
  return <div className="floating-petals" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <span key={i} style={{ '--i': i }}>✦</span>)}</div>;
}

export default function WeddingInvitation() {
  const [opened, setOpened] = useState(false);
  const [lang, setLang] = useState('en');
  const [showTop, setShowTop] = useState(false);
  const copy = useMemo(() => Object.fromEntries(keys.map((key) => [key, t(lang, key)])), [lang]);
  const count = useCountdown(wedding.countdownTarget);
  const direction = languages.find((x) => x.code === lang)?.dir || 'ltr';

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openInvitation = () => {
    setOpened(true);
    window.setTimeout(() => document.body.classList.add('invitation-opened'), 900);
  };

  return (
    <main className={`site ${direction === 'rtl' ? 'rtl' : ''}`} dir={direction}>
      <OpeningDoors open={opened} onOpen={openInvitation} couple={wedding.couple} copy={copy} />
      <div className={`invitation ${opened ? 'visible' : ''}`}>
        <header className="topbar">
          <a href="#top" className="brand-mark" aria-label="Back to top">H<span>✦</span>R</a>
          <div className="topbar-actions">
            <span className="live-dot">THE INVITATION</span>
            <LanguageSelector languages={languages} current={lang} onChange={setLang} label={copy.chooseLanguage} />
          </div>
        </header>

        <section id="top" className="hero section-shell">
          <FloatingPetals />
          <motion.div initial="hidden" animate={opened ? 'show' : 'hidden'} variants={reveal} className="ornament small">✦</motion.div>
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true, amount: .4 }} variants={reveal} className="eyebrow">{copy.bismillah}</motion.p>
          <motion.div className="hero-card" initial="hidden" whileInView="show" viewport={{ once: true, amount: .35 }} variants={reveal}>
            <div className="hero-card__halo" />
            <p className="hero-script">The Wedding Of</p>
            <h2>{wedding.couple.bride} <i>&</i> {wedding.couple.groom}</h2>
            <p className="hero-note">{copy.blessing}</p>
            <div className="date-ribbon"><span>{wedding.dates.nikah.dateLabel}</span><b>•</b><span>{wedding.dates.nikah.time}</span></div>
          </motion.div>
          <a className="scroll-cue" href="#story"><span />Scroll to discover</a>
        </section>

        <section id="story" className="paper-section section-shell split-section">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={reveal} className="portrait-frame">
            <div className="portrait-placeholder"><div className="portrait-orbit" /><span>{wedding.couple.bride[0]}</span><em>&</em><span>{wedding.couple.groom[0]}</span></div>
            <div className="portrait-caption">{wedding.couple.hashtag}</div>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} variants={reveal} className="story-copy">
            <p className="eyebrow">{copy.saveDate}</p>
            <h3>{copy.ourStory}</h3>
            <p>{copy.storyBody}</p><p className="family-note">{copy.familyInvitation}</p>
            <div className="signature-line"><span>With love</span><strong>{wedding.couple.shortNames}</strong></div>
          </motion.div>
        </section>

        <section className="section-shell count-section">
          <motion.p initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="eyebrow">{copy.countdown}</motion.p>
          <div className="count-grid">
            {[[count.days, copy.days], [count.hours, copy.hours], [count.minutes, copy.minutes], [count.seconds, copy.seconds]].map(([value, label]) => (
              <motion.div whileHover={{ y: -5 }} className="count-card" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></motion.div>
            ))}
          </div>
        </section>

        <section className="section-shell events-section">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="section-heading">
            <p className="eyebrow">{copy.events}</p><h3>{copy.invitationIntro}</h3>
          </motion.div>
          <div className="event-grid event-grid--three">
            {[wedding.dates.shukrana, wedding.dates.nikah, wedding.dates.valima].map((event, index) => (
              <motion.article key={event.title} initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className={`event-card ${index === 1 ? 'accent' : ''}`}>
                <span className="event-no">0{index + 1} / {event.title.toUpperCase()}</span>
                <h3>{event.title === 'Nikah' ? copy.ceremony : event.title === 'Valima' ? copy.reception : copy.shukrana}</h3>
                <p>{event.dateLabel}<br />{event.time}</p>
                {event.venue && <><div className="rule" /><p><strong>{event.venue}</strong><br />{event.address}</p>{event.mapsUrl && <a className="event-map" href={event.mapsUrl} target="_blank" rel="noreferrer">{copy.viewMap} ↗</a>}</>}
                <span className="event-badge">{index === 0 ? 'Gratitude' : index === 1 ? 'Nikah' : 'Celebration'}</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="venue-panel section-shell">
          <div><p className="eyebrow">{copy.venue}</p><h3>{wedding.dates.nikah.venue}</h3><p>{wedding.dates.nikah.address}</p></div>
          <a className="gold-button" href={wedding.dates.nikah.mapsUrl} target="_blank" rel="noreferrer">{copy.viewMap} ↗</a>
        </section>

        <section className="section-shell gallery-section">
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={reveal}
    className="section-heading"
  >
    <p className="eyebrow">{copy.gallery}</p>
    <h3>Frames from our story</h3>
  </motion.div>

  <div className="gallery-grid">
  {['Memory1', 'Memory2', 'Memory3', 'Memory4'].map((name, i) => (
    <motion.div
      key={name}
      initial={{ opacity: 0, scale: .96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: i * .08 }}
      className={`gallery-tile ${i === 3 ? 'gallery-wide' : ''}`}
    >
      <img
        src={`/images/${name}.jpg`}
        alt={`Heena and Rouf - Memory ${i + 1}`}
      />
    </motion.div>
  ))}
</div>
</section>

        <section className="section-shell rsvp-section">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal} className="rsvp-card">
            <div className="ornament">✦</div><p className="eyebrow">RSVP</p><h3>{copy.rsvp}</h3><p>{copy.rsvpBody}</p>
            <a className="gold-button large" href={`https://wa.me/${wedding.whatsapp}?text=Assalamu%20Alaikum%2C%20I%20would%20love%20to%20confirm%20my%20attendance%20for%20Heena%20%26%20Rouf's%20wedding.%20Looking%20forward%20to%20celebrating%20this%20beautiful%20occasion%20with%20you%20all%21.`} target="_blank" rel="noreferrer">{copy.rsvpButton} ↗</a>
          </motion.div>
        </section>

        <footer className="footer"><div className="brand-mark">H<span>✦</span>R</div><p>{copy.closing}</p><small>{wedding.couple.hashtag}</small> <div className="footer-contacts">
    <p ><small>7022978890</small><small>  •  </small><small>9902608635</small></p>
  </div></footer>

        <motion.a href="#top" className="back-top" animate={{ opacity: showTop ? 1 : 0, y: showTop ? 0 : 12, pointerEvents: showTop ? 'auto' : 'none' }} aria-label="Back to top">↑</motion.a>
      </div>
    </main>
  );
}
