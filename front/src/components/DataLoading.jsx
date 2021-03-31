import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom"
import adminMenuStyles from "../utils/adminStyles";

const Prueba = () => {
    const classes = adminMenuStyles();
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
     if (file.name.slice(file.name.length-4,file.name.length)==".xls") {
    
                      const promise = new Promise((resolve, reject) => {
                      const fileReader = new FileReader();
                    
                      fileReader.readAsArrayBuffer(file);

                      fileReader.onload = (e) => {
                        const bufferArray = e.target.result;
                        
                        const wb = XLSX.read(bufferArray, { type: "buffer" });

                        const wsname = wb.SheetNames;

                        const ws = wb.Sheets[wsname];

                        const data = XLSX.utils.sheet_to_json(ws);

                        resolve(data);
                      };
                      
                      fileReader.onerror = (error) => {
                        alert(error);
                      };
                      
                      });

                      promise.then((data) => {
                        setItems(data);
                      });
  }
  else (alert("Archivo Invalido"))

  };
  const cambio = (e) => {
          const file = e.target.files[0];
          readExcel(file);
        }

  const upload = () => {
    console.log("items")
      axios.post("http://localhost:8000/api/order", {items
      })
      .then((res)=>
      {if(res.status === 200){
      
        alert("Tu archivo se cargo correctamente")
      }else{
    
        alert("Hubo un error en la carga")
      }})
    };
  return (
<React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">

            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                          <input
                type="file"
                   onChange={(e) => {
                  const file = e.target.files[0];
                  readExcel(file);
                }}
              />
                </Grid>
                <Grid item xs={12}>
                  <Link to="/admin/users" style={{ textDecoration: 'none', color: "inherit" }}>
                    <Button variant="contained"
                      color="primary"
                      onClick={upload}>
                      Cargar archivo
                  </Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
         
        </div>
      </main>
    </React.Fragment>




    // <div>
    //   <input
    //     type="file"
    //     onChange={(e) => {
    //       const file = e.target.files[0];
    //       readExcel(file);
    //     }}
    //   />
    //   <button onClick={upload}>subir a la base de datos</button>
    // </div>
  );
};

export default Prueba;