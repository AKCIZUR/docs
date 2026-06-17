import Link from 'next/link';

const features = [
  {
    title: 'Rychlost',
    description: 'Serverové komponenty a chytré cachování pro okamžitou odezvu.',
  },
  {
    title: 'Bezpečí',
    description: 'Ověřování pomocí magických odkazů a OAuth ihned k dispozici.',
  },
  {
    title: 'Minimalismus',
    description: 'Čisté, profesionální UI postavené na Tailwind CSS.',
  },
  {
    title: 'Databáze',
    description: 'Prisma + PostgreSQL – připraveno pro produkci.',
  },
  {
    title: 'API',
    description: 'Route handlery a middleware pro backend bez starostí.',
  },
  {
    title: 'Responzivita',
    description: 'Dokonalý vzhled na mobilu, tabletu i desktopu.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24 md:py-36">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Minimalistický vývoj
            <br />
            <span className="text-white/70">s Next.js</span>
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Produkčně připravený starter s autentizací, databází a čistým UI.
            Uveďte svůj nápad do života během hodin, ne týdnů.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors"
            >
              Začít
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              Dokumentace
            </Link>
          </div>
        </div>

        {/* Terminálová ukázka */}
        <div className="mt-20 w-full max-w-3xl">
          <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
            </div>
            <pre className="p-6 text-left text-sm md:text-base font-mono text-white/80 overflow-x-auto">
              <code>
                <span className="text-white/50">$</span> npx create-next-app@latest my-app{'\n'}
                <span className="text-white/50">$</span> cd my-app{'\n'}
                <span className="text-white/50">$</span> npm run dev{'\n'}
                <span className="text-white/40">▲ Next.js 14.2.3</span>{'\n'}
                <span className="text-white/40">- Local: http://localhost:3000</span>{'\n'}
                <span className="text-white/40">- Network: http://192.168.1.5:3000</span>
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Vše, co potřebujete
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Předkonfigurované nástroje, které urychlí váš vývojový proces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Připraveni začít?
          </h2>
          <p className="text-lg text-white/50 mb-10">
            Stovky vývojářů už s tímto stackem pracují. Přidejte se k nim.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors"
          >
            Vyzkoušet zdarma
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-white/40">
          <p>© 2026 Vaše Společnost. Všechna práva vyhrazena.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">
              Ochrana soukromí
            </Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">
              Podmínky
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
