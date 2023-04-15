import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";

function BasicExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = (data) => {
    console.log(data);
    axios.post("http://localhost:4000/users/create-user",data)
    .then(
        (response)=>{

            console.log(response.data)
        }
    )
    .catch(
        (error)=>{
            console.log(error)
        }
    )
  }
  

  return (
    <Form className="col-lg-5 mx-auto" onSubmit={handleSubmit(onFormSubmit)}>
      

<Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          {...register("username", { required: true })}
        />
        {errors.username && <p className="text-danger">*username required</p>}
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          {...register("emailid", { required: true })}
        />
        {errors.emailid && <p className="text-danger">*user id required</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>DOB</Form.Label>
        <Form.Control
          type="date"
          placeholder="date of birth"
          {...register("dob", { required: true })}
        />
        {errors.dob&&<p className="text-danger">*dob is required</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-danger">*password is required</p>
        )}
      </Form.Group> */}

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample;
