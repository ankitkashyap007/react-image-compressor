import React from 'react'

export default function AuditReport({ report }) {

  const titleClass = (key) => key !=="error" ? "text-center text-xl p-5 border-b bg-green-600 text-white" : "text-center text-xl p-5 border-b bg-red-600 text-white";

  return (
    <div className='tracking-wide my-2'>
      <table>
        <thead>        <tr><th colSpan={2} className='text-2xl py-5'>Audit Report | Powered by AI</th></tr>
        </thead>
        <tbody>
          {
            report ? Object.entries(report).map(([key, value]) => (
              <>
                <tr>
                  <td colSpan={2} className={titleClass(key)}>{key}</td>
                </tr>
                {typeof (value) === "string" ? <div className="px-2 py-4" dangerouslySetInnerHTML={{ __html: value }} /> : Object.entries(value).map(([key, value]) => (<tr className='border-b border-2'>
                  <td className="p-2">{key}</td>
                  <td className="p-2">{value}</td>
                </tr>))}

              </>
            )) : <tr><td colSpan={2}></td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}
