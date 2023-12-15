import React from 'react'

export default function TemplateCard({ template, handler }) {
    const { image, name } = template
    return (
        <div className='w-fit rounded-md bg-white m-2'><img className="p-1" src={image} alt={name} />
            <span className='pl-1'>{name}</span>
            <button onClick={handler} className=' bg-indigo-500 text-white w-full rounded-b-md py-2 px-5 font-bold tracking-wide'>Use</button>
        </div>
    )
}
