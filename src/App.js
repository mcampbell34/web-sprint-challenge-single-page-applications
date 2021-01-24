import React from "react";
import styled from 'styled-components';
import * as yup from 'yup'; 
import {useState, useEffect} from "react"; 
import axios from 'axios';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';



const StyledDiv = styled.div`

text-align: center;
align-items:center;
margin-top:1%;
display:flex;
flex-wrap: wrap;
justify-content: space-evenly;
border: 1px solid black;
background: red;

`;

const schema = yup.object().shape({
  name: yup.string().required('name is required'), 
  email: yup.string().required('Please enter email'), 
  password: yup.string().required('Please enter password').min(6, "password needs to be 6 chars long"),
  agree: yup.boolean().oneOf([true], 'you must agree to terms')
})

function Form() {

  
  // const [users, setUsers] = useState([])
  const [form, setForm] = useState({name: "", email: "", password: "", agree:""})
  const [errors, setErrors] = useState({name: "", email: "", password: "", agree:"" })
  const [disabled, setDisabled] = useState(true)

  const setFormErrors = (name, value) => {
      yup.reach(schema, name).validate(value)
      .then(() => setErrors({...errors, [name]: ""}))
      .catch(error => setErrors({...errors, [name]:error.errors[0] }))
  }

  const change = event => {
      const {checked, value, name, type } = event.target
      const valueToUse = type === 'checkbox' ? checked : value
      setFormErrors(name, valueToUse)
      setForm({...form, [name] : valueToUse})
  }


  // useEffect(() => {
  //   const getUser = () => {
  //     axios
  //       .get('https://reqres.in/api/users') // Study this endpoint with Postman
  //       .then(response => {
  //         setUser(response.data)
  //         // Study this response with a breakpoint or log statements
  //         // and set the response data as the 'movieList' slice of state
  //       })
  //       .catch(error => {
  //         console.error('Server Error', error);
  //       });
  //   }
  //   getUser();
  // }, []);



  const submit = event => {
      event.preventDefault()
      const newUser = {name: form.name, email: form.email, password: form.password, agree: form.agree}
      axios.post('https://reqres.in/api/users', form)
          .then( res => {
              setForm({ name: '', email: '', password: '', agree: false})
          })
          .catch(err => {
              debugger

          })
  }

  useEffect(() => {
      schema.isValid(form).then(valid => setDisabled(!valid))
  }, [form])

  return (
      <div className="App"> 
      <div style={{color: 'blue'}}> 
          <div>{errors.name}</div> <div>{errors.email}</div><div>{errors.password}</div><div>{errors.agree}</div>
      </div> 
      <form onSubmit={submit}> 
      <label> Name 
          <input onChange={change} value={form.name} name="name" type="text" /> 
      </label> 
      <label> Email 
          <input onChange={change} value={form.email} name="email" type="text" /> 
      </label> 
      <label> Special Instructions:  
          <input onChange={change} value={form.password} name="password" type="text" /> 
      </label> 
      <label> Toppings 
          <input onChange={change} checked={form.agree} name="agree" type="checkbox" /> 
          <input onChange={change} checked={form.agree} name="agree" type="checkbox" /> 

      </label> 
      <button disabled={disabled}> Submit! </button>

      <div className='newUser'> 
      </div>
      </form>
      </div> 


  )


}
































function App() {
  return (
    <>
    <Router> 
    <StyledDiv>
      <nav> 
        <Link to='/pizza'> Order here! </Link>
        <Route exact path='/pizza' component={Form} /> 
        <Link to="/"> Home </Link>
        <Route exact path="/" />
        </nav>
      </StyledDiv> 
      <h1>Lambda Eats</h1>
      <p>Click Order here! To place your order</p>
      </Router>
    </>
  );
};
export default App;
