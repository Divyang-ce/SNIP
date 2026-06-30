import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/auth' });
  };

  return (
    <nav className="bg-paper/90 backdrop-blur-sm border-b border-mist sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display text-xl font-bold text-ink">snip</span>
            <span className="font-mono text-accent text-lg leading-none transition-transform duration-200 group-hover:translate-x-0.5">&raquo;&raquo;</span>
          </Link>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="hidden sm:block text-sm text-ink-soft">
                  <span className="text-ink-soft/70">in as</span>{' '}
                  <span className="font-medium text-ink">{user?.name || user?.email || 'User'}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-ink-soft hover:text-ink border border-mist hover:border-ink/30 px-4 py-1.5 rounded-full transition-colors"
                >
                  Log out
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-ink hover:bg-accent text-paper px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
