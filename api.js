/**
 * @typedef {object} preview
 * @property {string} id
 * @property {string} title
 * @property {number} seasons
 * @property {string} image
 * @property {string[]} genres
 * @property {string} updated
 */

const listHtml = document.querySelector('#list')

const getData = async() => {
    const response = await fetch('https://podcast-api.netlify.app/shows')
    
    if (!response.ok) {
        listHtml.innerText = 'Something went wrong!'
        return
    }
    /**
     * @type {preview[]}
     */
    const data = await response.json()

    let newHtml = ''

    for (const {title, seasons } of data) {
        newHtml=  `
        ${newHtml} 
           <li>
               <button>${title} </button>
               <span>(${seasons})</span>
          </li> 
        `
    }
listHtml.innerHTML= newHtml

}
    
    getData()
