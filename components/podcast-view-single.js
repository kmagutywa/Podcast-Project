class Component extends HTMLElement {
    connectedCallback(){
        this.innerHTML = '<div>podcast-view-single</div>'
     }
}

customElements.define('podcast-view-single',Component)