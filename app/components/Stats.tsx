'use client';

import { useEffect, useState } from 'react';
import { FaUsers, FaFemale, FaMale } from 'react-icons/fa';

interface UserStats {
  totalUsers: number;
  femaleUsers: number;
  maleUsers: number;
}

export default function Stats() {
  const [stats, setStats] = useState<UserStats>({
    totalUsers: 0,
    femaleUsers: 0,
    maleUsers: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-gradient-to-br from-[var(--light-blue)] to-white p-4 sm:p-8 mb-8 sm:mb-12">
      <h2 className="section-title text-center text-2xl sm:text-3xl mb-6">
        Statistiques des Utilisateurs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="stats-card group">
          <div className="flex flex-col items-center">
            <div className="feature-icon mb-4 bg-[var(--primary-blue)] text-white">
              <FaUsers className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--primary-blue)] mb-2">
              Total Utilisateurs
            </h3>
            <p className="text-3xl sm:text-4xl font-bold text-[var(--primary-blue)]">
              {stats.totalUsers}
            </p>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex flex-col items-center">
            <div className="feature-icon mb-4 bg-[var(--secondary-blue)] text-white">
              <FaFemale className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--secondary-blue)] mb-2">
              Utilisatrices
            </h3>
            <p className="text-3xl sm:text-4xl font-bold text-[var(--secondary-blue)]">
              {stats.femaleUsers}
            </p>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex flex-col items-center">
            <div className="feature-icon mb-4 bg-[var(--accent-blue)] text-white">
              <FaMale className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-[var(--accent-blue)] mb-2">
              Utilisateurs
            </h3>
            <p className="text-3xl sm:text-4xl font-bold text-[var(--accent-blue)]">
              {stats.maleUsers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 