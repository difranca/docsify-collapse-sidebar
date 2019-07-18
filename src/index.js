import styles from './styles.css'

$docsify.plugins = [
    function (hook, vm) {

        // Invoked each time after the data is fully loaded, no arguments
        hook.doneEach(function () {

            let indexOpened = [];
            let elems = document.querySelectorAll('.sidebar-nav > ul > li > p ');

            for (i = 0; i < elems.length; i++) {

                let index = i + 1;
                let parent = elems[i];
                let children = document.querySelector('.sidebar-nav > ul > li:nth-child(' + index + ') > ul');

                // Verifies if any child is opened
                currentUrl = RegExp("#.*").exec(decodeURI(window.location.href));
                isOpened = document.querySelector(".sidebar-nav > ul > li:nth-child(" + index + ") > ul [href='" + currentUrl + "']");
                if (isOpened != null) {
                    indexOpened.push(index);
                }

                // Ignores if the element has a link
                if (parent.children.length > 0) {
                    continue;
                }

                // Sets class for opened and closed items
                if (indexOpened.includes(index) == false) {
                    children.className = 'SideBarCollapse-ChildrenHidden';
                    parent.className = 'SideBarCollapse-ItemClosed';
                } else {
                    parent.className = 'SideBarCollapse-ItemOpened';
                }

                // Creates link for parent items
                var node = document.createElement("a");
                node.innerText = parent.innerText;
                node.href = "javascript:void(0)";
                parent.innerText = "";
                parent.appendChild(node);

                // Adds click listener
                parent.addEventListener('click',
                    function () {

                        if (parent.className == "SideBarCollapse-ItemClosed") {

                            parent.className = 'SideBarCollapse-ItemOpened';
                            indexOpened.push(index);
                            children.style.display = "block";

                        } else if (parent.classList.contains("SideBarCollapse-ItemOpened")) {

                            parent.className = 'SideBarCollapse-ItemClosed';
                            indexOpened.pop(index);
                            children.style.display = "none";
                        }
                    }
                );
            }
        });
    }
].concat($docsify.plugins || []);