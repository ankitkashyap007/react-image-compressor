import React from 'react'

export default function QuickInfo({jsonData}){
    return (
        <table className="mb-5" border="1">
            <thead>
                <tr>
                    <th colSpan={2} className="text-xl">WordPress</th>
                </tr>
            </thead>
            <tbody>
                {(jsonData && jsonData.result) ? Object.entries(jsonData.result).map(([key, value]) => (
                    <tr className="bg-gray-100" key={key}>
                        <td className="py-2 px-4 border-b">{key}</td>
                        <td className="py-2 px-4 border-b">{value ? (Array.isArray(value) ? <ul>{value.map(item => <li>{item}</li>)}</ul> : typeof value === 'object' ? <ul className="list-disc">{Object.entries(value).map(([key, objectValue]) => <li key={key}>{key}: {!objectValue ? "N/A" : objectValue}</li>)}</ul> : value) : " na"}</td>
                    </tr>
                )) : <tr><td colSpan={2} className="text-center">No details available</td></tr>}
            </tbody>
        </table>
    )
}
