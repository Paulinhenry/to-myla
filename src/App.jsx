import { useState, useEffect, useRef } from "react";

const PLACEHOLDER_IMGS = [
  "https://placehold.co/600x800/f9d0e0/c2185b?text=📸+Foto+1",
  "https://placehold.co/600x800/fce4ec/ad1457?text=📸+Foto+2",
  "https://placehold.co/600x800/f8bbd0/880e4f?text=📸+Foto+3",
  "https://placehold.co/600x800/f3e5f5/6a1b9a?text=📸+Foto+4",
  "https://placehold.co/600x800/fce4ec/c2185b?text=📸+Foto+5",
  "https://placehold.co/600x800/f9d0e0/ad1457?text=📸+Foto+6",
];

const SECTIONS = [
  {
    img: PLACEHOLDER_IMGS[0],
    title: "Desde o primeiro dia...",
    text: "Tudo começou com um olhar, um sorriso, e algo que eu nunca mais consegui explicar. Você simplesmente entrou na minha vida e ficou.",
    emoji: "🌸",
    align: "right",
  },
  {
    img: PLACEHOLDER_IMGS[1],
    title: "Cada momento importa",
    text: "As risadas à toa, os abraços que não queriam acabar, os dias que pareciam perfeitos só porque você estava do meu lado.",
    emoji: "💫",
    align: "left",
  },
  {
    img: PLACEHOLDER_IMGS[2],
    title: "Com você, tudo fica mais bonito",
    text: "Você transforma o ordinário em extraordinário. Uma caminhada qualquer vira memória. Uma noite simples vira o melhor dia.",
    emoji: "🌙",
    align: "right",
  },
  {
    img: PLACEHOLDER_IMGS[3],
    title: "Minha pessoa favorita",
    text: "De todas as pessoas nesse mundo, você é a que eu escolho todos os dias. Com quem eu quero dividir cada capítulo.",
    emoji: "❤️",
    align: "left",
  },
  {
    img: PLACEHOLDER_IMGS[4],
    title: "Nossos momentos",
    text: "Cada foto é uma história, cada memória é um tesouro. E o melhor ainda está por vir — porque com você, quero tudo.",
    emoji: "📷",
    align: "right",
  },
  {
    img: PLACEHOLDER_IMGS[5],
    title: "Para sempre ao seu lado",
    text: "Obrigado por ser quem você é. Por me fazer sorrir, por me entender, por estar aqui. Eu te amo — mais do que consigo dizer.",
    emoji: "🌹",
    align: "left",
  },
];

