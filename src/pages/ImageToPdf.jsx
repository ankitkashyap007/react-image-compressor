import { useState, useEffect } from "react"
import fonts from "../pages/font.js";
import pdfMake from "pdfmake/build/pdfmake";
import ProgressButton from "../components/ProgressButton";
import Upload from "../components/Upload";
import { Link } from "react-router-dom";

pdfMake.vfs = fonts;

const ImageToPdf = ({ mainFormat }) => {

    const formats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "tif", "webp", "gif"]
    console.log(mainFormat)

    // Get Local data function
    const localdata = () => {
        const data = JSON.parse(localStorage.getItem("t2rDefaultName"));

        return data ? data.defaultName : null
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);

    const [imageData, setImageData] = useState({
        image: ""
    });
    const [genPdf, setGenPdf] = useState(null);

    // Handle image upload
    function handleChange(e) {
        const { name, value, type, files } = e.target

        const file = files[0];
        // console.log(file)

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const path = e.target.result;
                console.log(path)
                setImageData(preValue => {
                    return { ...preValue, [name]: type === "file" ? file : value }
                })

            }
            reader.readAsDataURL(file);
        }
    }

    // Byte to KB or MB size converter
    function byteToMb(byte) {
        let size = ""
        if (byte > 1000000) {
            size = (byte / 1024 / 1024).toFixed(2) + " MB"
        }
        else {
            size = (byte / 1024).toFixed(2) + " KB"
        }
        return size
    }

    // Handle Compress image
    async function handlePdfSupport(e) {
        e.preventDefault();
        setIsLoading(true)
        setGenPdf(null)
        const formData = new FormData();
        formData.append('pdf', imageData.image);
        try {
            const response = await fetch('https://image-service-982z.onrender.com/pdf/image-to-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {

                const message = await response.json();
                setIsLoading(false)
                throw new Error(message.message);
            }
            setIsLoading(false)

            const blob = await response.blob()
            return setGenPdf(URL.createObjectURL(blob))
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

    const generatePdf = () => {
        if (imageData.image) {
            const docDefinition = {
                pageSize: 'A4',
                content: [
                    { image: imageData.image, width: 500 },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                        margin: [0, 0, 0, 10],
                    },
                },
                pageMargins: [40, 60, 40, 60],
            };
            try {
                pdfMake.createPdf(docDefinition).open();

            } catch (e) {
                console.log(e)
            }
        } else {
            alert('Please upload an image first.');
        }
    };

    return (
        <div className="px-6 py-5">
            <h2 className='p-5 font-bold text-2xl py-5 tracking-wide'>{mainFormat ? mainFormat.toUpperCase() : 'Image'} to PDF Converter</h2>

            <form>
                <Upload name="image" uploadFileInfo="PNG, JPG (MAX. 20MB)" handleChange={handleChange} acceptFormats="image/*" />

                <ProgressButton buttonTitle="Compress" handler={handlePdfSupport} disable={!imageData.image} isLoading={isLoading} />

            </form>
            {
                genPdf && <div className="pt-5 md:w-1/4 font-medium " >

                    <a href={genPdf} download={Date.now() + ".pdf"} className='inline-flex mt-10 py-2 px-3 bg-indigo-500 text-white text-sm font-semibold shadow focus:outline-none' >Download</a></div>
            }
            {isError &&
                message(isError)
            }
        </div>)
}
export default ImageToPdf;