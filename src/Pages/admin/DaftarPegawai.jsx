import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPencilAlt, FaTrash, FaPlus, FaIdCard } from 'react-icons/fa';
import Modal from '../../components/Modal';
import './DaftarPegawai.css';

const DaftarPegawai = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({ name: '', nip: '', jabatan: '', golongan: '' });

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3001/api/employees');
      if (!response.ok) {
        throw new Error('Gagal mengambil data dari server');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleOpenDetail = (employeeId) => {
    navigate(`/admin/pegawai/detail/${employeeId}`);
  };

  const handleOpenEditModal = (employee) => {
    setSelectedEmployee(employee);
    setEditFormData(employee);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setIsDeleteModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setAddFormData({ name: '', nip: '', jabatan: '', golongan: '' });
    setIsAddModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${selectedEmployee.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Gagal menghapus pegawai.');
      }
      alert(`Data pegawai "${selectedEmployee.name}" berhasil dihapus.`);
      setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
      handleCloseModals();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData),
      });
      if (!response.ok) {
        throw new Error('Gagal memperbarui data.');
      }
      alert(`Data pegawai "${editFormData.name}" berhasil diperbarui.`);
      await fetchEmployees(); // Muat ulang data
      handleCloseModals();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addFormData),
      });
      if (!response.ok) {
        throw new Error('Gagal menambah pegawai baru.');
      }
      const newEmployee = await response.json();
      alert(`Pegawai baru "${newEmployee.name}" berhasil ditambahkan.`);
      await fetchEmployees(); // Muat ulang data
      handleCloseModals();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };
  
  if (isLoading) return <div className="riwayat-container">Memuat data pegawai...</div>;
  if (error) return <div className="riwayat-container">Error: {error}</div>;

  return (
    <div className="riwayat-container">
      <div className="riwayat-header">
        <div><h3>Manajemen Daftar Pegawai</h3><p className="subtitle">Kelola data master semua pegawai.</p></div>
        <button className="btn-tambah-pegawai" title="Tambah Pegawai Baru" onClick={handleOpenAddModal}>
          <FaPlus style={{ marginRight: '8px' }} />Tambah Pegawai
        </button>
      </div>
      
      <div className="table-controls">
        <div className="show-entries"><label htmlFor="entries">Show</label><select name="entries" id="entries"><option value="10">10</option></select><span>entries</span></div>
        <div className="search-box"><label htmlFor="search">Search:</label><input type="search" id="search" /></div>
      </div>
      <div className="pegawai-card-grid">
        {employees.map((employee) => (
          <div key={employee.id} className="pegawai-item-card profile-content-card">
            <div className="pegawai-card-header">
              <img src={employee.profilePictureUrl || '/assets/profile-pic.jpg'} alt={employee.name} className="pegawai-foto-card" />
              <div className="pegawai-details">
                <h4 className="employee-name">{employee.name}</h4>
                <p className="pegawai-nip-card"><FaIdCard className="icon-detail" /> {employee.nip && (employee.nip.includes('/') ? employee.nip.split(' / ')[1] : employee.nip)}</p>
              </div>
            </div>
            <div className="pegawai-card-body">
              <div className="detail-item"><span className="detail-label">NIP:</span><span className="detail-value">{employee.nip && (employee.nip.includes('/') ? employee.nip.split(' / ')[1] : employee.nip)}</span></div>
              <div className="detail-item"><span className="detail-label">Password:</span><span className="detail-value">{employee.password}</span></div>
            </div>
            <div className="card-action-buttons">
              <button className="action-btn view" title="Lihat Detail Profil" onClick={() => handleOpenDetail(employee.id)}><FaEye /> Detail</button>
              <button className="action-btn edit" title="Edit Pegawai" onClick={() => handleOpenEditModal(employee)}><FaPencilAlt /> Edit</button>
              <button className="action-btn delete" title="Hapus Pegawai" onClick={() => handleOpenDeleteModal(employee)}><FaTrash /> Hapus</button>
            </div>
          </div>
        ))}
      </div>
      <div className="table-footer">
        <span>Showing 1 to {employees.length} of {employees.length} entries</span>
        <div className="pagination"><button>Previous</button><button className="active">1</button><button>Next</button></div>
      </div>

      {/* Modal Tambah Pegawai */}
      <Modal isOpen={isAddModalOpen} onClose={handleCloseModals} title="Tambah Pegawai Baru">
        <form onSubmit={handleSaveAdd}>
          <div className="modal-form-group"><label htmlFor="add-name">Nama Lengkap</label><input type="text" id="add-name" name="name" value={addFormData.name} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-nip">NIP</label><input type="text" id="add-nip" name="nip" value={addFormData.nip} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-jabatan">Jabatan</label><input type="text" id="add-jabatan" name="jabatan" value={addFormData.jabatan} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-golongan">Golongan</label><input type="text" id="add-golongan" name="golongan" value={addFormData.golongan} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      </Modal>

      {/* Modal Edit Pegawai */}
      <Modal isOpen={isEditModalOpen} onClose={handleCloseModals} title={`Edit Data: ${selectedEmployee?.name}`}>
        <form onSubmit={handleSaveEdit}>
          <div className="modal-form-group"><label htmlFor="nip">NIP</label><input type="text" id="nip" name="nip" value={editFormData.nip || ''} onChange={handleEditFormChange} /></div>
          <div className="modal-form-group"><label htmlFor="password">Password</label><input type="text" id="password" name="password" value={editFormData.password || ''} onChange={handleEditFormChange} /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button><button type="submit" className="btn btn-primary">Simpan Perubahan</button></div>
        </form>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModals} title="Konfirmasi Hapus">
        <div className="delete-confirmation">
          <p>Apakah Anda yakin ingin menghapus data pegawai: <strong>{selectedEmployee?.name}</strong>?</p>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button><button className="btn btn-danger" onClick={handleDeleteEmployee}>Hapus</button></div>
        </div>
      </Modal>
    </div>
  );
};

export default DaftarPegawai;