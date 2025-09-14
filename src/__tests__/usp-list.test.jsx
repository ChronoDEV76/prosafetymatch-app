import React from 'react'
import { render, screen } from '@testing-library/react'
import USPList from '../features/landing/components/USPList.jsx'

describe('USPList', () => {
  it('renders key selling points', () => {
    render(<USPList />)
    expect(screen.getByText(/Onafhankelijk/i)).toBeInTheDocument()
    expect(screen.getByText(/DBA-proof/i)).toBeInTheDocument()
    expect(screen.getByText(/Snel & gericht/i)).toBeInTheDocument()
  })
})

