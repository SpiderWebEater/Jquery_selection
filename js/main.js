// picking elements from the DOM
let newInput = $("#new-input");
let hamburger = $(".hamburger");
let body = $("body");
let ul = newInput.next();
let tableContent = ul.next();
let firstName = newInput.children().first().next();
let lastName = firstName.next().next();
let yearlyAverage = lastName.next().next();
let firstSeAverage = yearlyAverage.next().next();
let secondSeAverage = firstSeAverage.next().next();
let submit = secondSeAverage.next();
let errorMessage = submit.next();
let newStudent = newInput.prev().children(":nth-child(" + 2 + ")").children().children(":nth-child(" + 2 + ")").children();
let wrap = newInput.prev().children(":nth-child(" + 2 + ")");

//global variables
let inputAreas = [firstName, lastName, yearlyAverage, firstSeAverage, secondSeAverage];
let counter = 1;

//function to execute after the document is loaded
$(function () {
    //hamburger menu
    hamburger.on("click", function () {
        wrap[0].classList.toggle("display-property");
    });
    newStudent.on("click", function () {
        wrap[0].classList.toggle("display-property");
    });

    //this would allow the user to submit by pressing "Enter"
    $("html").keydown(function (event) {
        if (event.which === 13)
            submitt();
    });


// function that changes focus from one input field to the next
    for (let i = 0; i < inputAreas.length; i++) {
        inputAreas[i].on("focus", function () {
            $(this).on("keydown", function (event) {
                if (event.keyCode === 38 || event.keyCode === 40)
                    event.preventDefault();
                if (i !== 4 && event.keyCode === 40)
                    inputAreas[i + 1].focus();


                if (i !== 0 && event.keyCode === 38) {
                    inputAreas[i - 1].focus();
                }

            })
        })
    }


    //click Event for NewStudent animation and display
    newStudent.click(function () {
        body[0].classList.toggle("display-property");
        clearInput();

    });


    // all the functions to do after clicking submit
    submit.on("click", function () {
        submitt();
    });


    let arrayFunctionRef = ["first", "last", "yearly", "firstSe", "secondSe"];
    for (let i = 1; i <= 5; i++) {
        let child = ":first-child";
        if (i !== 1) {
            child = `:nth-child(${i})`;
        }
        ul.children(child).click(function () {
            let arr = catching();
            tableContent.children().remove();
            let arr2 = sortWith(arr, arrayFunctionRef[i - 1]);
            recreate(arr2);
        });
    }

});

// function that resets input field when submitt() is called properly
function clearInput() {
    errorMessage.css("display", "none");
    for (let i = 0; i < inputAreas.length; i++) {
        inputAreas[i].css("box-shadow", "none");
        inputAreas[i].val("");
    }
}

//function to execute when submitt() is called and not all the input fields have values
function dontClearInput() {
    errorMessage.html("please fill in all the fields");
    errorMessage.css("display", "block");
    for (let i = 0; i < inputAreas.length; i++) {
        if (inputAreas[i].val() === "")
            inputAreas[i].css("box-shadow", " 0 0 4px red");
        else inputAreas[i].css("box-shadow", "0 0 4px green");
    }
}


//function that capitalizes the first letter of an inputted word
function changeCapital(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}


//function that stores the TableContents list items in an array of objects
function catching() {
    let arr = [];
    for (let i = 0; i < tableContent.children().length; i++) {

        arr[i] = {
            first: tableContent.children(":nth-child(" + (i + 1) + ")").children(":nth-child(1)").text(),
            last: tableContent.children(":nth-child(" + (i + 1) + ")").children(":nth-child(2)").text(),
            yearly: parseInt(tableContent.children(":nth-child(" + (i + 1) + ")").children(":nth-child(3)").text()),
            firstSe: parseInt(tableContent.children(":nth-child(" + (i + 1) + ")").children(":nth-child(4)").text()),
            secondSe: parseInt(tableContent.children(":nth-child(" + (i + 1) + ")").children(":nth-child(5)").text()),
            index: i
        };

    }

    return arr;
}


//function that creates new tableContents list items with the proper sorting already done
function recreate(arr) {
    for (let i = 0; i < arr.length; i++) {
        let newElement = document.createElement("ul");
        newElement.innerHTML = `<li>${arr[i].first}</li><li>${arr[i].last}</li><li>${arr[i].yearly}</li><li>${arr[i].firstSe}</li><li>${arr[i].secondSe}</li>`;
        newElement.classList.add("ul-" + ((1 + i) % 2 + 1));
        tableContent.append(newElement);
    }
}

//function that sorts the array input by given key and updates the index property of the i-th object of the array
function sortWith(arr, key) {
    arr.sort((a, b) => (a[key] >= b[key]) ? 1 : -1);
    for (let i = 0; i < arr.length; i++)
        arr[i].index = i;
    return arr;

}


//function that makes a tableContent list item with the given elements
function submitt() {
    console.log("here");
    if (firstName.val() !== "" && lastName.val() !== "" && yearlyAverage.val() !== "" && firstSeAverage.val() !== "" && secondSeAverage.val() !== "") {

        let newElement = document.createElement("ul");
        newElement.innerHTML = "<li>" + changeCapital(firstName.val()) + "</li><li>" + changeCapital(lastName.val()) + "</li><li>" + parseInt(yearlyAverage.val()) + "</li><li>" +
            parseInt(firstSeAverage.val()) + "</li><li>" + parseInt(secondSeAverage.val()) + "</li>";
        newElement.classList.add("ul-" + (counter % 2 + 1));
        tableContent.append(newElement);
        counter++;
        clearInput();
    } else dontClearInput();
}

