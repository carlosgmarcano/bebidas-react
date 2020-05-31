import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idReceta, setidReceta] = useState(null);
    const [detalles, setdetalles] = useState({});

    //Una vez que tengamos la receta, llamamos los detalles a la api

    useEffect(() => {
        const consultarDetalles = async () => {
            if (!idReceta) return;
            const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const resultado = await axios.get(URL);
            setdetalles(resultado.data.drinks[0]);
        };
        consultarDetalles();
    }, [idReceta])

    return ( 
        <ModalContext.Provider
            value = {{
                detalles,
                setidReceta,
                setdetalles
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;