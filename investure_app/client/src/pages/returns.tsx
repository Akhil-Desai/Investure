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
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="bg-white rounded-xl shadow-sm">
                {/* Dashboard Header */}
                <div className="border-b p-4 md:p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800">Investment Returns</h1>
                            <p className="text-sm text-gray-500 mt-1">
                                {totalReturns.length > 0 && `Last updated: ${new Date(totalReturns[totalReturns.length - 1].ReferenceDate).toLocaleDateString()}`}
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-medium text-gray-500">Total Return</div>
                            {totalReturns.length > 0 && (
                                <div className="text-lg font-bold text-gray-800">
                                    {(totalReturns[totalReturns.length - 1].CumulativeReturn * 100).toFixed(2)}%
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="p-4 md:p-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-[400px]">
                            <div className="text-gray-500">Loading data...</div>
                        </div>
                    ) : (
                        <div className="h-[400px] w-full">
                            <ChartComponent ReturnsData={totalReturns} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ReturnsPage
