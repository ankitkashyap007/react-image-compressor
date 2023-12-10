export default function PluginInfo({jsonData}) {
    return(<table className="mb-5" border="1">
    <thead>
        <tr>   <th colSpan={2} className="text-2xl">Plugin Information</th>
        </tr>
    </thead>
    <tbody>
        {jsonData && jsonData.pluginInfo && Object.entries(jsonData.pluginInfo).map(([plugin, details], mainIndex) => (
            <>

                <tr className="border-t">
                    <th colSpan={2} className="text-xl pt-5 pb-2">{plugin}</th>
                </tr>

                {details ?

                    Object.entries(details).map(([mainkey, value]) => (

                        Array.isArray(value) ?

                            <tr><td className="py-2 px-4 border-b">{mainkey}</td><td className="py-2 px-4 border-b" > <ul>{value.map(item => <li>{item}</li>)}</ul></td></tr> :

                            typeof value === 'object' ?
                                mainkey === 'tags' ? <tr><td className="py-2 px-4 border-b">{mainkey}</td><td className="py-2 px-4 border-b">{Object.entries(value).map(([key, objectValue]) => <li className="m-1 px-2 py-1 border border-solid border-blue-500 inline-flex" colSpan={2} key={key}>{objectValue}</li>)}</td></tr>
                                    :
                                    Object.entries(value).map(([key, objectValue]) =>
                                        <tr>
                                            <td className="py-2 px-4 border-b" key={key}>{mainkey}</td>
                                            <td className="py-2 px-4 border-b" key={key + "new" }>{key === "description" ?  <div dangerouslySetInnerHTML={{ __html: objectValue }} /> : objectValue }</td>
                                        </tr>
                                    ) :
                                <tr><td className="py-2 px-4 border-b">{mainkey}</td><td className="py-2 px-4 border-b">{value}</td> </tr>

                    )) : <tr><td colSpan={2} className="text-center">No details available</td></tr>}
            </>
        ))}
    </tbody>
</table>)
}