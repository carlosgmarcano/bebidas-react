import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 350,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({receta}) => {

    //configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false)

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    
    const {setidReceta, detalles, setdetalles} = useContext(ModalContext);

    const mostrarIngredientes = detalles => {
        let ingredientes = [];
        for (let i=1 ; i<=15 ; i++) {
            if (detalles[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={i}>{detalles[`strIngredient${i}`]} {detalles[`strIngredient${i}`]}</li>
                )
            }
        };
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className= "card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src = {receta.strDrinkThumb} alt = {`Imagen de ${receta.strDrink}`} />
                <div className = "card-body">
                    <button
                        type ="button"
                        className="btn-block btn-primary"
                        onClick = {() => {
                            handleOpen();
                            setidReceta(receta.idDrink);
                        }}
                    >
                        Ver Receta
                    </button>
                    <Modal
                        open={open}
                        onClose={() => {
                            setidReceta(null); 
                            setdetalles({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{detalles.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {detalles.strInstructions}
                            </p>
                            <img className="img-thumbnail my-4" src={detalles.strDrinkThumb} />
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostrarIngredientes(detalles)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>        
        </div>
    );
}
 
export default Receta;