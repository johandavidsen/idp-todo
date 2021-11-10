(function () {
    'use strict';
    const tasker = {

        /**
         * This function should not be changed.
         */
        init: function () {
            this.cacheDom();
            this.bindEvents();
            this.evalTaskList();
        },

        /**
         * This function should not be changed.
         */
        cacheDom: function () {
            this.taskInput = document.getElementById("input-task");
            this.addBtn = document.getElementById("add-task-btn");
            this.tasklist = document.getElementById("tasks");
            this.tasklistChildren = this.tasklist.children;
            this.errorMessage = document.getElementById("error");
        },

        /**
         * This function should not be changed.
         */
        bindEvents: function () {
            this.addBtn.onclick = this.addTask.bind(this);
            this.taskInput.onkeypress = this.enterKey.bind(this);
        },

        /**
         * This function should not be changed.
         */
        evalTaskList: function () {
            // Bind Click events to the elements
            for (let i = 0; i < this.tasklistChildren.length; i += 1) {
                // ADD CLICK EVENT TO CHECKBOXES
                let chkBox = this.tasklistChildren[i].getElementsByTagName("input")[0];
                chkBox.onclick = this.completeTask.bind(this, this.tasklistChildren[i], chkBox);
                //ADD CLICK EVENT TO DELETE BUTTON
                let delBtn = this.tasklistChildren[i].getElementsByTagName("button")[0];
                delBtn.onclick = this.removeTask.bind(this, i);
            }
        },

        /**
         * This function should not be changed.
         */
        render: function () {
            // Build HTML
            let li = document.createElement("li");
            li.setAttribute("class", "task py-4 px-2 flex justify-between items-center");
            // Build CHECKBOX
            let checkBox = document.createElement("input");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("class", "border-gray-300 rounded h-5 w-5");
            // Build USER TASK
            let p = document.createElement('p');
            p.setAttribute("class", "w-2/4");
            p.innerHTML = this.taskInput.value
            // Build div
            let div = document.createElement('div');
            div.setAttribute("class", "w-1/4")
            // Build DELETE BUTTON
            let button = document.createElement("button");
            button.setAttribute("class", "flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red");
            button.innerHTML = "Remove";
            div.appendChild(button)
            // Build TRASH ICON
            let trash = document.createElement("i");
            trash.setAttribute("class", "fa fa-trash");
            // Build INSERT TRASH CAN INTO BUTTON
            button.appendChild(trash);

            // Append elements to li
            li.appendChild(checkBox);
            li.appendChild(p);
            li.appendChild(div);

            //ADD TASK TO TASK LIST
            this.tasklist.appendChild(li);
        },

        /**
         * This function should
         *
         * * make sure that the value is not empty. If value is empty you should call the error() function.
         * * else call the render function, reset the value and call the evalTaskList
         *
         */
        addTask: function () {
            let value = this.taskInput.value;
            this.errorMessage.style.display = "none";

            //
            if (value === "") {
                this.error();
            } else {
                this.render();
                this.taskInput.value = "";
                this.evalTaskList();
            }
            //
        },

        /**
         * This function should
         *
         * * Remove the element with the given i from the task list.
         * * Then call the function evalTaskList
         *
         * @param i
         */
        removeTask: function (i) {
            //
            this.tasklist.children[i].remove();
            this.evalTaskList();
            //
        },

        /**
         * This function should
         *
         * * Add a new task, when the user types "enter".
         *
         * @param event
         */
        enterKey: function (event) {
            //
            if (event.keyCode === 13) {
                this.addTask();
            }
            //
        },

        /**
         *
         * @param i
         * @param chkBox
         */
        completeTask: function (i, chkBox) {
            if (chkBox.checked) {
                i.children[1].className = "w-2/4 line-through";
                i.className = "task completed py-4 px-2 flex justify-between items-center";
            } else {
                this.incompleteTask(i);
            }
        },

        /**
         *
         * @param i
         */
        incompleteTask: function (i) {
            i.className = "task py-4 px-2 flex justify-between items-center";
            i.children[1].className = "w-2/4";
        },

        /**
         * This function should not be changed.
         */
        error: function () {
            this.errorMessage.style.display = "block";
        }
    };

    tasker.init();
})();