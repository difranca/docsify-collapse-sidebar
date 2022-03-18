import styles from './styles.css'

let collapse_sidebar = function(hook, vm) {

    // Invoked each time after the data is fully loaded, no arguments
    hook.doneEach(function () {

        let elems = document.querySelectorAll('.sidebar-nav > ul > li');

        for (var i = 0; i < elems.length; i++) {
            console.log(i)
            let parent = elems[i];

            // TODO: Ignores if the element has a link
            // if (parent.children.length > 0) {
            //     continue;
            // }
            
            // Ignores if it has no child
            console.log(parent.children[0].href)
            if (parent.children[0].children.length == 0 || parent.children[0].href !== undefined) {
                console.log('skip');
                continue;
            }

            let index = i + 1;
            let children = document.querySelector('.sidebar-nav > ul > li:nth-child(' + index + ') > ul');

            // Verifies if any child is opened
            const current_url = RegExp("#.*").exec(window.location.href);
            const query = ".sidebar-nav > ul > li:nth-child(" + index + ") > ul [href='" + current_url + "']"
            const is_opened = document.querySelector(query)

            // Sets class for opened and closed items
            // if (!is_opened) {
            //     children.style.display = "none";
            //     parent.className = 'SideBarCollapse-ItemClosed';
            // } else {
            //     parent.className = 'SideBarCollapse-ItemOpened';
            // }

            // Creates link for parent items
            // var node = document.createElement("a");
            // node.innerText = parent.firstChild.data;
            // node.href = "javascript:void(0)";
            // parent.firstChild.data = "";
            // parent.prepend(node);
            let p_node = document.createElement("p");
            let a_node = document.createElement("a");
            a_node.innerText = parent.firstChild.data;
            a_node.href = "javascript:void(0)";
            parent.firstChild.data = "";
            p_node.appendChild(a_node);
            parent.prepend(p_node);
            
            if (!is_opened) {
                console.log(children)
                children.style.display = "none";
                p_node.className = 'SideBarCollapse-ItemClosed';
            } else {
                p_node.className = 'SideBarCollapse-ItemOpened';
            }

            // Adds click listener
            p_node.addEventListener('click',
                function () {
                    console.log('click');
                    if (p_node.className === "SideBarCollapse-ItemClosed") {

                        p_node.className = 'SideBarCollapse-ItemOpened';
                        children.style.display = "block";

                    } else if (p_node.classList.contains("SideBarCollapse-ItemOpened")) {

                        p_node.className = 'SideBarCollapse-ItemClosed';
                        children.style.display = "none";
                    }
                }
            );
        }
    });
}

window.$docsify.plugins = [].concat(collapse_sidebar, window.$docsify.plugins)
                                                                                
