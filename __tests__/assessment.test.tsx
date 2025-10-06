import { render, screen } from '@testing-library/react'
import { AssessmentForm } from '@/components/assessment/AssessmentForm'

describe('AssessmentForm', () => {
  it('renders the first step heading and next button', () => {
    render(<AssessmentForm />)
    expect(screen.getByText(/AWS Cost Optimization Assessment/i)).toBeInTheDocument()
    expect(screen.getByText(/Step 1: Company Info/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Next Step/i })).toBeInTheDocument()
  })
})

