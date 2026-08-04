import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth();
  const location = useLocation();

  const linkClass = (path) => `sidebar-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <div className="p-3 text-center border-bottom border-secondary">
        <h4 className="text-light mb-0">Workflow OS</h4>
        <small className="text-muted">{user?.role?.toUpperCase()}</small>
      </div>
      <nav className="mt-3">
        <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
        
        {user?.role === 'employee' && (
          <>
            <Link to="/submit-request" className={linkClass('/submit-request')}>Submit Request</Link>
            <Link to="/my-requests" className={linkClass('/my-requests')}>My Requests</Link>
          </>
        )}

        {user?.role === 'manager' && (
          <>
            <Link to="/pending-approvals" className={linkClass('/pending-approvals')}>Pending Approvals</Link>
            <Link to="/my-requests" className={linkClass('/my-requests')}>My Requests</Link>
          </>
        )}

        {user?.role === 'admin' && (
          <>
            <Link to="/admin/users" className={linkClass('/admin/users')}>User Management</Link>
            <Link to="/admin/departments" className={linkClass('/admin/departments')}>Departments</Link>
            <Link to="/admin/workflows" className={linkClass('/admin/workflows')}>Workflows</Link>
            <Link to="/admin/reports" className={linkClass('/admin/reports')}>Reports</Link>
          </>
        )}
        
        <Link to="/profile" className={linkClass('/profile')}>Profile</Link>
        <Link to="/settings" className={linkClass('/settings')}>Settings</Link>
      </nav>
    </div>
  );
};

export default Sidebar;