function FloatingHearts() {
  const hearts = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((i) => (
        <span
          key={i}
          className="fheart"
          style={{
            left: `${5 + (i * 8) % 90}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${6 + (i % 4)}s`,
            fontSize: `${10 + (i % 3) * 6}px`,
            opacity: 0.15 + (i % 4) * 0.05,
          }}
        >
          {["♥", "✿", "★", "✦"][i % 4]}
        </span>
      ))}
    </div>
  );
}

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.18 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ data, index }) {
  const [ref, visible] = useScrollReveal();
  const isRight = data.align === "right";
  return (
    <section
      ref={ref}
      className={`section ${visible ? "section--visible" : ""} ${isRight ? "section--right" : "section--left"}`}
      style={{ "--delay": `${index * 0.05}s` }}
    >
      <div className="section__inner">
        <div className="section__img-wrap">
          <div className="section__img-frame">
            <img src={data.img} alt={data.title} className="section__img" />
            <div className="section__img-overlay" aria-hidden="true" />
          </div>
          <div className="section__badge" aria-hidden="true">{data.emoji}</div>
        </div>
        <div className="section__content">
          <div className="section__number" aria-hidden="true">0{index + 1}</div>
          <h2 className="section__title">{data.title}</h2>
          <p className="section__text">{data.text}</p>
          <div className="section__line" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function FinalMessage() {
  const [ref, visible] = useScrollReveal();
  return (
    <section ref={ref} className={`final ${visible ? "final--visible" : ""}`}>
      <div className="final__petals" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="petal" style={{ "--pi": i }}>🌸</span>
        ))}
      </div>
      <div className="final__content">
        <div className="final__heart" aria-hidden="true">♥</div>
        <h2 className="final__title">Te amo, meu amor</h2>
        <p className="final__text">
          Essa página é só um pedacinho do quanto você significa pra mim.
          Mas saiba que todos os dias, em cada pequena coisa, estou pensando em você. 💕
        </p>
        <div className="final__signature">— Com todo o meu amor 🌹</div>
      </div>
    </section>
  );
}

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const [animating, setAnimating] = useState(false);

  function handleReveal() {
    setAnimating(true);
    setTimeout(() => setRevealed(true), 800);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Lato:wght@300;400&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --rose: #e8789a;
          --rose-light: #f9d0e0;
          --rose-dark: #c2185b;
          --blush: #fdf0f4;
          --mauve: #7c3b5c;
          --cream: #fffbf9;
          --gold: #d4a96a;
          --text: #3a1a2e;
          --text-soft: #8c5a7a;
          --serif: 'Cormorant Garamond', serif;
          --sans: 'Lato', sans-serif;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--cream); color: var(--text); font-family: var(--sans); overflow-x: hidden; }

        /* SPLASH */
        .splash {
          position: fixed; inset: 0; z-index: 100;
          background: linear-gradient(160deg, #2a0a1f 0%, #4a1535 40%, #7c3b5c 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: opacity 0.8s ease, transform 0.8s ease;
          padding: 2rem;
          text-align: center;
        }
        .splash--exit { opacity: 0; transform: scale(1.06); pointer-events: none; }
        .splash__hearts { font-size: 2rem; letter-spacing: 0.5rem; margin-bottom: 2.5rem; animation: pulse-hearts 2s ease-in-out infinite; }
        @keyframes pulse-hearts { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
        .splash__title { font-family: var(--serif); font-size: clamp(2.2rem, 8vw, 3.5rem); font-weight: 300; color: #f9d0e0; line-height: 1.2; margin-bottom: 0.75rem; font-style: italic; }
        .splash__sub { font-family: var(--sans); font-size: 0.85rem; color: rgba(249,208,224,0.5); letter-spacing: 0.25rem; text-transform: uppercase; margin-bottom: 3rem; }
        .splash__btn {
          background: transparent;
          border: 1.5px solid rgba(249,208,224,0.6);
          color: #f9d0e0;
          font-family: var(--serif); font-size: 1.2rem; font-style: italic;
          padding: 1rem 2.5rem;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 0.05rem;
          position: relative;
          overflow: hidden;
          transition: all 0.4s ease;
        }
        .splash__btn::before {
          content: ''; position: absolute; inset: 0;
          background: rgba(249,208,224,0.12);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .splash__btn:hover::before { transform: scaleX(1); }
        .splash__btn:hover { border-color: rgba(249,208,224,0.9); }
        .splash__btn:active { transform: scale(0.97); }
        .splash__dots { display: flex; gap: 8px; margin-top: 2.5rem; }
        .splash__dot { width: 5px; height: 5px; border-radius: 50%; background: rgba(249,208,224,0.3); animation: dot-blink 1.5s ease-in-out infinite; }
        .splash__dot:nth-child(2){animation-delay:0.3s} .splash__dot:nth-child(3){animation-delay:0.6s}
        @keyframes dot-blink{0%,100%{opacity:0.3}50%{opacity:1}}

        /* MAIN */
        .main { opacity: 0; transition: opacity 0.6s ease 0.3s; }
        .main--visible { opacity: 1; }

        /* FLOATING HEARTS BG */
        .floating-hearts { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .fheart { position: absolute; bottom: -50px; animation: float-up linear infinite; color: var(--rose); }
        @keyframes float-up {
          0%{transform:translateY(0) rotate(0deg);opacity:0}
          10%{opacity:1}
          90%{opacity:0.8}
          100%{transform:translateY(-110vh) rotate(360deg);opacity:0}
        }

        /* HERO */
        .hero {
          min-height: 100svh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 3rem 1.5rem; position: relative; z-index: 1;
          background: linear-gradient(180deg, #fdf0f4 0%, var(--cream) 100%);
        }
        .hero__decor { font-size: 2.5rem; margin-bottom: 1.5rem; animation: spin-slow 8s linear infinite; display: inline-block; }
        @keyframes spin-slow{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .hero__label { font-size: 0.7rem; letter-spacing: 0.3rem; text-transform: uppercase; color: var(--rose); margin-bottom: 1rem; }
        .hero__title { font-family: var(--serif); font-size: clamp(3rem, 12vw, 6rem); font-weight: 300; color: var(--mauve); line-height: 1; font-style: italic; margin-bottom: 1rem; }
        .hero__subtitle { font-family: var(--serif); font-size: clamp(1rem, 4vw, 1.4rem); color: var(--text-soft); font-style: italic; font-weight: 300; max-width: 360px; line-height: 1.6; }
        .hero__scroll { margin-top: 3rem; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--text-soft); font-size: 0.72rem; letter-spacing: 0.2rem; text-transform: uppercase; animation: bob 2s ease-in-out infinite; }
        @keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(6px)}}
        .hero__scroll-arrow { width: 1px; height: 40px; background: linear-gradient(to bottom, transparent, var(--rose)); }

        /* SECTIONS */
        .section { padding: 4rem 1.25rem; position: relative; z-index: 1; }
        .section__inner { max-width: 440px; margin: 0 auto; }
        .section--left .section__inner { }
        .section--right .section__inner { }

        .section__img-wrap { position: relative; margin-bottom: 2rem; }
        .section__img-frame {
          border-radius: 24px; overflow: hidden;
          box-shadow: 0 8px 40px rgba(194,24,91,0.12);
          aspect-ratio: 3/4; position: relative;
        }
        .section--right .section__img-frame { border-radius: 48px 8px 48px 8px; }
        .section--left  .section__img-frame { border-radius: 8px 48px 8px 48px; }

        .section__img { width: 100%; height: 100%; object-fit: cover; display: block; transform: scale(1.05); transition: transform 0.8s ease; }
        .section__img-frame:hover .section__img { transform: scale(1.0); }
        .section__img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(194,24,91,0.15) 0%, transparent 50%); }

        .section__badge {
          position: absolute; bottom: -16px; right: 24px;
          width: 52px; height: 52px; border-radius: 50%;
          background: white; box-shadow: 0 4px 20px rgba(194,24,91,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; z-index: 2;
        }
        .section--left .section__badge { right: auto; left: 24px; }

        .section__content { padding: 0 0.5rem; }
        .section__number { font-family: var(--serif); font-size: 4.5rem; font-weight: 300; color: var(--rose-light); line-height: 1; margin-bottom: -0.5rem; font-style: italic; }
        .section__title { font-family: var(--serif); font-size: clamp(1.5rem, 6vw, 2rem); font-weight: 300; color: var(--mauve); line-height: 1.2; margin-bottom: 1rem; font-style: italic; }
        .section__text { font-size: 0.9rem; line-height: 1.8; color: var(--text-soft); font-weight: 300; }
        .section__line { width: 40px; height: 1px; background: var(--rose); margin-top: 1.5rem; }
        .section--right .section__line { margin-left: auto; }

        /* SCROLL ANIMATIONS */
        .section--left  { transform: translateX(-60px); opacity: 0; transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease; }
        .section--right { transform: translateX(60px);  opacity: 0; transition: transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.9s ease; }
        .section--visible { transform: translateX(0) !important; opacity: 1 !important; }

        /* DIVIDER */
        .divider { display: flex; align-items: center; justify-content: center; padding: 1rem 2rem; gap: 1rem; position: relative; z-index: 1; }
        .divider__line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, var(--rose-light), transparent); }
        .divider__icon { color: var(--rose); font-size: 1rem; }

        /* FINAL */
        .final {
          min-height: 90svh; display: flex; align-items: center; justify-content: center;
          padding: 4rem 1.5rem; position: relative; z-index: 1;
          background: linear-gradient(160deg, #2a0a1f 0%, #4a1535 60%, #7c3b5c 100%);
          transform: translateY(80px); opacity: 0;
          transition: transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease;
        }
        .final--visible { transform: translateY(0); opacity: 1; }
        .final__petals { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .petal { position: absolute; font-size: 1.5rem; animation: fall-petal linear infinite; opacity: 0.15; }
        .petal { top: -50px; left: calc(var(--pi) * 12.5%); animation-duration: calc(5s + var(--pi) * 0.5s); animation-delay: calc(var(--pi) * 0.4s); }
        @keyframes fall-petal { 0%{transform:translateY(-50px) rotate(0deg)} 100%{transform:translateY(110vh) rotate(540deg)} }
        .final__content { text-align: center; max-width: 360px; position: relative; }
        .final__heart { font-size: 3rem; color: var(--rose); animation: heartbeat 1.2s ease-in-out infinite; display: block; margin-bottom: 1.5rem; }
        @keyframes heartbeat{0%,100%{transform:scale(1)}25%{transform:scale(1.15)}50%{transform:scale(1)}75%{transform:scale(1.1)}}
        .final__title { font-family: var(--serif); font-size: clamp(2.2rem, 9vw, 3.5rem); font-weight: 300; color: #f9d0e0; font-style: italic; line-height: 1.1; margin-bottom: 1.5rem; }
        .final__text { font-size: 0.9rem; line-height: 1.9; color: rgba(249,208,224,0.7); font-weight: 300; margin-bottom: 2rem; }
        .final__signature { font-family: var(--serif); font-size: 1.1rem; color: var(--gold); font-style: italic; }
      `}</style>

      {/* SPLASH SCREEN */}
      {!revealed && (
        <div className={`splash ${animating ? "splash--exit" : ""}`} role="dialog" aria-label="Tela de surpresa">
          <div className="splash__hearts" aria-hidden="true">♥ ♥ ♥</div>
          <h1 className="splash__title">Uma surpresa<br/>especial para você</h1>
          <p className="splash__sub">uma mensagem com amor</p>
          <button className="splash__btn" onClick={handleReveal} aria-label="Revelar a surpresa">
            Clique aqui, meu amor 💕
          </button>
          <div className="splash__dots" aria-hidden="true">
            <span className="splash__dot" />
            <span className="splash__dot" />
            <span className="splash__dot" />
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <div className={`main ${revealed ? "main--visible" : ""}`} aria-hidden={!revealed}>
        <FloatingHearts />

        {/* HERO */}
        <header className="hero">
          <span className="hero__decor" aria-hidden="true">✿</span>
          <p className="hero__label">uma história nossa</p>
          <h1 className="hero__title">Nossa<br/>história</h1>
          <p className="hero__subtitle">
            Cada momento com você é um capítulo que eu nunca quero terminar de ler.
          </p>
          <div className="hero__scroll" aria-label="Role para ver mais">
            <div className="hero__scroll-arrow" aria-hidden="true" />
            <span>Role para baixo</span>
          </div>
        </header>

        {/* SECTIONS */}
        {SECTIONS.map((sec, i) => (
          <>
            <Section key={i} data={sec} index={i} />
            {i < SECTIONS.length - 1 && (
              <div className="divider" aria-hidden="true">
                <div className="divider__line" />
                <span className="divider__icon">♥</span>
                <div className="divider__line" />
              </div>
            )}
          </>
        ))}

        {/* FINAL MESSAGE */}
        <FinalMessage />
      </div>
    </>
  );
}
