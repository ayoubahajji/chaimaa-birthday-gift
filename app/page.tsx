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

const petals = ["✦", "·", "✧", "♡", "✦", "·", "✧", "♡", "✦", "·", "✧", "♡"];

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);
  const gameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [answer, setAnswer] = useState<"yes" | null>(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.72;
    const start = () => {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    };
    start();
    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("keydown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
    };
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

      <section className="opening" id="top">
        <div className="opening-stars" aria-hidden="true">{petals.map((petal, index) => <span key={`${petal}-${index}`} style={{ left: `${8 + index * 7.3}%`, top: `${18 + (index % 4) * 17}%`, animationDelay: `${index * .22}s` }}>{petal}</span>)}</div>
        <nav className="gift-nav"><span className="nav-mark">A + C</span><span>25 / 07</span><a href="#letter">open slowly ↓</a></nav>
        <div className="opening-stage">
          <div className="spell-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="orbit-gem gem-one"><span>25</span></div>
          <div className="orbit-gem gem-two"><span>07</span></div>
          <div className="cat-diamond"><img src="/gift/cat-story.png" alt="" /></div>
          <div className="portrait-gem"><img src="/gift/birthday-portrait.jpeg" alt="Chaimaa in a soft blue portrait" /></div>
          <div className="opening-copy"><p className="kicker">a birthday spell for one extraordinary soul</p><h1>Chaimaa<br /><em>made of light &amp; little miracles</em></h1><p className="tiny-note">a ring · a diamond · a tiny cat guardian · and your new year</p></div>
        </div>
        <div className="opening-footer"><span>for your 23rd orbit around the sun</span><span>scroll when you are ready</span></div>
      </section>

      <section className="letter-section" id="letter">
        <div className="letter-intro reveal"><p className="section-label">01 / A letter in the margins</p><p className="side-note">written with the kind of feeling that makes the room go quiet</p></div>
        <div className="letter-wrap reveal">
          <aside className="lyric-card"><p className="lyric-label">A song left beside this letter</p><blockquote>You know I never meant to see you again<br />But I only passed by as a friend, yeah<br />All this time I stayed out of sight<br />I started wondering why</blockquote><blockquote>Now I wish it would rain down, down on me<br />Ooh, yes, I wish it would rain, rain down on me now<br />Ooh, yes, I wish it would rain down, down on me<br />Ooh, yes, I wish it would rain on me</blockquote><cite>— Phil Collins, “I Wish It Would Rain Down”</cite></aside>
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
