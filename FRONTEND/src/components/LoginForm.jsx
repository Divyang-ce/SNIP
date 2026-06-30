import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate({ to: "/dashboard" })
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm mx-auto animate-rise">
            <div className="text-center mb-7">
                <h2 className="font-display text-2xl font-bold text-ink">Welcome back</h2>
                <p className="text-sm text-ink-soft mt-1">Log in to manage your links</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow-[0_2px_24px_-4px_rgba(20,21,26,0.08)] border border-mist rounded-2xl px-7 py-7 space-y-4">
                {error && (
                    <div className="p-3 text-sm bg-accent/10 border border-accent/30 text-accent-dark rounded-md">
                        {error}
                    </div>
                )}

                <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-ink-soft mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-2.5 text-sm border border-mist rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-ink-soft mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-2.5 text-sm border border-mist rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-colors"
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    className="w-full bg-ink hover:bg-accent text-white font-display font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Signing in…' : 'Sign in'}
                </button>

                <p className="text-center text-sm text-ink-soft pt-1">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => state(false)} className="text-link font-medium hover:underline">
                        Create one
                    </button>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
