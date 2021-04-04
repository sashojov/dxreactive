import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function PatientSelect (props) {
    const classes = useStyles();
    // const [state, setState] = React.useState({
    //   age: '',
    //   name: 'hai',
    // });
  
    // const handleChange = (event) => {
    //   const name = event.target.name;
    //   setState({
    //     ...state,
    //     [name]: event.target.value,
    //   });
    // };
    const [patients, setPatients] = useState([]);
    const [sValue, setSValue] = useState("");
    const patientsUrl = "http://ngs-lbd.mf.uni-lj.si:64000/patients2/?api_key=NZTXG3DCMQ="
    let pType = props.pType.toLowerCase();

    const handleChange = (e) => {
        setSValue( e.target.value);
        props.onPatientChange(e.target.value);
    } 
    useEffect(() => {
        fetch(patientsUrl) 
        .then(res => res.json())
        .then(data => 
            pType !== "all" ?
            setPatients(data.records
                .filter(p => p.patient_id != null && p.patient_id.length < 70 && p.status === pType)
                .map(p => p.patient_id))
            :
            setPatients(data.records
                .filter(p => p.patient_id != null && p.patient_id.length < 70 )
                .map(p => p.patient_id))
        );
    },[pType])

    return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="select_patient_id">Choose patient </InputLabel>
        <Select
            native
            onChange={handleChange}
            label="Choose patient"
            value={sValue}
            inputProps={{
                name: '',
                id: 'select_patient_id',
            }}
        >
              {patients.map((op, index) => 
                <option key={index} value={op}>{op}</option>
              )}
        </Select>
        </FormControl>
    );
  }

export default PatientSelect;