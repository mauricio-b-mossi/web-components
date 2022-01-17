class MyCounter extends HTMLElement{
    constructor() {
        super();
        console.log(this);
        this.shadow = this.attachShadow({mode: 'open'})
    }

    // Getter, method can be accessed with this.count
    get count() {
        return this.getAttribute('count')
    }

    set count (val) {
        this.setAttribute('count', val)
    }

    // Observe when the attribute 'count' changes
    // In React terms, it is the parenthesis under the useEffect
    static get observedAttributes() {
        return ["count"]
    }

    // If the property changed is equal to 'count', re render.
    // Similar to the useState/useEffect
    attributeChangedCallback(prop, oldValue, newValue) {
        if (prop === 'count') {
            this.render();
            let btn = this.shadow.querySelector('#btn');
            btn.addEventListener('click', this.inc.bind(this))
        }
    }

    inc() {
        this.count++;
    }

    connectedCallback() {
        this.render();
         let btn = this.shadow.querySelector("#btn");
         btn.addEventListener("click", this.inc.bind(this));
        
    }

    // Render gets the value from this.count
    render() {
        // Note that EventHandlers cannot be added directly in innerHTML
        this.shadow.innerHTML = `
        <h1>Counter</h1>
        ${this.count}
        <button id='btn'>Increment</button>
        `
    }
}

customElements.define('my-counter', MyCounter)