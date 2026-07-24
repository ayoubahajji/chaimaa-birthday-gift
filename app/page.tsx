"use client";

import { useEffect, useRef, useState } from "react";

const gallery = [
  ["/gift/8101ccca78459b20.jpg", "the look that starts a thousand sunsets", "close enough to remember"],
  ["/gift/39312cf1492034d3.jpg", "a little mischief, a lot of heart", "soft evidence"],
  ["/gift/4b770d58118c8c86.jpg", "you + a sunflower = my favourite equation", "the golden chapter"],
  ["/gift/683ec551d4f19272.jpg", "there is a universe behind that glance", "midnight cinema"],
  ["/gift/663256ad5b21aa49.jpg", "every version of you is worth keeping", "small-room magic"],
  ["/gift/eddde12ad8913a26.jpg", "the sea keeps your secret", "blue hour"],
  ["/gift/greenhouse.jpg", "you make even the sky feel personal", "open air"],
  ["/gift/birthday-portrait.jpeg", "twenty-three, and still becoming", "the next page"],
];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [answer, setAnswer] = useState<"yes" | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.72;
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) { audio.play().then(() => setPlaying(true)).catch(() => undefined); }
    else { audio.pause(); setPlaying(false); }
  };

  const handleCatClick = () => {
    if (transitioning || opened) return;
    const audio = audioRef.current;
    if (audio) audio.play().then(() => setPlaying(true)).catch(() => undefined);
    
    setTransitioning(true);
    setTimeout(() => {
      setOpened(true);
    }, 600);
  };

  const moveNo = () => {
    const panel = gameRef.current;
    const button = noRef.current;
    if (!panel || !button) return;
    const maxX = Math.max(0, panel.clientWidth - button.offsetWidth - 24);
    const maxY = Math.max(0, panel.clientHeight - button.offsetHeight - 24);
    setNoPosition({ x: Math.round(12 + Math.random() * maxX), y: Math.round(12 + Math.random() * maxY) });
  };

  return (
    <main className="gift-site">
      <audio ref={audioRef} src="/gift/july-25-song.mp3" loop preload="auto" aria-label="Birthday song" />
      <button className={`sound-toggle ${playing ? "is-playing" : ""}`} onClick={toggleSound} aria-label={playing ? "Pause the birthday song" : "Play the birthday song"}>
        <span className="sound-orbit" /> {playing ? "sound on" : "tap for sound"}
      </button>

      <section className={`birthday-cover ${transitioning ? "is-transitioning" : ""} ${opened ? "is-opened" : ""}`} id="top" aria-label="Birthday opening">
        {/* Shockwave & Light Flare Transition Layer */}
        <div className="portal-burst-overlay" aria-hidden="true">
          <div className="burst-wave wave-1" />
          <div className="burst-wave wave-2" />
          <div className="burst-flash" />
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="burst-particle" style={{
              "--angle": `${i * 15}deg`,
              "--dist": `${120 + (i % 5) * 40}px`,
              "--delay": `${(i % 4) * 0.05}s`
            } as React.CSSProperties}>✦</span>
          ))}
        </div>

        {/* Ambient floating sparkles */}
        <div className="cat-sparkles" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} style={{
              left: `${(i * 29 + 4) % 96}%`,
              top: `${(i * 19 + 6) % 94}%`,
              animationDelay: `${((i * 0.45) % 5).toFixed(2)}s`,
              animationDuration: `${(5 + (i % 4) * 2).toFixed(1)}s`
            }}>{i % 4 === 0 ? "✧" : i % 4 === 1 ? "✦" : i % 4 === 2 ? "♡" : "•"}</span>
          ))}
        </div>

        {/* Luxury Cat Intro */}
        <div className="cat-intro">
          <div className="cat-halo" aria-hidden="true" />
          <div className="cat-frame" onClick={handleCatClick} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleCatClick(); }} role="button" tabIndex={0} aria-label="Tap the magical kitten to unlock your birthday surprise">
            <span className="cat-ring cat-ring-outer" aria-hidden="true" />
            <span className="cat-ring cat-ring-inner" aria-hidden="true" />
            <span className="cat-glow-core" aria-hidden="true" />
            <img className="cat-img" src="/gift/luxury-cat.jpg" alt="Chaimaa's magical birthday kitten guardian" />
            <div className="cat-badge">
              <span>TAP TO UNLOCK</span>
            </div>
          </div>
          <div className="cat-text">
            <p className="cat-whisper">Chaimaa&rsquo;s Secret Guardian</p>
            <p className="cat-cta">touch the kitten to reveal the magic <span>♡</span></p>
          </div>
        </div>

        {/* Paw trail at bottom */}
        <div className="cat-trail" aria-hidden="true">
          <span>🐾</span><span>🐾</span><span>🐾</span><span>🐾</span><span>🐾</span>
        </div>

        {/* Birthday Message Reveal */}
        <div className="bday-msg">
          <div className="bday-msg-card">
            <p className="bday-overline">25 July · a private birthday wish</p>
            <div className="bday-portrait-wrap">
              <span className="portrait-ring" />
              <div className="bday-portrait"><img src="/gift/birthday-portrait.jpeg" alt="Chaimaa" /></div>
            </div>
            <p className="bday-from">from AyouB Ahajji, with a full heart</p>
            <h1>Happy Birthday,<br /><em>Chaimaa.</em></h1>
            <p className="bday-note">Twenty-three is not just a number today.<br />It is a new sky opening above you.</p>
            <p className="bday-scroll">scroll when you are ready <span>↓</span></p>
          </div>
        </div>
      </section>

      <section className="letter-section" id="letter">
        <div className="letter-intro reveal"><p className="section-label">01 / A letter in the margins</p><p className="side-note">written with the kind of feeling that makes the room go quiet</p></div>
        <div className="letter-wrap reveal">
          <aside className="lyric-card"><p className="lyric-label">A song left beside this letter</p><blockquote>You know I never meant to see you again<br />But I only passed by as a friend, yeah<br />All this time I stayed out of sight<br />I started wondering why</blockquote><blockquote>Now I wish it would rain down, down on me<br />Ooh, yes, I wish it would rain, rain down on me now<br />Ooh, yes, I wish it would rain down, down on me<br />Ooh, yes, I wish it would rain on me</blockquote><cite>— Phil Collins, &ldquo;I Wish It Would Rain Down&rdquo;</cite></aside>
          <div className="letter-paper"><span className="paper-stamp">23</span><p className="handwritten">My dear Chaimaa,</p><p className="letter-body">I hope this new year of your life is gentle with you. I hope it gives you a thousand reasons to smile, and the courage to keep every dream that makes your eyes shine.</p><p className="letter-body">You have this rare way of making ordinary moments feel like they were written just for us. Your laugh, your softness, the way you notice little things — they stay with me long after the moment is gone.</p><p className="letter-body">I want you to know this, without a single doubt: <strong>you are the light in my life.</strong> Not because you have to be anything for me, but because being close to your light makes the whole world feel warmer.</p><p className="letter-body">So here is my wish for 23: may you feel loved in every room, may joy find you unexpectedly, and may you always see the beautiful person I see when I look at you.</p><p className="handwritten signature">Always cheering for your light,<br /><em>AyouB Ahajji</em></p></div>
        </div>
        <div className="letter-image reveal"><img src="/gift/whatsapp-sun.jpeg" alt="Chaimaa in warm sunlight" /><span>keep this feeling</span></div>
      </section>

      <section className="zoom-section">
        <div className="zoom-copy reveal"><p className="section-label">02 / The details I keep</p><h2>Some people are a whole <em>season.</em></h2><p>There is no single version of you I love seeing. There is the sunlight one, the sleepy one, the brave one, the one who hides behind a cap and still somehow gives the game away.</p></div>
        <div className="zoom-portrait reveal"><img src="/gift/8101ccca78459b20.jpg" alt="Close-up portrait of Chaimaa" /><div className="zoom-lens"><span>zoom in</span><i /></div></div>
      </section>

      <section className="pet-section">
        <div className="pet-copy reveal"><p className="section-label">03 / For the soft-hearted</p><h2>Every creature you love gets a little more <em>loved.</em></h2><p>That is one of the things I notice most: your tenderness never needs an audience. It simply appears — in the way you stop for a paw, a little face, a small life asking to be held.</p><span className="paw-line">♡ · · · ♡ · · · ♡</span></div>
        <div className="cat-art reveal"><img src="/gift/cat-story.png" alt="Illustrated cat moments" /><span className="cat-caption">your kind of magic has whiskers</span></div>
      </section>

      <section className="memory-section" id="gallery">
        <div className="memory-heading reveal"><p className="section-label">04 / A small archive of you</p><h2>Proof that beauty<br /><em>moves.</em></h2><p>Not posed. Not perfect. Just yours.</p></div>
        <div className="memory-grid">{gallery.map(([src, alt, caption], index) => <figure className={`memory-card card-${index + 1} reveal`} key={src}><img src={src} alt={alt} loading={index < 2 ? "eager" : "lazy"} /><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{caption}</figcaption></figure>)}</div>
      </section>

      <section className="finale" id="question">
        <div className="finale-backdrop"><img src="/gift/eddde12ad8913a26.jpg" alt="Chaimaa by the sea" /></div>
        <div className="finale-content reveal"><p className="section-label">05 / The only question</p><p className="finale-prelude">I saved the best page for last.</p><h2>Do you accept<br /><em>to be my kitten?</em></h2><p className="game-subtitle">No pressure. Just a tiny, ridiculous, very sincere question.</p><div className={`answer-zone ${answer ? "answered" : ""}`} ref={gameRef}><button className="yes-button" onClick={() => setAnswer("yes")}>yes, obviously <span>♡</span></button><button className="no-button" ref={noRef} onPointerEnter={moveNo} onFocus={moveNo} onClick={moveNo} style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}>no</button></div>{answer && <div className="congrats" role="dialog" aria-modal="true" aria-label="Birthday celebration"><div className="confetti" aria-hidden="true">{Array.from({ length: 34 }, (_, index) => <span key={index} style={{ left: `${10 + ((index * 29) % 80)}%`, top: `${32 + ((index * 11) % 30)}%`, animationDelay: `${index * .04}s` }}>✦</span>)}</div><p>the whole sky just clapped.</p><strong>She said yes.<br />Happy 23, my favourite light.</strong><small>— AyouB Ahajji</small></div>}</div>
      </section>

      <footer className="gift-footer"><p>made slowly, with a song, a thousand memories, and a very full heart</p><span>Chaimaa · 23</span><a href="#top">back to the first note ↑</a></footer>
    </main>
  );
}
