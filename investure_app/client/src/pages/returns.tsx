import React, {useEffect, useState} from 'react'
import { fetchTotalReturns } from '../services/API'
import ChartComponent from '../components/ChartComponent'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div>
            <ChartComponent ReturnsData={totalReturns} />
        </div>
    )



}

export default ReturnsPage
