import React, { useState, useEffect } from 'react'
import Upload from './Upload';
import ProgressButton from './ProgressButton';

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

    const compressedFilename = () => { return defaultName ? imageData.image.name.replace(/\.[^/.]+$/, ".webp") : `${Date.now()}_${imageData.image.name.replace(/\.[^/.]+$/, ".webp")}` };

    const reducePercent = (originalSize, compressedSize) => {
        return (((originalSize - compressedSize) / originalSize) * 100).toFixed(2) + "%";
    }
    return (
        <div className="px-6 py-5">
            <form>

                <Upload name="image" uploadFileInfo="SVG, PNG, JPG or GIF (MAX. 20MB)" handleChange={handleChange} acceptFormats="image/*" />

                <div className='mt-8 md:w-100 items-center '>

                    <input type="checkbox" className="enabled:hover:border-gray-400 cursor-pointer" name="originalName" onChange={handleName} checked={defaultName} />
                    <label htmlFor='original-name' className='font-bold mr-5'> Default Name</label>
                    <div className="inline-flex items-center">

                        <label htmlFor="default-range" className="font-bold text-gray-900 mr-2">Compress size:</label>
                        <input name="compress" type="range" value={imageData.compress} onChange={handleChange} min="10" max="100" className="w-1/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                        <span className=" rounded-lg ml-5 bg-indigo-500 py-2 px-3 text-white text-sm font-medium">{imageData.compress}%</span>
                    </div>
                </div>

                <ProgressButton buttonTitle="Compress" handler={handleCompress} disable={!imageData.image.type} isLoading={isLoading}/>

            </form>
            {isImageCompress && <div className="pt-5 md:w-1/4 font-medium p-2 border-solid border-2 border-indigo-500 rounded-md mt-5" >
                <span className='bg-yellow-200 px-2 rounded-lg'>Original size:{byteToMb(imageData.image.size)}</span>
                <br />
                <span className='inline-flex px-2  mb-2 bg-green-500 text-white rounded-lg mt-2'>Compress size: {byteToMb(compressSize)}</span>
                <br />
                <span className='inline-flex px-2  mb-2 bg-indigo-500 text-white rounded-lg'>Reduce Size: {reducePercent(imageData.image.size, compressSize)}</span>

                <div className='relative'>
                    <img src={isImageCompress} /><a href={isImageCompress} download={compressedFilename()} className='absolute bottom-0 right-0 inline-flex mt-10 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold shadow focus:outline-none' >Download</a></div></div>}
            {isError &&
                message(isError)
            }

        </div>
    )
}