import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    document.body.classList.add('bg-one');
    return () => {
      document.body.classList.remove('bg-one');
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      // Sending POST request to the backend API
      const response = await fetch('http://localhost:3002/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'your_secret_key',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      // console.log(data.admin._id);
      if (response.ok) {
        localStorage.setItem('session', 'true');
        localStorage.setItem('user_type', 'admin');
        localStorage.setItem('user_email', email); // Store user email
        localStorage.setItem('user_id', data.admin._id); // Store user ID
        localStorage.setItem('auth_token', data.token); // Store JWT token

        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Error logging in:', err);
      setError('An error occurred. Please try again later.');
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <section className="auth bg-base d-flex flex-wrap">
        <div className="auth-left d-lg-block d-none">
          <div className="d-flex align-items-center flex-column h-100 justify-content-center">
            <img src={'../Update/images/auth/auth-img.png'} alt="" />
          </div>
        </div>
        <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
          <div className="max-w-464-px mx-auto w-100">
            <div>
              <a href="index.html" className="mb-40 max-w-290-px">
                <img src="assets/images/logo.png" alt="" />
              </a>
              <h4 className="mb-12">Sign In to your Account</h4>
              <p className="mb-32 text-secondary-light text-lg">
                Welcome back! Please enter your details.
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <div className="icon-field mb-16">
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <span className="icon top-50 translate-middle-y">
                  <iconify-icon icon="mage:email"></iconify-icon>
                </span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              <div className="position-relative mb-20">
                <div className="icon-field">
                  <span className="icon top-50 translate-middle-y">
                    <iconify-icon icon="solar:lock-password-outline"></iconify-icon>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    id="password"
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <span
                  className="toggle-password ri-eye-line cursor-pointer position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light"
                  onClick={togglePasswordVisibility}
                ></span>
              </div>
              <div className="">
                <div className="d-flex justify-content-between gap-2">
                  <div className="form-check style-check d-flex align-items-center">
                    <input
                      className="form-check-input border border-neutral-300"
                      type="checkbox"
                      value=""
                      id="remeber"
                    />
                    <label className="form-check-label" htmlFor="remeber">
                      Remember me
                    </label>
                  </div>
                  <a
                    href="javascript:void(0)"
                    className="text-primary-600 fw-medium"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
