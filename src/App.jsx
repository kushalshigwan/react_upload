import React,{ useEffect,useState } from 'react'
import {
   // Container,
   // Row,
   Form,
   Button,
   Alert,
   Table,
   // Col,
} from 'react-bootstrap'
import InputError from './components/InputError'
import { validateCombo } from './validation/loginRegisterValidation'


const App = () => {
   // const [ name,setName ] = useState( '' )

   const [ validatenow,setValidateNow ] = useState( false )
   const [ submitoperaiton,setSubmitOperation ] = useState( true )//true - add, false - update
   const [ empdata,setEmpData ] = useState( {
      empcode: '',
      name: '',
      department: '',
      gender: '',
      dob: '',
      joiningdate: '',
      previousexp: '',
      salary: '',
      address: '',

      id: '',
      update: false,
      records: [],
      showAlert: false,
      alertType: 'success',
      alertMsg: '',
   } )

   const [ empdataerror,setEmpDataError ] = useState( {
      empcodeerror: true,
      nameerror: true,
      departmenterror: true,
      gendererror: true,
      doberror: true,
      joiningdateerror: true,
      previousexperror: true,
      salaryerror: true,
      addresserror: true,
   } )

   const handleChange = ( e ) => {
      e.persist()
      const inputname = e.target.name
      const inputvalue = e.target.value
      // console.log( name,' : ',value )
      setEmpData( ( prevState ) => { return { ...prevState,[ inputname ]: inputvalue,showAlert: false } } )
      checkValidity( inputname,inputvalue )
   }

   useEffect( () => {
      // fetchAllRecords()
      console.log( empdata )
   },[ empdata ] )

   // fetch All Records
   const fetchAllRecords = () => {
      const testdata = {
         id: new Date().valueOf(),
         empcode: '123',
         name: 'Rajat Karmokar',
         department: 'Front End Developer',
         gender: 'male',
         dob: '2022-04-08',
         joiningdate: '2022-04-08',
         previousexp: 3,
         salary: '10000',
         address: 'mumbai',
      }
      setEmpData( prevState => { return { ...prevState,records: [ testdata ] } } )
   }

   // view single data to edit
   const onEditHandler = ( id ) => {
      console.log( id )
      setSubmitOperation( false )
      empdata.records.filter( record => {
         if ( record.id === id )
            setEmpData( prevState => {
               return {
                  ...prevState,
                  id: id,
                  empcode: record.empcode,
                  name: record.name,
                  department: record.department,
                  gender: record.gender,
                  dob: record.dob,
                  joiningdate: record.joiningdate,
                  previousexp: record.previousexp,
                  salary: record.salary,
                  address: record.address,
               }
            } )
      } )
   }

   // update record
   const onUpdateHandler = ( e ) => {
      e.preventDefault()
      if ( submitoperaiton ) return
      setValidateNow( true )
      checkValidity()
      const error = isEmpty( empdataerror )
      // console.log( JSON.stringify( empdataerror ),error )
      if ( error === false )
         return setEmpData( prevState => { return { ...prevState,showAlert: true,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )

      const submitteddata = {
         id: empdata.id,
         empcode: empdata.empcode,
         name: empdata.name,
         department: empdata.department,
         gender: empdata.gender,
         dob: empdata.dob,
         joiningdate: empdata.joiningdate,
         previousexp: empdata.previousexp,
         salary: empdata.salary,
         address: empdata.address,
      }
      setEmpData( prevState => {
         return {
            ...prevState,
            id: '',
            empcode: '',
            name: '',
            department: '',
            gender: '',
            dob: '',
            joiningdate: '',
            previousexp: '',
            salary: '',
            address: '',
            records: prevState.records.map( record =>
               ( record.id === prevState.id && submitteddata ) || record )
         }
      } )
      setSubmitOperation( true )
      // console.log( empdata )
   }

   // delete a record
   const deleteRecord = ( id ) => {
      console.log( id )
      setEmpData( prevState => {
         return {
            ...prevState,
            records: prevState.records.filter( val => ( val.id !== id && val ) )
         }
      } )
   }

   const checkValidity = ( name,value ) => {
      let error
      if ( name === 'empcode' ) error = validateCombo( value,[ 'REQUIRED','ALPHANUMERIC','NOSPACE' ] )
      if ( name === 'name' ) error = validateCombo( value,[ 'REQUIRED','NOSPACE','NODIGIT' ] )
      if ( name === 'department' ) error = validateCombo( value,[ 'REQUIRED' ] )
      if ( name === 'gender' ) error = validateCombo( value,[ 'REQUIRED' ] )
      if ( name === 'dob' ) error = validateCombo( value,[ 'REQUIRED' ] )
      if ( name === 'joiningdate' ) error = validateCombo( value,[ 'REQUIRED' ] )
      if ( name === 'previousexp' ) error = validateCombo( value,[ 'REQUIRED','DIGIT' ] )
      if ( name === 'salary' ) error = validateCombo( value,[ 'REQUIRED','DIGIT' ] )
      if ( name === 'address' ) error = validateCombo( value,[ 'REQUIRED' ] )
      if ( name )
         setEmpDataError( prevState => ( {
            ...prevState,
            [ `${name}error` ]: error
         } ) )
      if ( !name )
         return setEmpDataError( {
            empcodeerror: validateCombo( empdata.empcode,[ 'REQUIRED','ALPHANUMERIC','NOSPACE' ] ),
            nameerror: validateCombo( empdata.name,[ 'REQUIRED','NOSPACE','NODIGIT' ] ),
            departmenterror: validateCombo( empdata.department,[ 'REQUIRED' ] ),
            gendererror: validateCombo( empdata.gender,[ 'REQUIRED' ] ),
            doberror: validateCombo( empdata.dob,[ 'REQUIRED' ] ),
            joiningdateerror: validateCombo( empdata.joiningdate,[ 'REQUIRED' ] ),
            previousexperror: validateCombo( empdata.previousexp,[ 'REQUIRED','DIGIT' ] ),
            salaryerror: validateCombo( empdata.salary,[ 'REQUIRED','DIGIT' ] ),
            addresserror: validateCombo( empdata.address,[ 'REQUIRED' ] ),
         } )
   }

   function isEmpty ( obj ) {
      for ( var prop in obj ) {
         if ( obj.hasOwnProperty( prop ) ) {
            if ( obj[ prop ] ) return false
         }
      }
      return true
   }

   const onSubmitHandler = ( e ) => {
      e.preventDefault()
      if ( !submitoperaiton ) return
      setValidateNow( true )
      checkValidity()
      const error = isEmpty( empdataerror )
      if ( error === false )
         return setEmpData( prevState => { return { ...prevState,showAlert: true,alertType: 'warning',alertMsg: 'Please fill all the details correctly' } } )

      const submitteddata = {
         id: new Date().valueOf(),
         empcode: empdata.empcode,
         name: empdata.name,
         department: empdata.department,
         gender: empdata.gender,
         dob: empdata.dob,
         joiningdate: empdata.joiningdate,
         previousexp: empdata.previousexp,
         salary: empdata.salary,
         address: empdata.address,
      }

      setEmpData( prevState => {
         return {
            ...prevState,
            empcode: '',
            name: '',
            department: '',
            gender: '',
            dob: '',
            joiningdate: '',
            previousexp: '',
            salary: '',
            address: '',
            id: '',
            records: [ ...prevState.records,submitteddata ],
         }
      } )
   }

   return (
      <div>
         <div className='container'>

            { empdata.showAlert === true ? (
               <Alert
                  variant={ empdata.alertType }
                  onClose={ () => {
                     setEmpData( {
                        showAlert: false,
                     } )
                  } }
                  dismissible>
                  <Alert.Heading>{ empdata.alertMsg }</Alert.Heading>
               </Alert>
            ) : null }

            {/* Insert Form */ }
            <form noValidate
               onSubmit={ submitoperaiton && onSubmitHandler || onUpdateHandler }
               className='my-5'>

               <div className='row'>
                  <div className='col col-md-4'>
                     <label>Emp Code</label>
                     <input
                        type='text'
                        name='empcode'
                        onChange={ handleChange }
                        value={ empdata.empcode }
                        placeholder='Emp Code'
                     />
                     { validatenow && <InputError message={ empdataerror.empcodeerror } /> }
                  </div>
                  <div className='col col-md-4'>
                     <label>Name</label>
                     <input className='form-control'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={ empdata.name }
                        onChange={ handleChange }
                     />
                     { validatenow && <InputError message={ empdataerror.nameerror } /> }
                  </div>
                  <div className='col col-md-4'>
                     <label>Department</label>
                     <select
                        type='select'
                        placeholder='Department'
                        name='department'
                        value={ empdata.department }
                        onChange={ handleChange }
                     >
                        <option></option>
                        <option>Admin</option>
                        <option>Technology</option>
                        <option>Accounts</option>
                     </select>
                     { validatenow && <InputError message={ empdataerror.departmenterror } /> }
                  </div>
               </div>

               <div>
                  <label className='mr-4 '>Gender :</label>
                  <input
                     className='mr-3 '
                     type='radio'
                     name='gender'
                     label='Male'
                     value='male'
                     onChange={ handleChange }
                  // defaultChecked={empdata.gender.male}
                  />
                  <input
                     className='mr-3 '
                     type='radio'
                     name='gender'
                     label='Female'
                     value='female'
                     onChange={ handleChange }
                  // defaultChecked={empdata.gender.female}
                  />
                  { validatenow && <InputError message={ empdataerror.gendererror } /> }
               </div>

               <div className='row'>
                  <div className='col col-md-3' >
                     <label>Date of birth</label>
                     <input
                        type='date'
                        placeholder='Date of birth'
                        name='dob'
                        value={ empdata.dob }
                        onChange={ handleChange }
                     />
                     { validatenow && <InputError message={ empdataerror.doberror } /> }
                  </div>
                  <div className='col col-md-3' >
                     <label>Joining Date</label>
                     <input
                        type='date'
                        placeholder='Joining Date'
                        name='joiningdate'
                        value={ empdata.joiningdate }
                        onChange={ handleChange }
                     />
                     { validatenow && <InputError message={ empdataerror.joiningdateerror } /> }
                  </div>
                  <div className='col col-md-3' >
                     <label>Previous Exp (years)</label>
                     <input
                        type='text'
                        placeholder='Previous Exp'
                        name='previousexp'
                        value={ empdata.previousexp }
                        onChange={ handleChange }
                     />
                     { validatenow && <InputError message={ empdataerror.previousexperror } /> }
                  </div>
                  <div className='col col-md-3' >
                     <label>Salary</label>
                     <input type='text'
                        placeholder='Salary'
                        name='salary'
                        value={ empdata.salary }
                        onChange={ handleChange }
                     />
                     { validatenow && <InputError message={ empdataerror.salaryerror } /> }
                  </div>
               </div>

               <div >
                  <label>Address</label>
                  <input
                     type='textarea'
                     placeholder='Address'
                     name='address'
                     value={ empdata.address }
                     onChange={ handleChange }
                  />
                  { validatenow && <InputError message={ empdataerror.addresserror } /> }
               </div>

               <Button type='submit'>{ submitoperaiton && 'Submit' || 'Update' } form</Button>
            </form>

            {/* All Records */ }
            <div className='row my-5'>
               <Table striped={ true } bordered={ true } hover={ true } size='sm' responsive={ true }>
                  <thead>
                     <tr>
                        <th>empcode</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Gender</th>
                        <th>DDB</th>
                        <th>Joining Date</th>
                        <th>Previous Exp (years)</th>
                        <th>Salary</th>
                        <th>Address</th>
                        <th colSpan='2'>Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     { empdata.records &&
                        empdata.records.map( ( record,index ) => {
                           return (
                              <tr key={ `empdata${record.id}` }>
                                 <td>{ record.empcode }</td>
                                 <td>{ record.name }</td>
                                 <td>{ record.department }</td>
                                 <td>{ record.gender }</td>
                                 <td>{ record.dob }</td>
                                 <td>{ record.joiningdate }</td>
                                 <td>{ record.previousexp }</td>
                                 <td>{ record.salary }</td>
                                 <td>{ record.address }</td>
                                 <td>
                                    <Button
                                       variant='info'
                                       onClick={ () => onEditHandler( record.id ) }>
                                       Edit
                                    </Button>
                                 </td>
                                 <td>
                                    <Button
                                       variant='danger'
                                       onClick={ () => deleteRecord( record.id ) }>
                                       Delete
                                    </Button>
                                 </td>
                              </tr>
                           )
                        } ) }
                  </tbody>
               </Table>
            </div>

         </div>
      </div>
   )
}

export default App
