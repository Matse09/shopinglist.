let lists = [
    {
        name: "My List",
        items: []
    }
];

let currentList = 0;


// Save data
function save() {
    localStorage.setItem(
        "shoppingLists",
        JSON.stringify(lists)
    );
}


// Load data
function load() {

    const saved = localStorage.getItem("shoppingLists");

    if (saved) {
        lists = JSON.parse(saved);
    }
}


// Create a new list
function createList() {

    const input = document.getElementById("listName");

    const name = input.value.trim();

    if (name === "") {
        return;
    }

    lists.push({
        name: name,
        items: []
    });

    currentList = lists.length - 1;

    input.value = "";

    save();

    show();
}


// Add an item
function addItem() {

    const input = document.getElementById("itemInput");

    const name = input.value.trim();

    if (name === "") {
        return;
    }

    lists[currentList].items.push({
        name: name,
        completed: false
    });

    input.value = "";

    save();

    show();
}


// Delete an item
function deleteItem(index) {

    lists[currentList].items.splice(index, 1);

    save();

    show();
}


// Complete an item
function completeItem(index) {

    lists[currentList].items[index].completed =
        !lists[currentList].items[index].completed;

    save();

    show();
}


// Select a list
function selectList(index) {

    currentList = index;

    show();
}


// Display everything
function show() {

    const listsContainer =
        document.getElementById("lists");

    const itemsContainer =
        document.getElementById("items");

    const title =
        document.getElementById("currentListName");


    listsContainer.innerHTML = "";

    itemsContainer.innerHTML = "";


    // Show lists
    lists.forEach(function(list, index) {

        const button =
            document.createElement("button");

        button.textContent = list.name;

        button.className = "list-button";


        if (index === currentList) {
            button.classList.add("active");
        }


        button.onclick = function() {
            selectList(index);
        };


        listsContainer.appendChild(button);

    });


    // Show current list name
    title.textContent =
        lists[currentList].name;


    // Show items
    lists[currentList].items.forEach(
        function(item, index) {

            const li =
                document.createElement("li");


            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked =
                item.completed;


            checkbox.onclick = function() {
                completeItem(index);
            };


            const text =
                document.createElement("span");

            text.textContent =
                item.name;


            if (item.completed) {
                text.classList.add("completed");
            }


            const deleteButton =
                document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.className = "delete";


            deleteButton.onclick = function() {
                deleteItem(index);
            };


            li.appendChild(checkbox);

            li.appendChild(text);

            li.appendChild(deleteButton);


            itemsContainer.appendChild(li);

        }
    );
}


// Start the app
load();

show();
