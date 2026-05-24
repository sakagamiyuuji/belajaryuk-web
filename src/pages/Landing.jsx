import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bgIntro from '../assets/bg-intro.jpg';
import heroImg from '../assets/hero-img.jpg';
import '../styles/Landing.css';

const VALUES = [
  {
    num: '01',
    title: 'Ilmu yang Bermakna',
    quote:
      'Saat kau terpuruk, percayalah bahwa ilmu yang sudah dipelajari akan berarti kemudian hari.',
    bgPosition: 'center top',
  },
  {
    num: '02',
    title: 'Belajar dengan Sabar',
    quote:
      'Raihlah ilmu dan untuk meraih ilmu, belajarlah untuk tenang dan sabar.',
    bgPosition: 'center center',
  },
  {
    num: '03',
    title: 'Tidak Sendirian',
    quote:
      'Saat dirimu menghadapi perubahan, percayalah ada yang selalu membantu.',
    bgPosition: 'left bottom',
  },
];

const FEATURES = [
  { title: 'Materi Lengkap', desc: 'Kurikulum terstruktur dari dasar hingga lanjutan.' },
  { title: 'Pembelajaran Interaktif', desc: 'Belajar dengan bantuan teknologi yang menyenangkan.' },
  { title: 'Progres Terpantau', desc: 'Pantau perkembangan belajarmu secara langsung.' },
  { title: 'Pencapaian & Lencana', desc: 'Raih penghargaan saat menyelesaikan setiap materi.' },
];

export default function Landing() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setNavScrolled(window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="landing">
      <header
        className={`landing-nav${navScrolled ? ' landing-nav--scrolled' : ''}`}
      >
        <Link to="/" className="landing-nav__logo" aria-label="BelajarYuk beranda">
          BelajarYuk
        </Link>
      </header>

      <section className="landing-hero" id="beranda">
        <div className="landing-hero__bg-circle landing-hero__bg-circle--1" />
        <div className="landing-hero__bg-circle landing-hero__bg-circle--2" />

        <div className="landing-hero__inner">
          <div className="landing-hero__content">
            <span className="landing-hero__badge">Platform Belajar Digital</span>
            <h1 className="landing-hero__title">
              Selamat Datang di <span>BelajarYuk</span>
            </h1>
            <p className="landing-hero__desc">
              Pendidikan adalah paspor untuk masa depan, karena hari esok adalah
              milik mereka yang mempersiapkannya hari ini.
            </p>
            <div className="landing-hero__actions">
              <Link to="/login" className="landing-btn landing-btn--primary">
                Mulai Belajar
              </Link>
              <Link to="/register" className="landing-btn landing-btn--outline">
                Daftar Sekarang
              </Link>
            </div>
          </div>

          <div className="landing-hero__visual">
            <img
              src={heroImg}
              alt="Siswa belajar bersama di meja"
              className="landing-hero__image"
              width={640}
              height={427}
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      <section className="landing-values" id="nilai">
        <div className="landing-values__inner">
          <header className="landing-section-header">
            <h2 className="landing-section-header__title">
              Tiga prinsip yang memandu perjalanan belajarmu bersama{' '}
              <span>BelajarYuk</span>
            </h2>
          </header>

          <div className="landing-values__grid">
            {VALUES.map((item) => (
              <article key={item.num} className="landing-value-card">
                <div
                  className="landing-value-card__bg"
                  style={{
                    backgroundImage: `url(${bgIntro})`,
                    backgroundPosition: item.bgPosition,
                  }}
                  aria-hidden="true"
                />
                <div className="landing-value-card__content">
                  <span className="landing-value-card__num">{item.num}</span>
                  <h3 className="landing-value-card__title">{item.title}</h3>
                  <p className="landing-value-card__quote">&ldquo;{item.quote}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-about" id="fitur">
        <div className="landing-about__inner">
          <div className="landing-about__content" id="tentang">
            <h2>Apa yang akan kamu dapat?</h2>
            <p>
              BelajarYuk hadir sebagai teman belajarmu — platform pendidikan digital
              yang dirancang agar proses belajar terasa menyenangkan, terstruktur,
              dan penuh makna.
            </p>
            <p>
              Baik kamu sedang mempersiapkan ujian, menguasai materi baru, atau
              sekadar ingin belajar setiap hari, BelajarYuk siap menemanimu.
            </p>
          </div>

          <div className="landing-about__features">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature-item">
                <div className="landing-feature-item__text">
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-cta" id="mulai">
        <div className="landing-cta__card">
          <h2>Mulai Perjalanan Belajarmu</h2>
          <p>
            Bergabung dengan ribuan pelajar yang sudah mempercayai BelajarYuk
            sebagai teman belajar mereka setiap hari.
          </p>
          <div className="landing-cta__actions">
            <Link to="/login" className="landing-btn landing-btn--white">
              Masuk
            </Link>
            <Link to="/register" className="landing-btn landing-btn--primary">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <span className="landing-footer__logo">BelajarYuk</span>
          <p className="landing-footer__copy">
            © {new Date().getFullYear()} BelajarYuk
          </p>
        </div>
      </footer>
    </div>
  );
}
