import React, {Component} from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

class Employees extends Component {

  baseURL = "http://localhost:57833/api/";

  state = {
    emps: [],
    tempEmp: {},
    show: false
  };


  handleClose = () => (this.setState({show:false}));
  handleShow = (emp, i) => {
    const tempEmp = {...emp}
    tempEmp._index = i;
    this.setState({show:true, tempEmp});
  };

  constructor(props) {
    super(props);
  }

  render() {

    // if(!this.state.emps) return;

    return (
      <div className="conatainer">
      <table className="table table-hover">
        <thead>
          <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>E-mail</th>
          <th>Birth Date</th>
          <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
        {this.state.emps?.map((emp, i) => (
            <tr onClick={() => this.handleShow(emp, i)}>
              <td> {emp.empFirstName} </td>
            <td>{emp.empLastName}</td>
            <td>{emp.empAddress}</td>

            <td>{emp.empEmail}</td>
            <td>{emp.empBirthDate}</td>
            <td>{emp.empPhoneNumber}</td>
            </tr>
          ))}

        </tbody>
      </table>


      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            name="empFirstName"
            value={this.state.tempEmp.empFirstName}
            onChange={this.changeHandle}/>
             <input
            name="empLastName"
            value={this.state.tempEmp.empLastName}
            onChange={this.changeHandle}/>
             <input
            name="empAddress"
            value={this.state.tempEmp.empAddress}
            onChange={this.changeHandle}/>
             <input
            name="empEmail"
            value={this.state.tempEmp.empEmail}
            onChange={this.changeHandle}/>
             <input
            name="empPhoneNumber"
            value={this.state.tempEmp.empPhoneNumber}
            onChange={this.changeHandle}/>
             <input
            name="empBirthDate"
            value={this.state.tempEmp.empBirthDate}
            onChange={this.changeHandle}/>
             <input type="number"
            name="departmentId"
            value={this.state.tempEmp.departmentId}
            onChange={this.changeHandle}/>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.SaveData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    )
  }

  async componentDidMount () {
    const {data: emps} = await axios.get(this.baseURL + 'employee');
    console.log(emps);
    this.setState({emps});
  }

  changeHandle = ({currentTarget: input}) => {
    console.log('handle changes');
    const {tempEmp} = this.state;
    tempEmp[input.name] = input.value;
    this.setState({tempEmp});
  };

  SaveData = async () => {
    const {tempEmp: emp} = this.state;
    const temp = {...emp};
    delete temp.empId;
    const result = await axios.put(this.baseURL + 'employee/' + emp.empId, temp);
    const emps = [...this.state.emps];
    const index = emp._index;
    emps[index] = {...emp};
    this.setState({emps, show: false});
  }

}

export default Employees;
