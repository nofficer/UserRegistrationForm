import { render, screen, fireEvent, act  } from '@testing-library/react'
import userEvent  from '@testing-library/user-event'
import FormHolder from '../components/forms/FormHolder'

test('Renders',

  async () => {
    render(<FormHolder formTitle='Form Holder' />)
    fireEvent.click(screen.getByRole('button', {name:/submit/i}))
    expect(screen.getByText(/please correct outstanding errors before submitting\./i)).toBeInTheDocument();
  }

)

test('Create a User Successfully',

  async () => {
    render(<FormHolder formTitle='Form Holder' />)

    let name = screen.getByRole('textbox', {
    name: /full name/i
  })
   fireEvent.change(name, { target: { value: "Nathan Officer" } });

  let contactNumber = screen.getByRole('spinbutton', {
    name: /contact number/i
  })

  fireEvent.change(contactNumber, { target: { value: 6471234567 } });

// I can't seem to find a way to change the value of these select inputs
  let birthDay = screen.getByTestId('date_of_birth-Days')

  let birthMonth = screen.getByTestId('date_of_birth-Months')

  let birthYear = screen.getByTestId('date_of_birth-Years')

  let email = screen.getByRole('textbox', {
      name: /email address/i
    })
  fireEvent.change(email, { target: { value: "hello@example.com"} });

  let password = screen.getByTestId('password')
  userEvent.type(password, 'hello123')
  let confirmPassword = screen.getByTestId('confirm_password')
  userEvent.type(confirmPassword, 'hello123')

  fireEvent.click(screen.getByRole('button', {name:/submit/i}))
  expect(screen.getByText(/success: new user successfully created\. thank you!/i)).toBeInTheDocument();



  }


)
