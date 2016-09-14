/*
@Usage  BuildDOM.Create( @Object );

@Object {
    tag : String
    classList : Array
    textContent || innerHTML : String
    dataset : Object
    childrens : Array[@Object]
}
 */
if (typeof BuildDOM === "undefined") {

    var BuildDOM = new class DOMBuilder {
        Create(obj) {
            return this.CreateDOMforElement(obj);
        }
        CreateDOMforElement(obj) {

            // Create the new element
            let box = document.createElement(obj.tag);

            // Append classList
            if (obj.classList) {
                box.classList.add.apply(box.classList, obj.classList);
            }

            // Append text node
            if (obj.textContent) {
                box.textContent = obj.textContent;
            } else if (obj.innerHTML) {
                box.innerHTML = obj.innerHTML;
            }

            // Append dataset
            if (obj.dataset) {
                for (let k in obj.dataset) {
                    box.dataset[k] = obj.dataset[k];
                }
            }

            // Set attributes
            if (obj.attributes) {
                for (let k in obj.attributes) {
                    box.setAttribute(k, obj.attributes[k]);
                }
            }

            // Check and create childrens
            if (obj.childrens) {
                for (let i = 0, len = obj.childrens.length; i < len; i++) {
                    box.appendChild(this.CreateDOMforElement(obj.childrens[i]));
                }
            }

            return box;
        }
        NewDocFrag(...args) {
            let docFrag = document.createDocumentFragment();

            for (let i = 0, len = args.length; i < len; i++) {
                docFrag.appendChild(this.CreateDOMforElement(args[i]));
            }

            return docFrag;
        }
        escapeHtml(text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
    };

}
