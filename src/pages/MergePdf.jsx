import React, { useState, useEffect } from 'react';
import Upload from "../components/Upload"

export default function MergePdf() {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const [mergeSize, setMergeSize] = useState(0);

    const [pdfsData, setPdfsData] = useState([]);
    const [mergeURL, setMergeURL] = useState(null);

    // Handle image upload
    function handleChange(e) {
        const { type, files } = e.target;
        const allFilesArePDF = Array.from(files).every(file =>
            file.type === 'application/pdf'
          );
          if (!allFilesArePDF) return setError('Please select only PDF files.');
           return setPdfsData(files)
    }

    // Byte to KB or MB size converter
    function byteToMb(byte) {
        let size = ""
        console.log(byte)
        if (byte > 1000000) {
            size = (byte / 1024 / 1024).toFixed(2) + " MB"
        }
        else {
            size = (byte / 1024).toFixed(2) + " KB"
        }
        return size
    }

    // Handle Compress image
    async function handleMerge(e) {
        e.preventDefault();
        setIsLoading(true)
        setMergeURL(null)
        const formData = new FormData();
        for (const file of  pdfsData) {
            formData.append('pdfs', file);
          }

        try {
            const response = await fetch('http://localhost:3001/pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {

                const message = await response.json();
                console.log(message.message)
                setIsLoading(false)
                throw new Error(message.message);
            }
            setIsLoading(false)
            // Display the compressed image
            const blob = await response.blob()
            setMergeSize(blob.size)
           setMergeURL(URL.createObjectURL(blob))
            console.log(mergeURL)

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
    const buttonCss = "inline-flex mt-10 py-2 px-3 text-white text-sm font-semibold rounded-md shadow focus:outline-none " + (!pdfsData ? "bg-indigo-400" : "bg-indigo-500")
    return (
        <div className="px-6 py-5">
            <form>

                <Upload name="pdf" uploadFileInfo="PDFs (MAX. 10MB)" handleChange={handleChange} acceptFormats="application/pdf" multiple={true} />
                {
                    pdfsData[0] && <div className='flex flex-wrap pt-5 tracking-wide '> {Array.from(pdfsData).map(({name,size},index) =>{
                     return <div key={name + index} className='flex justify-between bg-indigo-600 text-white rounded-md p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mb-4 mx-2'><span><b>Name: </b>{name}</span> <span className='rounded-md px-2 bg-indigo-800 text-sm'><b>Size: </b>{byteToMb(size)}</span>
                    </div>
                    })} </div>
                }
                <button className={buttonCss} onClick={handleMerge} disabled={isLoading}>

                    {isLoading ? <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                        Processing...</> : "Merge" + (pdfsData.length > 0 ? ` (${pdfsData.length})` :"") }</button>
            </form>
            {mergeURL && <div className="pt-5 md:w-1/4 font-medium " >
                
              <a href={mergeURL} download={Date.now() + ".pdf"} className='inline-flex mt-10 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold shadow focus:outline-none' >Download {byteToMb(mergeSize)}</a></div>}
            {isError &&
                message(isError)
            }
<div className='mt-10 mb-5 bg-blue-50 p-5'>
    <p>Welcome to our PDF Merge website, where simplicity meets efficiency! Seamlessly merge up to 20 PDF files with just one click. Our user-friendly platform empowers you to combine multiple PDF documents into a single, organized file, saving you time and effort.</p>
<h3 className='font-bold mt-2'>
Why choose our PDF Merge tool?</h3>
<ul className='p-2'>
<li>
🚀 Instant Merging: Merge up to 20 PDFs effortlessly in just one click, streamlining your document management process.</li>
<li>
🔒 Secure and Confidential: Rest easy knowing that your data is treated with the utmost security and confidentiality throughout the merging process.</li>
<li>
🌐 Web-Based Convenience: No need for downloads or installations – merge your PDFs directly from your browser, anytime, anywhere.</li>
<li>
🎨 Customization Options: Tailor your merged PDF with various customization options, ensuring the final document meets your unique preferences.</li>
<li>
📈 Boost Productivity: Eliminate the hassle of dealing with multiple files, enhancing your workflow and boosting overall productivity.</li>
</ul>
<p>
Merge PDFs hassle-free and experience the convenience of a one-click solution. Try our PDF Merge tool now and simplify your document management journey!</p></div>
        </div>
        
    )
}