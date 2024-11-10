import React, {useEffect, useState} from 'react'
import { fetchTotalReturns } from '../services/api'

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
                {totalReturns.map( (item) =>
                    <p key={item.ReferenceDate}> {item.CumulativeReturn * 100}% </p>
                )}
        </div>
    )

}

export default ReturnsPage