const portraits = [
  "bfecd333187eed2b", "39312cf1492034d3", "35be9d026393057f",
  "663256ad5b21aa49", "8101ccca78459b20", "4b770d58118c8c86",
  "f292948a93d82c4f", "683ec551d4f19272", "fab7108c4ced00ed",
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="title">
        <div className="grain" />
        <nav>
          <span className="monogram">CN</span>
          <a href="#gallery">Portraits</a>
          <a className="ig" href="https://www.instagram.com/chaimaa_nouassi/" target="_blank" rel="noreferrer">Instagram ↗</a>
        </nav>

        <div className="hero-copy">
          <p className="eyebrow">A portrait in light, movement &amp; quiet confidence</p>
          <h1 id="title" aria-label="Chaimaa">
            {"CHAIMAA".split("").map((letter, index) => (
              <span className={`photo-letter letter-${index + 1}`} key={`${letter}-${index}`}>{letter}</span>
            ))}
          </h1>
          <div className="hero-meta">
            <p>Born to win <span>♥</span></p>
            <p className="location">Yousra · Morocco</p>
          </div>
        </div>

        <div className="scroll-cue"><i /> scroll to discover</div>
      </section>

      <section className="statement">
        <p className="index">01 / Essence</p>
        <h2>Soft as daylight.<br /><em>Unmistakably</em> her.</h2>
        <p className="aside">A study in natural beauty—curly silhouettes, sun-warmed moments, and a gaze that never needs to ask for attention.</p>
      </section>

      <section className="gallery" id="gallery" aria-label="Selected portraits">
        {portraits.map((id, index) => (
          <figure className={`portrait p${index + 1}`} key={id}>
            <img src={`/portraits/${id}.jpg`} alt={`Chaimaa portrait ${index + 1}`} loading={index < 3 ? "eager" : "lazy"} />
            <figcaption>{String(index + 1).padStart(2, "0")} <span>—</span> une lumière</figcaption>
          </figure>
        ))}
      </section>

      <section className="interlude">
        <div className="orb"><img src="/portraits/eddde12ad8913a26.jpg" alt="Chaimaa by the sea" /></div>
        <p>Her world,<br /><em>her rhythm.</em></p>
      </section>

      <footer>
        <div className="footer-name">CHAIMAA</div>
        <p>Curated with admiration · 2026</p>
        <a href="https://www.instagram.com/chaimaa_nouassi/" target="_blank" rel="noreferrer">@chaimaa_nouassi ↗</a>
      </footer>
    </main>
  );
}
