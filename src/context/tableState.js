import React, { useReducer } from 'react'
import axios from 'axios'
import TableContext from './tableContext'
import tableReducer from './tableReducer'

import { GET_DATA, GET_FILTERED_DATA } from '../types'

const TableState = (props) => {
    const initialState = {
        data: [],
        filteredData: []
    }


    const [state, dispatch] = useReducer(tableReducer, initialState);

    const getData = async () => {
        try {
            const res = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?format=json")
            const res2 = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?page=2&format=json")
            const res3 = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?page=3&format=json")
            const res4 = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?page=4&format=json")
            const res5 = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?page=5&format=json")
            const res6 = await axios.get("https://swapi-trybe.herokuapp.com/api/planets/?page=6&format=json")

            const finalArray = [...res.data.results, ...res2.data.results, ...res3.data.results, ...res4.data.results, ...res5.data.results, ...res6.data.results]

            dispatch({ type: GET_DATA, payload: finalArray })
        } catch (err) {
            console.log(err);
        }


    }

    const getFilteredData = (text) => {
        dispatch({ type: GET_FILTERED_DATA, payload: text })
    }


    return (
        <TableContext.Provider value={{
            data: state.data,
            filteredData: state.filteredData,
            getData,
            getFilteredData

        }}>
            {props.children}

        </TableContext.Provider>
    )
}

export default TableState
