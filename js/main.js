// picking elements from the DOM
let tableContent = $("#table-content");
let newInput = $("#new-input");
let firstName = newInput.children().first().next();
let lastName = firstName.next().next();
let yearlyAverage= lastName.next().next();
let firstSeAverage= yearlyAverage.next().next();
let secondSeAverage= firstSeAverage.next().next();
let errorMessage =  $("#error");
let submit = $("#submit");
let newStudent = $("#new-student");
let ul = $("#ul-1");
let burger = $(".hamburger");
let nav = $(".nav-links");
let disp = $(".display");
let navLinks = $(".nav-links li");
//global variables
let counter = 1;

//function to execute after the document is loaded
$(function(){
    //click Event for NewStudent animation
    newStudent.click(function () {
        newInput.toggle(1000).css("display","flex");
    });


   // all the functions to do after clicking submit
   submit.click(function(){
            let inputAreas =[firstName,lastName,yearlyAverage,firstSeAverage,secondSeAverage];
        if(firstName.val() !==""&& lastName.val() !==""&&yearlyAverage.val()!==""&& firstSeAverage.val()!==""&& secondSeAverage.val()!==""){

       let newElement = document.createElement("ul");
       newElement.innerHTML = "<li>" + changeCapital(firstName.val()) +"</li><li>" + changeCapital(lastName.val())+"</li><li>"+parseInt(yearlyAverage.val())+"</li><li>"+
           parseInt(firstSeAverage.val())+"</li><li>"+ parseInt(secondSeAverage.val())+"</li>";
       newElement.classList.add("ul-"+(counter%2+1));
       tableContent.append(newElement);
       counter++;
      errorMessage.css("display","none");
       clearInput();
            for (let i = 0; i <inputAreas.length ; i++) {
                inputAreas[i].css("box-shadow","none");
            }

        }
        else{
            errorMessage.html("please fill in all the fields");
            errorMessage.css("display","block");
            for (let i = 0; i <inputAreas.length ; i++) {
                if(inputAreas[i].val()==="")
                    inputAreas[i].css("box-shadow", " 0 0 4px red");
                else inputAreas[i].css("box-shadow", "0 0 4px green");
            }

        }
   });
    ul.children(":first-child").click(function (){
        let arr=catching();
        tableContent.children().remove();
        let arr2 = sortingFirst(arr);
        recreate(arr2);
        });
    ul.children(":nth-child(2)").click(function () {
        let arr=catching();
        tableContent.children().remove();
        let arr2 = sortingLast(arr);
        recreate(arr2);
    });
    ul.children(":nth-child(3)").click(function () {
        let arr=catching();
        tableContent.children().remove();
        let arr2 = sortingYearly(arr);
        recreate(arr2);
    });
    ul.children(":nth-child(4)").click(function () {
        let arr=catching();
        tableContent.children().remove();
        let arr2 = sortingFirstSe(arr);
        recreate(arr2);
    });
    ul.children(":nth-child(5)").click(function () {
        let arr=catching();
        tableContent.children().remove();
        let arr2 = sortingSecondSe(arr);
        recreate(arr2);
    });
// click event for the hamburger menu

    burger.addEventListener("click",()=>{
        nav.parent.classList.toggle("toggle");
    })


});

// functions
function clearInput() {
    firstName.val("");
    lastName.val("");
    yearlyAverage.val("");
    firstSeAverage.val("");
    secondSeAverage.val("");
}

function changeCapital(name){
    return name.charAt(0).toUpperCase() + name.slice(1);
}

function catching(){
    let arr=[];
    let length = tableContent.children().length;
    for (let i = 0; i <length ; i++) {

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

function recreate (arr){
    for(let i=0; i<arr.length;i++) {
        let newElement = document.createElement("ul");
        newElement.innerHTML = "<li>" + arr[i].first+"</li><li>"+arr[i].last +"</li><li>"+arr[i].yearly+"</li><li>"
            +arr[i].firstSe+"</li><li>"+arr[i].secondSe+"</li>";
        newElement.classList.add("ul-"+((1+i)%2+1));
        tableContent.append(newElement);
    }
}

function sortingFirst(arr){
    arr.sort((a,b)=>(a.first>=b.first)? 1:-1);
    for (let i = 0; i < arr.length ; i++)
        arr[i].index = i;
    return arr;
}
function sortingLast(arr){
    arr.sort((a,b)=>(a.last>=b.last)? 1:-1);
    for (let i = 0; i < arr.length ; i++)
        arr[i].index = i;
    return arr;
}
function sortingYearly(arr){
    arr.sort((a,b)=>(a.yearly>=b.yearly)? 1:-1);
    for (let i = 0; i < arr.length ; i++)
        arr[i].index = i;
    return arr;
}
function sortingFirstSe(arr){
    arr.sort((a,b)=>(a.firstSe>=b.firstSe)? 1:-1);
    for (let i = 0; i < arr.length ; i++)
        arr[i].index = i;
    return arr;
}
function sortingSecondSe(arr){
    arr.sort((a,b)=>(a.secondSe>=b.secondSe)? 1:-1);
    for (let i = 0; i < arr.length ; i++)
        arr[i].index = i;
    return arr;
}