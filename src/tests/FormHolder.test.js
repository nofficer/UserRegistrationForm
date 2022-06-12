import { render, screen, fireEvent, act, container  } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import FormHolder from '../components/forms/FormHolder'

test('Error if form isnt filled in',

  async () => {
    render(<FormHolder formTitle='Form Holder' />)
    fireEvent.click(screen.getByRole('button', {name:/submit/i}))
    expect(screen.getByText(/please correct outstanding errors before submitting\./i)).toBeInTheDocument();
  }

)
