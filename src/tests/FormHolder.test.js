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

// test('Create a User Successfully',
//
//   async () => {
//     render(<FormHolder formTitle='Form Holder' initialFormValues={
//       {
//         "full_name": 'Nathan Officer',
//         "contact_number": "6471234567",
//         "date_of_birth": "06281995",
//         "email": "Nathan@example.com",
//         "password": "hello123",
//         "confirm_password": "hello123"
//       }
//     } />)
//
//   fireEvent.click(screen.getByRole('button', {name:/submit/i}))
//   // expect(screen.getByText(/success: new user successfully created\. thank you!/i)).toBeInTheDocument();
//   expect(screen.getByRole('alert')).toBeInTheDocument()
//   }
// )


    // let name = screen.getByTestId('full_name')
    //
    // userEvent.type(name,'Nathan Officer')

    // fireEvent.change(name,{target:{value: 'Nathan Officer'}})
    // expect(name).toHaveValue('Nathan Officer')
  //  fireEvent.change(name, { target: { value: "Nathan Officer" } });
  //
  // let contactNumber = screen.getByRole('spinbutton', {
  //   name: /contact number/i
  // })
  //
  // fireEvent.change(contactNumber, { target: { value: 6471234567 } });
  //
  //
  // let birthDay = screen.getByTestId('content-input-date_of_birth-Days')
  // fireEvent.change(birthDay,{target: {value: "28"}})
  //
  // let birthMonth = screen.getByTestId('content-input-date_of_birth-Months')
  // fireEvent.change(birthMonth,{target: {value: "June"}})
  //
  // let birthYear = screen.getByTestId('content-input-date_of_birth-Years')
  // fireEvent.change(birthYear,{target: {value: "1995"}})
  //
  // let email = screen.getByRole('textbox', {
  //     name: /email address/i
  //   })
  // fireEvent.change(email, { target: { value: "hello@example.com"} });
  //
  // let password = screen.getByTestId('password')
  // fireEvent.change(password, 'hello123')
  // let confirmPassword = screen.getByTestId('confirm_password')
  // fireEvent.change(confirmPassword, 'hello123')
  //
