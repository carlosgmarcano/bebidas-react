import React, {createContext, useState, useEffect} from 'react';

//Crear el Context
export const CategoriasContext = createContext();

//Provider es donde se encuentran las funciones y state
const CategoriasProvider = (props) => {
    
    //Crear el state del Context
    const [categorias, setCategorias] = useState([])
    
    useEffect(() => {
        const obtenerCategorias = async () => {
            const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
            const data = await fetch(URL);
            const resultado = await data.json();

            // Usando Axios -- const categorias = await axios.get(URL);
            setCategorias(resultado.drinks);
            
        };
        obtenerCategorias(); 
    },[]);

    

    return(
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    )
}

export default CategoriasProvider;