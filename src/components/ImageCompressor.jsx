import React, { useState, useEffect } from 'react'

export default function ImageCompressor() {

    // Get Local data function
    const localdata = () => {
        const data = JSON.parse(localStorage.getItem("t2rDefaultName"));

        return data ? data.defaultName : null
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);
    const [compressSize, setCompressSize] = useState(0);
    const [defaultName, setDefaultName] = useState(() => localdata() || false);

    const [imageData, setImageData] = useState({
        image: {},
        compress: 80,
        format: "webp"
    });
    const [isImageCompress, setImageCompress] = useState(null);

    // Handle image upload
    function handleChange(e) {
        setImageData(preValue => {
            const { name, value, type, files } = e.target
            return { ...preValue, [name]: type === "file" ? files[0] : value }
        }
        )
    }

    // Switch to default or unique name
    function handleName(e) {
        setDefaultName(preValue => !preValue)
    }

    useEffect(() => localStorage.setItem("t2rDefaultName", JSON.stringify({ defaultName })), [defaultName]);

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
    async function handleCompress(e) {
        e.preventDefault();
        setIsLoading(true)
        setImageCompress(null)
        const formData = new FormData();
        formData.append('image', imageData.image);
        formData.append('compress', imageData.compress);
        formData.append('format', 'webp');
        try {
            const response = await fetch('https://image-service-982z.onrender.com/compressor', {
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
            setCompressSize(blob.size)
            return setImageCompress(URL.createObjectURL(blob))
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
    const buttonCss = "inline-flex mt-10 py-2 px-3 text-white text-sm font-semibold rounded-md shadow focus:outline-none " + (!imageData.image.type ? "bg-indigo-400" : "bg-indigo-500")
    return (
        <><div className="px-6 py-5">
            <form>

                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800  hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-indigo-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-900 dark:text-gray-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-800 dark:text-gray-600">SVG, PNG, JPG or GIF (MAX. 20MB)</p>
                        </div>
                        {/* <input id="dropzone-file" type="file" className="hidden" /> */}
                        <input id="dropzone-file" name="image" type="file" onChange={handleChange} className="sr-only" required accept="image/*" />
                    </label>
                </div>
              
                <div className='mt-8 md:w-100 items-center '>
                <label htmlFor='default-name' className='font-bold'>Default Name: </label>
                <input type="checkbox" className="enabled:hover:border-gray-400 mr-5" name="originalName" onChange={handleName} checked={defaultName} />

                    <label htmlFor="default-range" className="font-bold text-sm text-gray-900 ">Compress size: </label>
                    <input name="compress" type="range" value={imageData.compress} onChange={handleChange} min="10" max="100" className="w-1/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer " />
                    <span className=" rounded-lg ml-5 bg-indigo-500 py-2 px-3 text-white text-sm font-medium">{imageData.compress}%</span>
                </div>
                <button className={buttonCss} onClick={handleCompress} disabled={!imageData.image.type}>

                    {isLoading ? <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                        Processing...</> : "Compress"}</button>
            </form>
            {isImageCompress && <div className="pt-5 md:w-1/4 font-medium " ><span>Original size:{byteToMb(imageData.image.size)}</span><br /><span className='inline-flex px-2  mb-2 bg-green-500 text-white rounded-lg'>Compress size: {byteToMb(compressSize)}</span> <div className='relative'>
                <img src={isImageCompress} /><a href={isImageCompress} download={defaultName ? imageData.image.name : Date.now() + imageData.image.name} className='absolute bottom-0 right-0 inline-flex mt-10 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold shadow focus:outline-none' >Download</a></div></div>}
            {isError &&
                message(isError)
            }

        </div> </>
    )
}