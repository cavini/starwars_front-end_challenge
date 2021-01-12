import React, { Fragment, useState, useContext } from 'react';
import TableContext from '../context/tableContext'
import { v4 as uuidv4 } from 'uuid';



const Filter = () => {
    const [filters, setFilters] = useState({
        filterByName: {
            name: ''
        },
        filterByNumericValues: [],
        currentFilter: {}
    });

    const tableContext = useContext(TableContext)
    const { data, filteredData, getFilteredData } = tableContext;


    const changeInput = e => {
        setFilters({
            ...filters,
            filterByName: {
                name: e.target.value
            }

        })
        const newData = filterData(e.target.value);
        getFilteredData(newData)



    }

    const filterData = (text) => {
        if (text === '' || text === ' ' || text === '   ') {
            return []
        } else {
            let filteredResults = [];
            for (let i = 0; i < data.length; i++) {


                text = text.toLowerCase()
                let name = data[i].name.toLowerCase()

                console.log(name);
                if (name.includes(text)) {


                    filteredResults.push(data[i])


                }

            }
            return filteredResults
        }


    }
    let filtered;
    let filtered2;
    let newObj;
    const numericFilter1 = e => {
        filtered = { [e.target.name]: e.target.value }
        // console.log(filtered);

    }

    const numericFilter2 = e => {
        filtered2 = { [e.target.name]: e.target.value }
        // console.log(filtered2);

    }
    const setValue = e => {
        newObj = { [e.target.name]: e.target.value }

        // console.log(newObj);



    }

    const submit = () => {
        let filter = { ...filtered, ...filtered2, ...newObj }
        console.log(filter);
        console.log(filters.filterByNumericValues);
        filter.id = uuidv4();

        console.log(filter);

        const test = filters.filterByNumericValues.some((item) => item.column === filter.column)
        let filterColumn = (filter.hasOwnProperty('column'));
        let filterComparison = (filter.hasOwnProperty('comparison'));
        console.log(filterColumn, filterComparison);

        if (!test && filterColumn && filterComparison) {
            setTimeout(() => {
                setFilters({
                    ...filters, filterByNumericValues: [...filters.filterByNumericValues, filter],
                    currentFilter: filter
                })

            }, 550)
            console.log(filter.column);

        }

        if (filter.comparison === 'igual a') {
            let filteredArray = data.filter((item) => {
                if (item[filter.column] !== 'unknown') {
                    return item[filter.column] === filter.value
                }


            })
            getFilteredData(filteredArray);

        } else if (filter.comparison === 'maior que') {
            let filteredArray = data.filter((item) => {
                if (item[filter.column] !== 'unknown') {
                    return item[filter.column] > filter.value
                }
            })
            getFilteredData(filteredArray);
        } else if (filter.comparison === 'menor que') {
            let filteredArray = data.filter((item) => {
                if (item[filter.column] !== 'unknown') {
                    return item[filter.column] < filter.value
                }
            })
            getFilteredData(filteredArray);
        }























    }

    const deleteFilter = (param) => {
        return function () {
            let removedFiltersArray = filters.filterByNumericValues.filter(item => item.id !== param);
            console.log(removedFiltersArray);
            setTimeout(() => {
                if (param === filters.currentFilter.id) {
                    setFilters({
                        ...filters, currentFilter: {}, filterByNumericValues: removedFiltersArray
                    })
                } else {
                    setFilters({
                        ...filters, filterByNumericValues: removedFiltersArray
                    })
                }



            }, 550)
            console.log(filters.currentFilter.id);
        }





        /**/

    }



    if (data.length > 0) {
        return (
            <div className="filter-wrap">
                <input type="text" placeholder="Pesquise por nome" onChange={changeInput} />
                <div className="filter-container">
                    <select name="column" onChange={numericFilter1}>
                        <option value="population">Population</option>
                        <option value="orbital_period">Orbital Period</option>
                        <option value="diameter">Diameter</option>
                        <option value="rotation_period">Rotation Period</option>
                        <option value="surface_water">Surface Water</option>
                    </select>
                    <select name="comparison" id="" onChange={numericFilter2}>
                        <option value="maior que">Maior que</option>
                        <option value="menor que">Menor que</option>
                        <option value="igual a">Igual a</option>
                    </select>
                    <input type="number" placeholder="Digite somente números" name="value" onChange={setValue} />
                    <button onClick={submit}>Procurar</button>
                </div>
                <div>{filters.filterByNumericValues.map((abc) => {
                    return <div><li>{`${abc.column}`}</li> <li>{`${abc.comparison}`}</li> <li>{`${abc.value}`}</li> <button onClick={deleteFilter(abc.id)}>Delete</button></div>
                })}
                </div>

            </div>
        )
    } else {
        return <Fragment><h1>Aguarde enquanto buscamos as informações...</h1></Fragment>
    }

}

export default Filter
