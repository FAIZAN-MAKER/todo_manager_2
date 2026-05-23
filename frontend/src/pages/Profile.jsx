import { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import ConfirmModal from '../components/ConfirmModal';
import './Profile.css';

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [fullname, setFullname] = useState(user?.fullname || '');
  const [pfp, setPfp] = useState(null);
  const [pfpPreview, setPfpPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPw, setChangingPw] = useState(false);
  const [pwMsg, setPwMsg] = useState('');

  const [showDelConfirm, setShowDelConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handlePfpChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPfp(file);
    setPfpPreview(URL.createObjectURL(file));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaveMsg('');
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('fullname', fullname);
      if (pfp) fd.append('pfp', pfp);

      const res = await api.patch('auth/me/', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      updateUser(res.data);
      setPfp(null);
      setPfpPreview(null);
      setSaveMsg('Profile updated successfully.');
    } catch (err) {
      const data = err?.response?.data;
      const msg = data ? Object.values(data).flat().join(' ') : 'Failed to update profile.';
      setSaveMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwMsg('');
    if (newPassword !== confirmPassword) {
      setPwMsg('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setPwMsg('Password must be at least 6 characters.');
      return;
    }
    setChangingPw(true);
    try {
      await api.post('auth/change-password/', {
        old_password: oldPassword,
        new_password: newPassword,
      });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPwMsg('Password changed successfully.');
    } catch (err) {
      const data = err?.response?.data;
      const msg = data ? Object.values(data).flat().join(' ') : 'Failed to change password.';
      setPwMsg(msg);
    } finally {
      setChangingPw(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    try {
      await api.delete('auth/me/');
      logout();
      navigate('/');
    } catch {
      setDeleting(false);
      setShowDelConfirm(false);
    }
  };

  const avatarUrl = pfpPreview || user?.pfp || null;
  const initials = (user?.fullname || user?.email || '?').charAt(0).toUpperCase();

  return (
    <div className="profile-page page-enter">
      <div className="profile-inner">
        <div className="profile-header">
          <h1>Profile</h1>
          <p>Manage your account settings</p>
        </div>

        <form className="card profile-card" onSubmit={handleSaveProfile}>
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrap" onClick={() => fileRef.current?.click()}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="profile-avatar" />
              ) : (
                <div className="profile-avatar-placeholder">{initials}</div>
              )}
              <div className="profile-avatar-overlay">Change photo</div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handlePfpChange}
              hidden
            />
          </div>

          <div className="profile-fields">
            <div className="input-group">
              <label htmlFor="pf-fullname">Full name</label>
              <input
                id="pf-fullname"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="pf-email">Email</label>
              <input
                id="pf-email"
                type="email"
                value={user?.email || ''}
                disabled
              />
            </div>
          </div>

          {saveMsg && (
            <div className={`profile-msg ${saveMsg.includes('successfully') ? 'success' : 'error'}`}>
              {saveMsg}
            </div>
          )}

          <div className="profile-actions">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? <span className="spinner" /> : 'Save changes'}
            </button>
          </div>
        </form>

        <div className="card profile-card">
          <h3>Change password</h3>
          <form className="profile-pw-form" onSubmit={handleChangePassword}>
            <div className="input-group">
              <label htmlFor="pf-oldpw">Current password</label>
              <input
                id="pf-oldpw"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password"
              />
            </div>
            <div className="input-group">
              <label htmlFor="pf-newpw">New password</label>
              <input
                id="pf-newpw"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
            </div>
            <div className="input-group">
              <label htmlFor="pf-confpw">Confirm new password</label>
              <input
                id="pf-confpw"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
              />
            </div>

            {pwMsg && (
              <div className={`profile-msg ${pwMsg.includes('successfully') ? 'success' : 'error'}`}>
                {pwMsg}
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={changingPw}>
              {changingPw ? <span className="spinner" /> : 'Update password'}
            </button>
          </form>
        </div>

        <div className="card profile-card profile-danger">
          <h3>Danger zone</h3>
          <p>Once you delete your account, there is no going back.</p>
          <button className="btn btn-danger" onClick={() => setShowDelConfirm(true)}>
            Delete account
          </button>
        </div>

        <ConfirmModal
          open={showDelConfirm}
          title="Delete account"
          message="Are you sure you want to delete your account? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowDelConfirm(false)}
          loading={deleting}
        />
      </div>
    </div>
  );
}
