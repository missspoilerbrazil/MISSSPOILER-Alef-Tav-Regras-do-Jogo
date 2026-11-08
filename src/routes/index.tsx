import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, type CSSProperties } from "react";

import livroMesa from "@/assets/livro-mesa.jpg";
import livroCapa from "@/assets/livro-capa.webp";
import livroMaos from "@/assets/livro-maos-lirio.jpg";

const TITLE = "MISSSPOILER · Alef Tav – Regras do Jogo";
const DESCRIPTION =
  "MISSSPOILER: o fim está antes de Gênesis. O início, após o Apocalipse. Conheça o livro Alef Tav – Regras do Jogo.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "color-scheme", content: "dark" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const d = (delay: string) => ({ "--d": delay }) as CSSProperties;

function Dust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const x = c?.getContext("2d");
    if (!c || !x) return;
    let w = 0;
    let h = 0;
    const n = 46;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const p: { x: number; y: number; r: number; s: number; t: number; k: boolean }[] = [];

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = innerWidth;
      h = innerHeight;
      c!.width = w * dpr;
      c!.height = h * dpr;
      x!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    size();
    addEventListener("resize", size);

    for (let i = 0; i < n; i++)
      p.push({
        x: Math.random(),
        y: Math.random(),
        r: 0.5 + Math.random() * 1.5,
        s: 0.00005 + Math.random() * 0.00012,
        t: Math.random() * 6.28,
        k: Math.random() < 0.35,
      });

    let last = performance.now();
    let raf = 0;
    function draw(now: number) {
      const dt = now - last;
      last = now;
      x!.clearRect(0, 0, w, h);
      for (const q of p) {
        if (!still) {
          q.y -= q.s * dt;
          q.x += Math.sin(now * 0.0003 + q.t) * 0.00006 * dt;
          if (q.y < -0.02) {
            q.y = 1.02;
            q.x = Math.random();
          }
        }
        const a = 0.18 + 0.42 * (0.5 + 0.5 * Math.sin(q.t + now * 0.0011));
        x!.beginPath();
        x!.arc(q.x * w, q.y * h, q.r, 0, 6.283);
        x!.fillStyle = (q.k ? "rgba(198,161,91," : "rgba(232,220,194,") + a + ")";
        x!.shadowColor = "rgba(198,161,91,.8)";
        x!.shadowBlur = 8;
        x!.fill();
      }
      if (!still) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, []);

  return <canvas id="dust" ref={ref} />;
}

function Index() {
  return (
    <>
      <div className="ether" aria-hidden="true">
        <i className="veil v1" />
        <i className="veil v2" />
        <i className="veil v3" />
        <i className="beam" />
        <Dust />
      </div>
      <main>
        <header>
          <div className="hero">
            <img
              src={livroMesa}
              alt="O livro Alef Tav – Regras do Jogo sobre uma mesa de madeira, com lírios, óculos e uma xícara de café, sob um facho de luz"
            />
          </div>
          <div className="brand rise" style={d(".1s")}>
            <h1>
              MISS<span>SPOILER</span>
            </h1>
            <p className="tag">
              O fim está antes de Gênesis. <em>O início, após o Apocalipse.</em>
            </p>
          </div>
          <div className="rule" />
          <p className="intro rise" style={d(".25s")}>
            Uma jornada fascinante pelos mistérios da Bíblia.{" "}
            <em>Conhecimento que inspira. Uma fé ainda mais forte.</em>
          </p>
        </header>

        <nav className="links" aria-label="Links">
          <section className="card book rise" style={d(".35s")}>
            <img
              src={livroCapa}
              alt="Livro Alef Tav – Regras do Jogo, capa preta com uma coroa dourada em chamas"
            />
            <div>
              <p className="small">Conheça o livro</p>
              <h2>Alef Tav</h2>
              <p className="sub">Regras do Jogo</p>
              <p className="small">Onde comprar</p>
              <div className="pills">
                <a
                  className="pill"
                  href="https://clubedeautores.com.br/livro/alef-tav-2"
                  target="_blank"
                  rel="noopener"
                >
                  Clube de Autores <i>→</i>
                </a>
                <a
                  className="pill"
                  href="https://www.amazon.com.br/dp/B0HLXVBY9Q"
                  target="_blank"
                  rel="noopener"
                >
                  Amazon <i>→</i>
                </a>
                <a
                  className="pill"
                  href="https://loja.uiclap.com/titulo/ua208753"
                  target="_blank"
                  rel="noopener"
                >
                  UICLAP <i>→</i>
                </a>
              </div>
            </div>
          </section>
          <a
            className="btn yt rise"
            style={d(".45s")}
            href="https://www.youtube.com/@missspoilerbrasil"
            target="_blank"
            rel="noopener"
          >
            <div className="txt">
              <p className="small">YouTube</p>
              <b>Explore as reflexões</b>
              <em>e as playlists de oração</em>
            </div>
          </a>
          <a
            className="btn rise"
            style={d(".55s")}
            href="https://www.instagram.com/missspoilerbrasil/"
            target="_blank"
            rel="noopener"
          >
            <p className="small">Acompanhe no Instagram</p>
            <b>@missspoilerbrasil</b>
            <span className="arrow">→</span>
          </a>
          <a className="btn mail rise" style={d(".65s")} href="mailto:missspoilerbrazil@gmail.com">
            <p className="small">Contato</p>
            <b>missspoilerbrazil@gmail.com</b>
            <span className="arrow">→</span>
          </a>
        </nav>

        <section className="sign">
          <img
            src={livroMaos}
            alt="Mãos segurando o livro aberto, com um lírio branco e flores delicadas saindo das páginas"
          />
          <blockquote>
            O fim está antes de Gênesis. <em>O início, após o Apocalipse.</em>
          </blockquote>
          <p className="en">The end is before Genesis. The beginning, after Revelation.</p>
        </section>
        <footer>© MISSSPOILER</footer>
      </main>
    </>
  );
}
