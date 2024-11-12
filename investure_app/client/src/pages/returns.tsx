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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect( () => {
        const handleFetch = async() => {
            try{
                setIsLoading(true)
                const receivedData = await fetchTotalReturns()
                setTotalReturns(receivedData.data)
            } catch(error) {
                console.log("error fetching data", error)
                throw error;
            } finally {
                setIsLoading(false)
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
