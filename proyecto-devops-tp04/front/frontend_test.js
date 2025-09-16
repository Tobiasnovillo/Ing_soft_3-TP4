import { render, screen } from '@testing-library/react';
import App from './App';

describe('Frontend App Tests', () => {
  test('renders main title', () => {
    render(<App />);
    const linkElement = screen.getByText(/DevOps Pipeline Demo/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders backend status section', () => {
    render(<App />);
    const statusElement = screen.getByText(/Estado del Backend/i);
    expect(statusElement).toBeInTheDocument();
  });

  test('renders users section', () => {
    render(<App />);
    const usersElement = screen.getByText(/Usuarios/i);
    expect(usersElement).toBeInTheDocument();
  });

  test('renders load users button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Cargar Usuarios/i);
    expect(buttonElement).toBeInTheDocument();
  });
});