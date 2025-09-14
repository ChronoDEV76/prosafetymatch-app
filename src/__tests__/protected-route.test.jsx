import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

describe('Protected route', () => {
  it('redirects unauthenticated users to /login', async () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    )
    // Wait for the redirect to render the login heading
    const heading = await screen.findByRole('heading', { name: /Inloggen/i })
    expect(heading).toBeInTheDocument()
  })
})
