import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  FaUsers, FaUserTie, FaUserClock, FaFileSignature,
  FaUserTag, FaClinicMedical, FaHandshake
} from 'react-icons/fa';
import './AdminDashboard.css'; // Pastikan file CSS ini diimpor

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const [stats, setStats] = useState({
    totalPegawai: 0,
    PNS: 0,
    CPNS: 0,
    PPPK: 0,
    PTT: 0,
    BLUD: 0,
    PKS: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        if (!response.ok) {
          throw new Error('Gagal mengambil data pegawai');
        }
        const allEmployees = await response.json();
        
        const statusCounts = { PNS: 0, CPNS: 0, PPPK: 0, PTT: 0, BLUD: 0, PKS: 0 };

        allEmployees.forEach(employee => {
          if (employee.riwayat && employee.riwayat.statusKepegawaian && employee.riwayat.statusKepegawaian.length > 0) {
            const latestStatus = employee.riwayat.statusKepegawaian[0].status;
            if (statusCounts.hasOwnProperty(latestStatus)) {
              statusCounts[latestStatus]++;
            }
          }
        });

        setStats({
          totalPegawai: allEmployees.length,
          ...statusCounts
        });

      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployeeStats();
  }, []);

  if (!user) {
    return <main className="main-content">Memuat data...</main>;
  }

  return (
    <div className="riwayat-container">
      {/* MODIFIKASI DIMULAI DI SINI: Menggunakan struktur header yang sama */}
      <div className="riwayat-header">
        <div>
          <h3>Dashboard Administrator</h3>
          <p className="subtitle">Selamat datang kembali, {user.name}. Berikut adalah ringkasan data kepegawaian.</p>
        </div>
      </div>
      {/* MODIFIKASI SELESAI */}

      <div className="stats-grid">
        {/* Total Pegawai */}
        <div className="stat-card blue">
          <div className="stat-icon"><FaUsers /></div>
          <div className="stat-info">
            <p>Total Pegawai</p>
            <h3>{isLoading ? '...' : stats.totalPegawai}</h3>
          </div>
        </div>
        {/* PNS */}
        <div className="stat-card green">
          <div className="stat-icon"><FaUserTie /></div>
          <div className="stat-info">
            <p>PNS</p>
            <h3>{isLoading ? '...' : stats.PNS}</h3>
          </div>
        </div>
        {/* CPNS */}
        <div className="stat-card orange">
          <div className="stat-icon"><FaUserClock /></div>
          <div className="stat-info">
            <p>CPNS</p>
            <h3>{isLoading ? '...' : stats.CPNS}</h3>
          </div>
        </div>
        {/* PPPK */}
        <div className="stat-card purple">
          <div className="stat-icon"><FaFileSignature /></div>
          <div className="stat-info">
            <p>PPPK</p>
            <h3>{isLoading ? '...' : stats.PPPK}</h3>
          </div>
        </div>
        {/* PTT */}
        <div className="stat-card red">
          <div className="stat-icon"><FaUserTag /></div>
          <div className="stat-info">
            <p>PTT</p>
            <h3>{isLoading ? '...' : stats.PTT}</h3>
          </div>
        </div>
        {/* BLUD */}
        <div className="stat-card teal">
          <div className="stat-icon"><FaClinicMedical /></div>
          <div className="stat-info">
            <p>BLUD</p>
            <h3>{isLoading ? '...' : stats.BLUD}</h3>
          </div>
        </div>
        {/* PKS */}
        <div className="stat-card indigo">
          <div className="stat-icon"><FaHandshake /></div>
          <div className="stat-info">
            <p>PKS</p>
            <h3>{isLoading ? '...' : stats.PKS}</h3>
          </div>
        </div>
      </div>

      <div className="additional-info-card">
        <h4>Aktivitas Sistem</h4>
        <p>Gunakan menu navigasi di samping untuk mengelola data master pegawai, melihat detail riwayat, dan melakukan manajemen data lainnya.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;