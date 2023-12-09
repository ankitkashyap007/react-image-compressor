import { useEffect, useState } from "react"
import ProgressButton from "../components/ProgressButton";

export default function WpDetector() {

    const [isSite, setSite] = useState("");
    const [jsonData, setJsonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setJsonData({
            "result": {
                "Theme Name": "GeneratePress",
                "Plugins": [
                    "stackable-ultimate-gutenberg-blocks-premium",
                    "makestories-helper",
                    "perfmatters",
                    "gp-premium"
                ],
                "Libraries Info": {
                    "jQuery": null,
                    "Bootstrap": null,
                    "Bulma": null,
                    "Foundation": null,
                    "Tailwind": null
                }
            },
            "themeInfo": {
                "name": "GeneratePress",
                "slug": "generatepress",
                "version": "3.3.1",
                "preview_url": "https://wp-themes.com/generatepress/",
                "author": "edge22",
                "screenshot_url": "//ts.w.org/wp-content/themes/generatepress/screenshot.png?ver=3.3.1",
                "downloaded": 5415496,
                "homepage": "https://wordpress.org/themes/generatepress/",
                "section": {
                    "description": "GeneratePress is a lightweight WordPress theme built with a focus on speed and usability. Performance is important to us, which is why a fresh GeneratePress install adds less than 10kb (gzipped) to your page size. We take full advantage of the block editor (Gutenberg), which gives you more control over creating your content. If you use page builders, GeneratePress is the right theme for you. It is completely compatible with all major page builders, including Beaver Builder and Elementor. Thanks to our emphasis on WordPress coding standards, we can boast full compatibility with all well-coded plugins, including WooCommerce. GeneratePress is fully responsive, uses valid HTML/CSS, and is translated into over 25 languages by our amazing community of users. A few of our many features include 60+ color controls, powerful dynamic typography, 5 navigation locations, 5 sidebar layouts, dropdown menus (click or hover), and 9 widget areas. Learn more and check out our powerful premium version at https://generatepress.com"
                },
                "tags": {
                    "blog": "Blog",
                    "buddypress": "Buddypress",
                    "custom-background": "Custom Background",
                    "custom-colors": "Custom Colors",
                    "custom-header": "Custom Header",
                    "custom-menu": "Custom Menu",
                    "e-commerce": "E-Commerce",
                    "featured-images": "Featured Images",
                    "flexible-header": "Flexible Header",
                    "footer-widgets": "Footer Widgets",
                    "full-width-template": "Full Width Template",
                    "left-sidebar": "Left Sidebar",
                    "one-column": "One Column",
                    "right-sidebar": "Right Sidebar",
                    "rtl-language-support": "RTL Language Support",
                    "sticky-post": "Sticky Post",
                    "theme-options": "Theme Options",
                    "threaded-comments": "Threaded Comments",
                    "three-columns": "Three Columns",
                    "translation-ready": "Translation Ready",
                    "two-columns": "Two Columns"
                }
            },
            "pluginInfo": {
                "stackable-ultimate-gutenberg-blocks-premium": null,
                "makestories-helper": {
                    "name": "MakeStories (for Google Web Stories)",
                    "version": "2.8.0",
                    "author": "<a href=\"https://makestories.io\">MakeStories Team</a>",
                    "author_profile": "https://profiles.wordpress.org/pressmate/",
                    "slug": "makestories-helper",
                    "last_updated": "2023-07-26 5:12pm GMT",
                    "sections": {
                        "description": "<p>MakeStories is a visual drag-drop based editor to create AMP-Stories. This plugin helps you publish your Google Web Stories directly to your WordPress site with one click from your dashboard.</p>\n<p><a href=\"https://www.notion.so/makestories/MakeStories-WordPress-Plugin-Set-Up-Guide-d903e700c9204ef08f9751bb4a101068\" rel=\"nofollow ugc\">For detailed instructions on <strong>Installation and Setup</strong> read this article</a></p>\n"
                    },
                    "tags": {
                        "amp": "amp",
                        "amp-story": "Amp Story",
                        "makestories": "makestories",
                        "stories": "stories",
                        "web-stories": "web stories"
                    }
                },
                "perfmatters": null,
                "gp-premium": null
            }
        })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSite(value)
    }

    const handleSearch = async (e) => {
        const urlMatch = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;

        e.preventDefault();
        if (!isSite) {
            return console.log("Please enter website url.")
        }
        setIsLoading(true)
        const match = isSite.match(urlMatch)[0]

        if (!match) {
            return setIsLoading(false)
        }else{
            try {
                const response = await fetch(`https://image-service-982z.onrender.com/web/wp-detector?site=${isSite}`);
    
                if (response.ok) {
                    setIsLoading(false)
                    const data = await response.json();
                    setJsonData(data)
                    console.log(data);
    
                } else {
                    setIsLoading(false)
                }
            } catch (e) {
                setIsLoading(false)
            }
        }
    }

    return (<div className="px-5">
        <h1 className="font-bold text-2xl mb-5 mt-10">WP Detector</h1>
        <form onSubmit={handleSearch} className="px-5 flex flex-col border border-gray-200 border-2 p-5 mb-10 rounded-md">

            <input className="rounded-md border border-solid border-2 px-3 py-2 mb-5 text-xl w-full" type="text" name="site" id="site-url" value={isSite} onChange={handleChange} placeholder="Website url" disabled={isLoading}/>

            <ProgressButton buttonTitle="Search" isLoading={isLoading} disable={!isSite} />

        </form>
        {jsonData &&
jsonData.result ?       <div className="w-full">
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
                <td className="py-2 px-4 border-b">{ value ? (Array.isArray(value) ? <ul>{value.map(item => <li>{item}</li>)}</ul> : typeof value === 'object' ? <ul className="list-disc">{Object.entries(value).map(([key, objectValue]) => <li key={key}>{key}: {!objectValue ? "N/A" : objectValue }</li>)}</ul> : value) : " na"}</td>
            </tr>
        )) : <tr><td colSpan={2} className="text-center">No details available</td></tr> }
    </tbody>
</table>
<table className="mb-5" border="1">
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
</table>
<table className="mb-5" border="1">
    <thead>
        <tr>   <th colSpan={2} className="text-xl">Plugin Information</th>
        </tr>
    </thead>
    <tbody>
        {jsonData && jsonData.pluginInfo && Object.entries(jsonData.pluginInfo).map(([plugin, details], mainIndex) => (
            <>

                <tr>
                    <th colSpan={2} className="text-xl">{plugin}</th>
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
</table>
</div> :
<div className="border border-solid py-2 px-3">Not a wordpress website</div>
        }
  
    </div>)
}