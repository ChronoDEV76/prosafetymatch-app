import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App.jsx'

describe('App routing', () => {
  it('renders landing page for "/"', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    )
    // Assert a prominent heading from the landing page
    expect(
      screen.getByText(/Wij matchen expertise aan jouw opdracht/i)
    ).toBeInTheDocument()
  })
})
