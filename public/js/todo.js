(function() {

    if (!("Proxy" in window)) {
        console.warn("Your browser doesn't support Proxies.");
        return;
    }

    function Task () {
        this.message = '',
        this.complete = false
    }

    const tasker = {

        /**
         * Dette er listen med opgaver
         */
        tasks: new Proxy([], {
            apply(target, thisArg, argArray) {
                return thisArg[target].apply(this, thisArg);
            },

            deleteProperty(target, p) {
                console.log("Deleted %s", p);
                return true;
            },

            set(target, p, value, receiver) {
                target[p] = value;
                console.log("Set %s to %o", p, value);
                if (typeof value === 'object') {
                    tasker.render()
                    tasker.bindEvents()
                }
                return true;
            }
        }),

        /**
         * Denne funktion skal ikke ændres.
         */
        init: function  () {
            this.cacheDom();
            this.bindEvents();
        },

        /**
         * Denne funktion skal ikke ændres.
         */
        cacheDom: function() {
            this.taskInput = document.getElementById("input-task");
            this.addBtn = document.getElementById("add-task-btn");
            this.tasklist = document.getElementById("tasks");
            this.tasklistChildren = this.tasklist.children;
            this.errorMessage = document.getElementById("error");
        },

        /**
         * Denne funktion skal ikke ændres.
         */
        bindEvents: function() {
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);

            let i, doneBtn, remoteBtn;
            //BIND CLICK EVENTS TO ELEMENTS
            for (i = 0; i < this.tasklistChildren.length; i += 1) {

                doneBtn = this.tasklistChildren[i].getElementsByClassName('done-button')[0];
                doneBtn.onclick = this.toggleTask.bind(this, i);

                //ADD CLICK EVENT TO DELETE BUTTON
                remoteBtn = this.tasklistChildren[i].getElementsByClassName('remove-button')[0];
                remoteBtn.onclick = this.deleteTask.bind(this, i);
            }
        },

        /**
         * Denne funktion skal ikke ændres.
         */
        render: function () {
            let taskLi, p, taskBtnToggle, taskBtnRemove, taskTrsh, path;
            //BUILD HTML
            taskLi = document.createElement("li");
            taskLi.setAttribute("class", "task flex mb-4 items-center");

            // P
            p = document.createElement('p');
            p.setAttribute('class', 'w-full text-grey-darkest')
            p.innerHTML = this.taskInput.value;
            taskLi.appendChild(p);

            // COMPLETE BUTTON
            taskBtnToggle = document.createElement("button");
            taskBtnToggle.setAttribute('class', 'done-button flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red')

            //DELETE BUTTON
            taskBtnRemove = document.createElement("button");
            taskBtnRemove.setAttribute('class', 'remove-button flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green');

            //TRASH ICON
            taskTrsh = document.createElement("svg");
            taskTrsh.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
            taskTrsh.setAttribute('fill', 'none');
            taskTrsh.setAttribute('viewBox', '0 0 24 24');
            taskTrsh.setAttribute('stroke', 'currentColor');
            taskTrsh.setAttribute("class", "h-6 w-6");

            path = document.createElement('path');
            path.setAttribute('stroke-linecap', 'round');
            path.setAttribute('stroke-linejoin', 'round');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('d', 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16')

            taskTrsh.appendChild(path);

            //INSERT TRASH CAN INTO BUTTON
            taskBtnToggle.appendChild(taskTrsh);

            //APPEND ELEMENTS TO TASKLI
            taskLi.appendChild(taskBtnToggle);
            taskLi.appendChild(taskBtnRemove);

            //ADD TASK TO TASK LIST
            this.tasklist.appendChild(taskLi);
        },

        /**
         * Denne funktion skal tilføje en ny opgave til listen.
         */
        addTask: function () {
            this.tasks.push(new Task());
        },

        /**
         * Denne funktion skal når man trykker på enter tilføje en opgave til listen.
         */
        enterKey: function () {},

        /**
         * Denne funktion skal fjerne en opgave fra listen.
         */
        deleteTask: function () {
           this.tasks.splice();
        },

        /**
         * Denne funktion skal markere en opgave som fuldført.
         */
        toggleTask: function () {
            console.log('complete')
        },

        /**
         * Denne function bruges til at vise fejl.
         */
        error: function () {}
    }

    tasker.init();
})();