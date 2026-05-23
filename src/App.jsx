import { useState, useEffect, useRef } from "react";
import "./App.css"; // <-- Importação do novo CSS isolado

// 1. Importando as imagens locais da pasta assets
import foto1 from "./assets/foto1.jpeg";
import foto2 from "./assets/foto2.jpeg";
import foto3 from "./assets/foto3.jpeg";
import foto4 from "./assets/foto4.jpeg";
import foto5 from "./assets/foto5.jpeg";
import foto6 from "./assets/foto6.jpeg";

const SECTIONS = [
  {
    img: foto1,
    title: "Desde o primeiro dia...",
    text: "Tudo começou com uma mensagem aleátoria, coisa de destino, algo que nunca vou conseguir explicar. Você simplesmente entrou na minha vida e ficou.",
    emoji: "🌸",
    align: "right",
  },
  {
    img: foto2,
    title: "Cada momento importa",
    text: "As risadas à toa, os abraços que não queriam acabar, os dias que pareciam perfeitos só porque você estava do meu lado.",
    emoji: "💫",
    align: "left",
  },
  {
    img: foto3,
    title: "Com você, tudo fica mais bonito",
    text: "Você transforma o ordinário em extraordinário. Uma caminhada qualquer vira memória. Uma noite simples vira o melhor dia.",
    emoji: "🌙",
    align: "right",
  },
  {
    img: foto4,
    title: "Minha pessoa favorita",
    text: "De todas as pessoas nesse mundo, você é a que eu escolho todos os dias. Com quem eu quero dividir cada capítulo. A mais perfeita de todas.",
    emoji: "❤️",
    align: "left",
  },
  {
    img: foto5,
    title: "Nossos momentos",
    text: "Cada foto é uma história, cada memória é um tesouro. E o melhor ainda está por vir — porque com você, quero tudo.",
    emoji: "📷",
    align: "right",
  },
  {
    img: foto6,
    title: "Para sempre ao seu lado",
    text: "Obrigado por ser quem você é. Por me fazer sorrir, por me entender, por estar aqui, por tudo. Eu te amo — mais do que consigo dizer.",
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
        <h2 className="final__title">Te amo, Camyla</h2>
        <p className="final__text">
          Essa página é só um pedacinho do quanto você significa pra mim.
          Mas saiba que todos os dias, em cada pequena coisa, estou pensando em você. 💕
        </p>
        <div className="final__signature">— Com todo o meu amor Paulo Henrique seu homem🌹</div>
        <p className="final__p">
          PS: Estou com saudedas, e muita, vai doer passar esse final de semana longe de você. Te amo gatinha <span>💖</span>
        </p>
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
          <h1 className="hero__title">Para<br/>Sempre<br/>Juntos</h1>
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
          <div key={`wrap-${i}`}>
            <Section data={sec} index={i} />
            {i < SECTIONS.length - 1 && (
              <div className="divider" aria-hidden="true">
                <div className="divider__line" />
                <span className="divider__icon">♥</span>
                <div className="divider__line" />
              </div>
            )}
          </div>
        ))}

        {/* FINAL MESSAGE */}
        <FinalMessage />
      </div>
    </>
  );
}