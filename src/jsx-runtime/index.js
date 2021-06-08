const HELD = Symbol.for("held");
const TEXTNODE = Symbol.for("textnode");

export function DeferredElement (item) {
    this.item = item;
}

const isProperty = (key) => key !== "children";

export const render = (element, container) => {
    if (element.type === HELD) {
        const output = element.item(element.config);
        (Array.isArray(output) ? output : [output]).forEach((child) => {
            render(child, container);
        })
    } else {
        if (Array.isArray(element)) {
            element.forEach((child) => {
                if (child) {
                    render(child, container);
                }
            })
        } else {
            const dom = element.type === TEXTNODE ? container.ownerDocument.createTextNode("") : container.ownerDocument.createElement(element.type);
            Object.keys(element.props).filter(isProperty).forEach((name) => {
                dom[name] = element.props[name];
            });
            element.props.children.forEach((child) => {
                if (child) {
                    render(child, dom)
                }
            });
            container.appendChild(dom);
        }
    }
}

export const Fragment = ({ children }) => {
    return children;
};

export const jsx = (type, config) => {
    if (type instanceof DeferredElement) {
        return { type: HELD, item: type.item, config }
    }
    if (typeof type === 'function') {
        return type(config);
    }
    const { children = [], ...props } = config;
    const childrenProps = [].concat(children);
    return {
        type,
        props: {
            ...props,
            children: childrenProps.map((child) => {
                return typeof child === "object" ? child : { type: TEXTNODE, props: { nodeValue: child, children: [] } }
            })
        }
    }
}

export const jsxs = jsx;

export default {
    render,
    jsx,
    jsxs: jsx,
    DeferredElement,
    Fragment
}
