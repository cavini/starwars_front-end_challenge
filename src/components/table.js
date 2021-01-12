import React, { useContext, useEffect } from 'react'
import TableContext from '../context/tableContext';
import Filter from './filter'

const Table = () => {

    const tableContext = useContext(TableContext);

    const { getData, data, filteredData } = tableContext;

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="table-container">
            <table>
                <Filter />
                <tr>
                    <th>Name</th>
                    <th>Rotation Period</th>
                    <th>Orbital Period</th>
                    <th>Diameter</th>
                    <th>Climate</th>
                    <th>Gravity</th>
                    <th>Terrain</th>
                    <th>Surface Water</th>
                    <th>Population</th>
                    <th>Films</th>
                    <th>Created</th>
                    <th>Edited</th>
                    <th>URL</th></tr>
                {filteredData.length > 0 ? filteredData.map((item) => {
                    return (<tr>
                        <td>{item.name}</td>
                        <td>{item.rotation_period}</td>
                        <td>{item.orbital_period}</td>
                        <td>{item.diameter}</td>
                        <td>{item.climate}</td>
                        <td>{item.gravity}</td>
                        <td>{item.terrain}</td>
                        <td>{item.surface_water}</td>
                        <td>{item.population}</td>
                        <td>{item.films}</td>
                        <td>{item.created}</td>
                        <td>{item.edited}</td>
                        <td>{item.url}</td>
                    </tr>)
                }) : data.map((item) => {
                    return (<tr>
                        <td>{item.name}</td>
                        <td>{item.rotation_period}</td>
                        <td>{item.orbital_period}</td>
                        <td>{item.diameter}</td>
                        <td>{item.climate}</td>
                        <td>{item.gravity}</td>
                        <td>{item.terrain}</td>
                        <td>{item.surface_water}</td>
                        <td>{item.population}</td>
                        <td>{item.films}</td>
                        <td>{item.created}</td>
                        <td>{item.edited}</td>
                        <td>{item.url}</td>
                    </tr>)
                })}
            </table>
        </div>
    )
}

export default Table
