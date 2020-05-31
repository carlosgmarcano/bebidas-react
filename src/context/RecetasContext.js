import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios'

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([])
    const [consultar, setconsultar] = useState(false)
    const [buscarRecetas, setBuscarRecetas] = useState({
        nombre: '',
        categoria: ''
    })

    const {nombre, categoria} = buscarRecetas;

    useEffect(() => {
        if (consultar) {
            const getRecetas = async () => {
                const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`
                const receta = await axios.get(URL);
                //console.log(receta.data.drinks);
                setRecetas(receta.data.drinks);
            }
            getRecetas();
        }
    })
    
    return ( 
        <RecetasContext.Provider
            value= {{
                recetas,
                setBuscarRecetas,
                setconsultar,
            }}
        >
            {props.children}
        </RecetasContext.Provider>
     );
}
 
export default RecetasProvider;