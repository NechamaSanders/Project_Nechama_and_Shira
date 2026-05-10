import { useContext, useState } from "react";
import { appContext } from "../app";
import { fetchData } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Info() {
  const { user, setUser } = useContext(appContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState('');
  const [editError, setEditError] = useState('');

  if (!user) return <p>Please log in to see details</p>;

  const handleEdit = () => {
    setEditData({ firstName: user.firstName, lastName: user.lastName, username: user.username, email: user.email, phone: user.phone, city: user.city, street: user.street, zipcode: user.zipcode });
    setEditError('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setEditError('');
      await fetchData(`/login/profile/${user.id}`, { method: 'PUT', body: JSON.stringify(editData) });
      const updated = { ...user, ...editData };
      setUser(updated);
      localStorage.setItem('current-user', JSON.stringify(updated));
      setIsEditing(false);
      navigate(`/users/${editData.username}/info`);
    } catch (err) {
      setEditError(err.message);
    }
  };

  const handleChangePassword = async () => {
    try {
      setPasswordMsg('');
      await fetchData(`/login/password/${user.id}`, { method: 'PUT', body: JSON.stringify(passwordData) });
      setPasswordMsg('Password updated successfully!');
      setPasswordData({ currentPassword: '', newPassword: '' });
      setTimeout(() => { setShowPasswordForm(false); setPasswordMsg(''); }, 1500);
    } catch (err) {
      setPasswordMsg(err.message);
    }
  };

  return (
    <div className="info-container">
      <div className="info-card">
        <div className="info-header">
          <div className="info-avatar">{user.firstName?.[0]}{user.lastName?.[0]}</div>
          <h2 className="info-title">My Profile</h2>
          <div className="info-avatar" style={{visibility: 'hidden'}} />
        </div>

        {isEditing ? (
          <div className="info-fields">
            {[['firstName','First Name'],['lastName','Last Name'],['username','Username'],['email','Email'],['phone','Phone'],['city','City'],['street','Street'],['zipcode','Zipcode']].map(([key, label]) => (
              <div className="info-row" key={key}>
                <span className="info-label">{label}</span>
                <input className="info-input" value={editData[key] || ''} onChange={e => setEditData({...editData, [key]: e.target.value})} />
              </div>
            ))}
            {editError && <p className="errorLog">{editError}</p>}
            <div className="info-edit-actions">
              <button className="info-save-btn" onClick={handleSave}>Save</button>
              <button className="info-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="info-fields">
            <div className="info-row"><span className="info-label">ID</span><span>{user.id}</span></div>
            <div className="info-row"><span className="info-label">Name</span><span>{user.firstName} {user.lastName}</span></div>
            <div className="info-row"><span className="info-label">Username</span><span>{user.username}</span></div>
            <div className="info-row"><span className="info-label">Email</span><span>{user.email}</span></div>
            <div className="info-row"><span className="info-label">Phone</span><span>{user.phone}</span></div>
            <div className="info-row"><span className="info-label">Address</span><span>{user.city}, {user.street}, {user.zipcode}</span></div>
            <button className="info-edit-btn" onClick={handleEdit}>Edit Profile</button>
          </div>
        )}

        <div className="info-password-section">
          <button className="info-password-toggle" onClick={() => { setShowPasswordForm(!showPasswordForm); setPasswordMsg(''); }}>
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </button>
          {showPasswordForm && (
            <div className="info-fields">
              <div className="info-row">
                <span className="info-label">Current Password</span>
                <input className="info-input" type="password" value={passwordData.currentPassword} onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})} />
              </div>
              <div className="info-row">
                <span className="info-label">New Password</span>
                <input className="info-input" type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} />
              </div>
              {passwordMsg && <p className={passwordMsg.includes('success') ? 'successMsg' : 'errorLog'}>{passwordMsg}</p>}
              <div className="info-edit-actions">
                <button className="info-save-btn" onClick={handleChangePassword}>Update Password</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}