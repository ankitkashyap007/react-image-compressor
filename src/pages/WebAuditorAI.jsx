import React, { useState } from 'react'
import ProgressButton from '../components/ProgressButton'
import AuditReport from "../components/WebAuditorAI/AuditReport"

export default function WebAuditorAI() {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(null);

    const [isSite, setSite] = useState("");
    const [jsonData, setJsonData] = useState({
        "seo": {
            "title": "Hindi Me Jankari - HINDIME.NET",
            "description": "Hindi Me Jankari is the Best Hindi Blog in India. We cover Technology Guides, How to Make Money Online, Internet and much more in Hindi Language.",
            "viewport": "width=device-width, initial-scale=1",
            "ogTitle": "Hindi Me Jankari - HINDIME.NET",
            "ogDescription": "Hindi Me Jankari is the Best Hindi Blog in India. We cover Technology Guides, How to Make Money Online, Internet and much more in Hindi Language.",
            "twitterTitle": "Hindi Me Jankari - HINDIME.NET",
            "twitterDescription": "Hindi Me Jankari is the Best Hindi Blog in India. We cover Technology Guides, How to Make Money Online, Internet and much more in Hindi Language."
        },
        "error": {
            "keywords": "Meta keywords Missing.",
            "author": "Missing meta author.",
            "copyright": "Missing meta copyright tag"
        },
        "generativeAi": "<p>&quot;<strong>Category-specific recommendations to improve SEO optimization:</strong><br/><br/>* <strong>Technology:</strong><br/>    * Add more detailed and specific keywords to your title and description tags. For example, instead of &quot;Hindi Me Jankari - HINDIME.NET&quot;, you could use &quot;Hindi Me Jankari - Best Hindi Blog for Technology Guides, How to Make Money Online, and Internet&quot;.<br/>    * Add links to authoritative sources of information on your topic. This will help to build your credibility and authority in the eyes of search engines.<br/>    * Write high-quality, informative content that is well-written and engaging. This will keep users on your site longer and encourage them to come back for more.<br/>    * Promote your content on social media and other channels. This will help to increase your reach and visibility.<br/><br/>* <strong>How to Make Money Online:</strong><br/>    * Use keyword-rich titles and descriptions that accurately reflect the content of your pages.<br/>    * Create a clear and concise call to action that encourages users to take the desired action, such as signing up for your email list or downloading a free guide.<br/>    * Use images and videos to break up your text and make your content more visually appealing.<br/>    * Optimize your pages for speed. A slow-loading website will frustrate users and cause them to leave.<br/><br/>* <strong>Internet:</strong><br/>    * Create a blog or other type of content that provides valuable information to your readers. This will help to establish you as a thought leader in your field and attract new visitors to your site.<br/>    * Link to other relevant websites and resources. This will help to build your credibility and authority.<br/>    * Promote your content on social media and other channels. This will help to increase your reach and visibility.<br/>    * Optimize your pages for speed. A slow-loading website will frustrate users and cause them to leave.<br/><br/>In addition to these category-specific recommendations, here are some general tips for improving your SEO optimization:<br/><br/>* <strong>Use keyword-rich titles and descriptions:</strong> Your title and description tags are some of the most important elements of your SEO optimization. Make sure to include relevant keywords in these tags so that search engines can easily identify what your page is about.<br/>* <strong>Create high-quality content:</strong> The content on your site is the most important factor in determining your search engine ranking. Make sure to create high-quality content that is well-written, informative, and engaging.<br/>* <strong>Optimize your pages for speed:</strong> A slow-loading website will frustrate users and cause them to leave. Make sure to optimize your pages for speed so that users can easily access your content.<br/>* <strong>Promote your content:</strong> Once you've created great content, you need to promote it so that people can find it. Use social media, email marketing, and other channels to promote your content and drive traffic to your site.<br/><br/>By following these tips, you can improve your SEO optimization and attract more visitors to your website.&quot;</p>\n"
    });

    const message = (msg) => {
        setTimeout(() => {
            setError(null);
        }, 4000)
        return (<div className='bg-red-500 rounded-md py-2 px-4 text-white my-5' >{msg}</div>)
    }

    async function handleAudit(e) {
        const urlMatch = /^(https?:\/\/[^/]+)/i;

        e.preventDefault();
        setJsonData(null)
        if (!isSite) {
            return setError("Please enter website url.")
        }
        setIsLoading(true)
        const match = isSite.match(urlMatch);
        if (!match) {
            setError("Please enter website url.")

            return setIsLoading(false)
        } else {
            try {
                const response = await fetch(`https://image-service-982z.onrender.com/web/seo?site=${match[0]}`);
                const data = await response.json();

                if (response.ok) {
                    setIsLoading(false)
                    if(data.message) return setError(data.message)
                    setJsonData(data)
                    console.log(data);

                } else {
                    setIsLoading(false)

                    if(data.message) return setError(data.message)

                }
            } catch (e) {
                setIsLoading(false)
            }
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSite(value)
    }
    return (
        <div className="px-5"><h2 className='font-bold text-2xl py-5 tracking-wide'>Web Auditor AI</h2>

            <form className="px-5 flex flex-col border border-gray-200 border-2 p-5 mb-10 rounded-md">
                <input className="rounded-md border border-solid border-2 px-3 py-2 mb-5 text-xl w-full" type="text" name="site" id="site-url" value={isSite} onChange={handleChange} placeholder="Website url" disabled={isLoading} />
                <ProgressButton buttonTitle="Start" handler={handleAudit} disable={!isSite} isLoading={isLoading} />
            </form>
            <hr />
            {isError &&
                message(isError)
            }
            {jsonData && <AuditReport report={jsonData} />}
        </div>
    )
}
