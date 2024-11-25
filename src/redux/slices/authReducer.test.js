import authReducer, { setEmail, setPassword, register, login, logout } from './authSlice';

describe('Auth reducer logic', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      email: '',
      password: '',
      error: null,
      isAuthenticated: false,
    };
  });

  const registerUser = (email, password) => {
    return authReducer(
      { ...initialState, email, password },
      register()
    );
  };

  test('should set email', () => {
    const action = setEmail('test@example.com');
    const newState = authReducer(initialState, action);
    expect(newState.email).toBe('test@example.com');
  });

  test('should set password', () => {
    const action = setPassword('Password123');
    const newState = authReducer(initialState, action);
    expect(newState.password).toBe('Password123');
  });

  test('should register new user with valid email and password', () => {
    const newState = registerUser('valid@example.com', 'Password123');
    expect(newState.error).toBe(null);
    expect(newState.isAuthenticated).toBe(true);
  });

  test('should not register user with invalid email', () => {
    const newState = registerUser('invalid-email', 'Password123');
    expect(newState.error).toBe('Невірний формат email');
    expect(newState.isAuthenticated).toBe(false);
  });

  test('should not register user with invalid password', () => {
    const newState = registerUser('valid@example.com', 'short');
    expect(newState.error).toBe('Пароль повинен містити не менше 8 символів, включаючи одну велику та одну малу літеру');
    expect(newState.isAuthenticated).toBe(false);
  });

  test('should not register user if email already exists', () => {
    // Спочатку реєструємо користувача
    registerUser('valid@example.com', 'Password123');

    // Спробуємо знову зареєструвати з тим же email
    const state = {
      ...initialState,
      email: 'valid@example.com',
      password: 'Password123',
    };

    const newState = authReducer(state, register());
    expect(newState.error).toBe('Акаунт з таким email вже існує');
    expect(newState.isAuthenticated).toBe(false);
  });

  test('should login with correct credentials', () => {
    const registerState = registerUser('test@example.com', 'Password123');
    const loginState = authReducer(registerState, login());
    expect(loginState.error).toBe(null);
    expect(loginState.isAuthenticated).toBe(true);
  });

  test('should not login with wrong password', () => {
    const state = {
      ...initialState,
      email: 'test@example.com',
      password: 'WrongPassword',
    };

    const newState = authReducer(state, login());
    expect(newState.error).toBe('Неправильний пароль для цього акаунта');
    expect(newState.isAuthenticated).toBe(false);
  });

  test('should logout', () => {
    const state = {
      ...initialState,
      email: 'test@example.com',
      password: 'Password123',
      isAuthenticated: true,
    };

    const newState = authReducer(state, logout());
    expect(newState.email).toBe('');
    expect(newState.password).toBe('');
    expect(newState.isAuthenticated).toBe(false);
  });
});
