import React, {useEffect, useState} from 'react'
import { fetchTotalReturns } from '../services/API'
import LineGraph from '../components/LineGraphComponent'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/ReturnsPage.css'



interface totalReturns {
    ReferenceDate: string,
    CumulativeReturn: number,
}

function ReturnsPage(){
    const [totalReturns,setTotalReturns] = useState<totalReturns[]>([])

    useEffect( () => {
        const handleFetch = async() => {
            try{
                const receivedData = await fetchTotalReturns()
                setTotalReturns(receivedData.data)
            } catch(error) {
                console.log("error fetching data", error)
                throw error;
            }
        }
        handleFetch()
    }, [])

    return (
        <div className='page-container d-flex flex-column align-items-center justify-content-center'>
            <LineGraph ReturnsData={totalReturns} />
        </div>
    )



}

export default ReturnsPage
