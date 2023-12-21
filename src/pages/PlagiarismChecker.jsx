import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import ProgressButton from "../components/ProgressButton"

export default function PlagiarismChecker() {

  const [isSite, setSite] = useState("");
  const [jsonData, setJsonData] = useState(null);
  const [isError, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSite(value)
  }
  async function handleSearch(e) {
    e.preventDefault();
    setIsLoading(true)
    const formData = {
      "search": isSite
    }
    try {
      const response = await fetch('https://image-service-982z.onrender.com/cron/plagiarism', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {

        const message = await response.json();
        setIsLoading(false)
        throw new Error(message.message);
      }
      setIsLoading(false)
      const message = await response.json();

      return setJsonData(message)
    } catch (error) {
      setError(error.message)
      setIsLoading(false)
    }
  }
  const message = (msg) => {
    setTimeout(() => {
      setError(null);
    }, 4000)
    return (<div className='bg-red-500 rounded-md py-2 px-4 text-white my-5' >{msg}</div>)
  }
  return (<div className="px-3 py-5">
    <h2 className="py-2 font-bold text-2xl">Plagiarism Checker AI</h2>
    <p className="pb-5">Avoid Penalties, Boost Rankings: Run a quick plagiarism check and write with peace of mind.</p>
    <form action="" method="POST">
      <textarea className="rounded-md border border-solid border-2 px-3 py-2 mb-5 text-xl w-full" type="text" name="site" id="site-url" value={isSite} onChange={handleChange} placeholder="Unlock Plagiarism-Free Content: Paste your text, hit Check, and watch your originality!" disabled={isLoading} rows="10"></textarea>

      <ProgressButton buttonTitle="Search" isLoading={isLoading} disable={!isSite} handler={handleSearch} />
    </form>
    <div className="my-2 px-3 py-2 bg-gray-50">
      <h3 className="pt-5 pb-2 text-xl">Result</h3>
      {
        jsonData && jsonData.details && jsonData.details.map(({ webs, unique, query }) => {

          if (unique) {
            return <div className="border-2 border-green-200 p-2 mt-5 mb-2 rounded-md  bg-white">
              <p className="my-5">{query.replace(/._sysbreak_/g, "")}</p>
              <span className="bg-green-600 text-white tracking-wide px-3 py-1 ">100% Unique</span>

            </div>
          }
          return webs && webs.map(({ title, des, url }) => <div className="border-2 border-red-200 p-2 mt-5 mb-2 rounded-md bg-white">
            <span className="font-bold">{title}</span>
            <p className="my-3">{des}</p>
            <Link to={url} className="text-green-600">{title}</Link>
            <br /> <br />
            <span className="bg-red-600 text-white tracking-wide px-3 py-1 ">Match</span>
          </div>)
        })
      }
    </div>
    {isError &&
      message(isError)
    }

  </div>)
}