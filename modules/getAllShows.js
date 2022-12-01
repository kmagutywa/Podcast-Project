/**
 * @typedef {object} preview
 * @property {string} id
 * @property {string} title
 * @property {number} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

/**
 * @returns {Promise<string>}
 */

 export const getAllShows = async() => {
     
     const response = await fetch('https://podcast-api.netlify.app/shows')
     
     if (!response.ok) {
        return '<div>Something went wrong!</div>'
         return
     }
     /**
      * @type {preview[]}
      */
     const data = await response.json()


     const result = data.map(({id, title, seasons}) => {
        return `
            <li>
                <button data-preview-button="${id}">${title} </button>
                <span>(${seasons} seasons )</span>
            </li>
        `
        })

    return result.join('\n')

 
 }

 export default getAllShows