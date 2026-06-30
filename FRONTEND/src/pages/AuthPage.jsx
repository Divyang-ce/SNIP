import React, { useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

const AuthPage = () => {

    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12">
            {isLogin ? <LoginForm state={setIsLogin} /> : <RegisterForm state={setIsLogin} />}
        </div>
    )
}

export default AuthPage
