import { useState } from "react"
import CardView from "./CardView"
export default function Search({ pageUrls }) {

    const [searchResult, setSearchResult] = useState([]);
    const [searchText, setSearchText] = useState('');
    const handleChange = (e) => {
        const { value } = e.target;
        setSearchText(value);
        const regex = new RegExp(value, "i")

        setSearchResult(
            pageUrls.filter((url) =>
                url.title.match(regex)
            ))
        return

    }

    return (<div className="my-10">
        <h2 className="pt-2 font-bold text-xl text-gray-800">Search</h2>
        <p className="pb-5 text-gray-700">Describe the task you need to complete and we'll suggest tools.</p>
        <input className="rounded-md border border-solid border-2 px-3 py-2 mb-5 text-xl w-full mb-20" type="text" name="site" id="site-url" onChange={handleChange} value={searchText} placeholder="Start your tool search here (e.g., jpg to png, png to pdf)." />
        {searchText && pageUrls && pageUrls[0] && <div className="mt-10 mb-20" >
            <strong className="mb-5 text-xl text-gray-700">Search result:</strong>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-2 rounded-md">
                { searchResult[0] ?
                    searchResult.map(({ title, url }, i) => (<CardView key={i} title={title} url={url} />)) : <div className="col-span-4 py-5 text-center text-xl">No result.</div>
                }</div></div>}
        <hr />
    </div>)
}