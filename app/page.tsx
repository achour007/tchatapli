import Footer from './components/Footer';
import Stats from './components/Stats';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="hero-gradient py-12 sm:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[var(--primary-blue)] mb-4 sm:mb-6">
              Bienvenue sur notre Plateforme de Chat
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 sm:mb-12">
              Rejoignez notre communauté et discutez en temps réel avec des personnes du monde entier.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-8 sm:py-16 bg-[var(--orange-light)]">
          <div className="container mx-auto px-4">
            <Stats />
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-[var(--orange-medium)] py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <h2 className="section-title text-center text-2xl sm:text-3xl">Nos Fonctionnalités</h2>
            <p className="section-subtitle text-center text-base sm:text-xl">
              Découvrez ce qui fait de notre plateforme un choix unique
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              <div className="card group">
                <div className="feature-icon">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-blue)] mb-3 sm:mb-4">Chat en temps réel</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                  Discutez instantanément avec d'autres utilisateurs dans un environnement sécurisé.
                </p>
              </div>

              <div className="card group">
                <div className="feature-icon">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-blue)] mb-3 sm:mb-4">Groupes thématiques</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                  Rejoignez des groupes selon vos centres d'intérêt et rencontrez des personnes partageant les mêmes passions.
                </p>
              </div>

              <div className="card group">
                <div className="feature-icon">
                  <svg className="h-6 w-6 sm:h-8 sm:w-8 text-[var(--primary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-blue)] mb-3 sm:mb-4">Sécurité garantie</h3>
                <p className="text-sm sm:text-base text-[var(--text-secondary)]">
                  Votre confidentialité est notre priorité. Toutes les conversations sont cryptées.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 