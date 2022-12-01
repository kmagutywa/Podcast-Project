import getAllShows from "./getAllShows.js";
import getSingleShow from "./getSingleShow.js";

const app = document.querySelector('#app')
if (!app) throw new Error('No app element in HTML')

const init = async () => {
    const response = await getAllShows ()
    app.innerHTML = response


}

app.addEventListener('click', async event => {
    const {previewButton} = event.target.dataset

    if (previewButton) {
        app.innerHTML= '<div>Loading...</div>'
       const response = await getSingleShow(previewButton)
       app.innerHTML= response
    }
})

init()

//    const {previewButton, action} = event.target.dataset

//    if (action && action === 'back') {
//        getAllPodcasts()

//        return
//    }
//    if (!previewButton) return

    
//   getSinglePodcast(previewButton)
// })
    
//    getAllPodcasts()


