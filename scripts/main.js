var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/bear1.gif') {
        myImage.setAttribute('src','images/bear3.gif');
    } else  {
        myImage.setAttribute('src','images/bear1.gif');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h2');

function setUserName() {
    var myName = prompt('Please enter your name.');
    localStorage.setItem('name', myName);
    myHeading.textContent = 'Welcome ' + myName;
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    storedName = localStorage.getItem('name');
    myHeading.textContent = 'Welcome ' + storedName;
}

myButton.onclick = function(){
    setUserName();
}