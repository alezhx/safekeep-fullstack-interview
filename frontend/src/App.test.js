import { render, screen } from '@testing-library/react';
import { shallow } from 'enzyme'
import App from './App';
import AppBarForm from './components/AppBarForm';
import DataTable from './components/DataTable'


describe("App", () => {
  it('renders application without crashing', () => {
    const div = document.createElement('div');
    render(<App />, div);
  });
  it('displays application title', () => {
    render(<App />)
    expect(screen.getByText('Safekeep User Participation')).toBeInTheDocument();
  });
  it('does not display data table or chart when there is no user data', () => {
    render(<App />)
    expect(screen.getByText('There\'s no user data to display!')).toBeInTheDocument();
  });
});

const mockUser = {
  id: "1",
  firstName: "Alex",
  lastName: "Huang",
  hours: "30",
};

describe("DataTable", () => {
  it('data table accepts user data props', () => {
    render(<DataTable userData={[mockUser]} />)
    expect(screen.getByText('Alex')).toBeInTheDocument();
  });
  it('allows delete user and button is clickable', () => {
    const mockClickFn = jest.fn();
    const wrapper = shallow(<DataTable userData={[mockUser]} deleteUser={mockClickFn}/>)
    wrapper.find('.deleteButton').simulate('click')
  });
})

describe("AppBarForm", () => {
  it('renders text inputs for the user form', () => {
    render (<AppBarForm />)
    expect(screen.getByPlaceholderText('Insert first name')).toBeInTheDocument()
  });
  it('should not allow form submission when validation rules fail', () => {
    const mockClickFn = jest.fn();
    const wrapper = shallow(<AppBarForm createUser={mockClickFn}/>)
    wrapper.find('.submitButton').simulate('click')
    expect(mockClickFn).toHaveBeenCalledTimes(0)
  })
})