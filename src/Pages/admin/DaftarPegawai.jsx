import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaPencilAlt, FaTrash, FaPlus, FaIdCard, FaCamera } from 'react-icons/fa';
import axios from 'axios';
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
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // State untuk modal upload

  const [editFormData, setEditFormData] = useState({});
  const [addFormData, setAddFormData] = useState({ name: '', nip: '', jabatan: '', golongan: '' });

  // State untuk upload foto
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);


  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3001/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getProfileImageUrl = (employee) => {
    if (!employee || !employee.profilePictureUrl) return '/assets/profile-pic.jpg';
    const baseUrl = employee.profilePictureUrl.startsWith('/public')
      ? `http://localhost:3001${employee.profilePictureUrl}`
      : employee.profilePictureUrl;
    return `${baseUrl}?t=${new Date().getTime()}`;
  };

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

  const handleOpenUploadModal = (employee) => {
    setSelectedEmployee(employee);
    setIsUploadModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsAddModalOpen(false);
    setIsUploadModalOpen(false);
    setSelectedEmployee(null);
    setSelectedFile(null);
    setPreview(null);
  };

  const handleDeleteEmployee = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/employees/${selectedEmployee.id}`);
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
      await axios.put(`http://localhost:3001/api/employees/${selectedEmployee.id}`, editFormData);
      alert(`Data pegawai "${editFormData.name}" berhasil diperbarui.`);
      await fetchEmployees();
      handleCloseModals();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleSaveAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/employees', addFormData);
      alert(`Pegawai baru "${addFormData.name}" berhasil ditambahkan.`);
      await fetchEmployees();
      handleCloseModals();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleAddFormChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      alert('Pilih file gambar terlebih dahulu.');
      return;
    }
    const uploadData = new FormData();
    uploadData.append('profilePicture', selectedFile);

    try {
      await axios.post(
        `http://localhost:3001/api/employees/${selectedEmployee.id}/upload-profile-picture`,
        uploadData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      alert('Foto profil berhasil diperbarui.');
      await fetchEmployees();
      handleCloseModals();
    } catch (error) {
      console.error('Gagal mengunggah foto:', error);
      alert('Terjadi kesalahan saat mengunggah foto.');
    }
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
              <img src={getProfileImageUrl(employee)} alt={employee.name} className="pegawai-foto-card" />
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
              <button className="action-btn edit" title="Edit Data Pokok" onClick={() => handleOpenEditModal(employee)}><FaPencilAlt /> Edit</button>
              <button className="action-btn upload" title="Ubah Foto Profil" onClick={() => handleOpenUploadModal(employee)}><FaCamera /> Foto</button>
              <button className="action-btn delete" title="Hapus Pegawai" onClick={() => handleOpenDeleteModal(employee)}><FaTrash /> Hapus</button>
            </div>
          </div>
        ))}
      </div>

      <div className="table-footer">
        <span>Showing 1 to {employees.length} of {employees.length} entries</span>
        <div className="pagination"><button>Previous</button><button className="active">1</button><button>Next</button></div>
      </div>

      {/* ... Modal Tambah dan Edit (tidak berubah) ... */}
       <Modal isOpen={isAddModalOpen} onClose={handleCloseModals} title="Tambah Pegawai Baru">
        <form onSubmit={handleSaveAdd}>
          <div className="modal-form-group"><label htmlFor="add-name">Nama Lengkap</label><input type="text" id="add-name" name="name" value={addFormData.name} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-nip">NIP</label><input type="text" id="add-nip" name="nip" value={addFormData.nip} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-jabatan">Jabatan</label><input type="text" id="add-jabatan" name="jabatan" value={addFormData.jabatan} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-group"><label htmlFor="add-golongan">Golongan</label><input type="text" id="add-golongan" name="golongan" value={addFormData.golongan} onChange={handleAddFormChange} required /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button><button type="submit" className="btn btn-primary">Simpan</button></div>
        </form>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseModals} title={`Edit Data: ${selectedEmployee?.name}`}>
        <form onSubmit={handleSaveEdit}>
          <div className="modal-form-group"><label htmlFor="nip">NIP</label><input type="text" id="nip" name="nip" value={editFormData.nip || ''} onChange={handleEditFormChange} /></div>
          <div className="modal-form-group"><label htmlFor="password">Password</label><input type="text" id="password" name="password" value={editFormData.password || ''} onChange={handleEditFormChange} /></div>
          <div className="modal-form-actions"><button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button><button type="submit" className="btn btn-primary">Simpan Perubahan</button></div>
        </form>
      </Modal>

      {/* Modal Upload Foto */}
      <Modal isOpen={isUploadModalOpen} onClose={handleCloseModals} title={`Ubah Foto Profil: ${selectedEmployee?.name}`}>
        <div className="modal-form-group">
          <label>Pratinjau Foto</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection: 'column' }}>
            <img
              src={preview || getProfileImageUrl(selectedEmployee)}
              alt="Preview"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ddd' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => fileInputRef.current.click()}
            >
              Pilih Foto Baru
            </button>
          </div>
        </div>
        <div className="modal-form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button>
          <button type="button" className="btn btn-primary" onClick={handleUploadPhoto} disabled={!selectedFile}>
            Simpan Foto
          </button>
        </div>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseModals} title="Konfirmasi Hapus">
        <div>
          <p>Apakah Anda yakin ingin menghapus data pegawai: <strong>{selectedEmployee?.name}</strong>?</p>
          <div className="modal-form-actions">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModals}>Batal</button>
            <button className="btn btn-danger" onClick={handleDeleteEmployee}>Hapus</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DaftarPegawai;