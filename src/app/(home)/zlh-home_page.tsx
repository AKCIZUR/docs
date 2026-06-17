import Link from 'next/link';

const features = [
  {
    icon: "⚡️",
    title: "Rychlost blesku",
    description: "Optimalizovaný výkon díky serverovým komponentám a chytrému cachování.",
  },
  {
    icon: "🔐",
    title: "Bezpečná autentizace",
    description: "Připravená autentizace pomocí magických odkazů a OAuth.",
  },
  {
    icon: "🎨",
    title: "Krásné uživatelské rozhraní",
    description: "Předpřipravené komponenty s Tailwind CSS, které si můžete přizpůsobit.",
  },
  {
    icon: "📦",
    title: "Databáze v ceně",
    description: "Prisma ORM s PostgreSQL, připravené pro produkční nasazení.",
  },
  {
    icon: "🌐",
    title: "API připraveno",
    description: "Route handlery a middleware nastavené pro logiku backendu.",
  },
  {
    icon: "📱",
    title: "Responzivní design",
    description: "Skvěle vypadá na všech zařízeních, od mobilu po desktop.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero sekce */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Vyvíjejte rychleji s{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
              Next.js
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Produkčně připravená startovací šablona s autentizací, databází a
            krásnými UI komponentami. Uveďte svůj další nápad do života v řádu hodin, ne týdnů.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Začít
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center px-8 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Dokumentace
            </Link>
          </div>
        </div>
        <div className="mt-16 w-full max-w-3xl">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img
              src="/hero-image.png"
              alt="Náhled dashboardu aplikace"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Sekce funkcí */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Vše, co potřebujete
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Předkonfigurované nástroje a komponenty pro urychlení vašeho vývoje.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow duration-200 bg-gray-50 dark:bg-gray-800"
              >
                <div className="text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sekce */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Jste připraveni spustit svůj projekt?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Přidejte se k tisícům vývojářů, kteří používají naši startovací šablonu.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-blue-600 bg-white hover:bg-gray-100 shadow-md transition-all"
          >
            Vyzkoušet zdarma
          </Link>
        </div>
      </section>

      {/* Patička */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2026 Vaše Společnost. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              Ochrana soukromí
            </Link>
            <Link
              href="/terms"
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-sm"
            >
              Podmínky
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
