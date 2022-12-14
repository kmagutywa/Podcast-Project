
class Store {
    async loadList() {
        if (this.state.previews.length > 0) {
            return this.update({
                single: null,
                phase: 'list'
            })
        }
        const response = await fetch('https://podcast-api.netlify.app/shows')

        if (!response.ok) {
            return this.update({
                single: null,
                 phase: 'error'
            })
        }

        const data = await response.json()

        return this.update({
            single: null,
            phase: 'list',
            previews: data
        })

    }

    /**
     * @param {string} id
     */
    async loadSingle(id) {

        this.update({
            phase: 'loading'
        })

        if (!id) throw new Error('"id" is required')

        const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)

        if (!response.ok) {
            return this.update({
                phase: 'error'
            })
        }

        const data = await response.json()

        return this.update({
            phase: 'single',
            single: data
        })

    }
    /**
     * @param {Partial<import('./types').state>} newState 
     */
    update(newState) {
        const prevState = { ... this.state }
        const nextState = { ...prevState, ...newState }

        this.subscriptions.forEach((subscriptionFn) => {
            subscriptionFn(nextState)
        })

        this.state = nextState
    }
    /**
     * 
     * @param {import('./types')} subscription 
     */
    subscribe(newSubscription) {
        if (this.subscriptions.includes(newSubscription)) {
            throw new Error('Subscription already exists')
        }
        this.subscriptions.push(newSubscription)
        return {...this.state}

    }
    /**
     * 
     * @param {import('./types')} subscription 
     */

    unsubscribe(newSubscription) {
        if (!this.subscriptions.includes(newSubscription)) {
            throw new Error('Subscription does not exist')

        }

        this.subscriptions = this.subscriptions
            .filter(item => item !== newSubscription)
    }

    constructor() {
        /**
         * @type {import('./types').subscription[]}
         */

        this.subscriptions = []

        /**
        * @type {import('./types').state}
        */
        this.state = {
            phase: 'loading',
            previews: [],
            single: null,

        }
        this.loadList()
    }

}

export const store = new Store()
export default store