const ThemeInfo = ({jsonData}) => {
    return(<table className="mb-5" border="1">
    <thead>
        <tr>
            <th colSpan={2} className="text-xl">Theme Information</th>
        </tr>
    </thead>
    <tbody>

        {jsonData && jsonData.themeInfo && Object.entries(jsonData.themeInfo).map(([key, value]) => (
            <tr className="bg-gray-100" key={key}>
                <td className="py-2 px-4 border-b">{key}</td>
                <td className="py-2 px-4 border-b">{Array.isArray(value) ? <ul>{value.map(item => <li>{item}</li>)}</ul> : typeof value === 'object' ? Object.entries(value).map(([key, objectValue]) => <span className="m-1 px-2 py-1 border border-solid border-blue-500 inline-flex" key={key}>{key === "description" ?  <div dangerouslySetInnerHTML={{ __html: objectValue }} /> : objectValue }</span>) : value}</td>
            </tr>
        ))}
    </tbody>
</table>)
}

export default ThemeInfo;