var myImage = document.querySelector('img');

myImage.onclick = function() {
    if(typeof this.counter == 'undefined') {
        this.counter = 1;
    }
    ++this.counter;
    //var mySrc = myImage.getAttribute('src');
    if(this.counter == 10) {
        this.counter = 1;
    }
    myImage.setAttribute('src','images/bear' + this.counter + '.gif');

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