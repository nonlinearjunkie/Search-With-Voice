const startSearch = document.querySelector(".search-button");

let attendeesList = document.getElementById("attendees-list");
console.log(attendeesList);



function readText(text) {
    const speaker = new SpeechSynthesisUtterance();
    speaker.volume = 1;
    speaker.rate = 1;
    speaker.pitch = 1;
    speaker.text = text;

    window.speechSynthesis.speak(speaker);



}



function speakSearchedElement() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    var voiceMessage;
    var count = 0;
    recognition.start();
    recognition.onresult = function(event) {
        const nameToBeSearched = event.results[0][0].transcript;
        var nameToBeSearchedLower = nameToBeSearched.toLowerCase();
        console.log(nameToBeSearchedLower);
        let attendeesList = document.getElementsByTagName("tr");
        console.log(attendeesList);
        Array.from(attendeesList).forEach(function(attendee) {
            var attendeeName = attendee.firstChild.textContent;
            console.log(attendeeName);
            if (attendeeName.toLowerCase() == nameToBeSearchedLower) {
                console.log("Found");
                count++;

            } else {
                console.log("Not Found!!");

            }

        })
        if (count > 0) {
            voiceMessage = `Great!! ${nameToBeSearched} is in the list.`

        } else {
            voiceMessage = `${nameToBeSearched} is not in the list. You need to add it to the list.`

        }
        readText(nameToBeSearched);
        readText(voiceMessage);


    }
    console.log("La dami vayo hai!!");

}


startSearch.addEventListener("click", speakSearchedElement);





class attendee {
    constructor(name, address, interest) {
        this.name = name;
        this.address = address;
        this.interest = interest;
    }
}

class UI {
    static displayAtendees() {
        let storedAttendees = [{
                name: "Suraj",
                address: "Kalanki",
                interests: ["ML", "Mathematics", "Musics"]
            },
            {
                name: "XYZ",
                address: "fghh",
                interests: ["jnd", "hfih"]
            }
        ];

        let attendees = storedAttendees;



        attendees.forEach(UI.render);

    }
    static render(atten) {
        let tableBody = document.getElementById("attendees-list");
        let row = document.createElement("tr");
        row.className = "info-rows";
        for (let [key, value] of Object.entries(atten)) {
            let column = document.createElement("td");
            column.innerHTML = `<h6>${value}</h6>`;
            row.appendChild(column);
            //console.log(column.innerHTML);
        }
        let button = document.createElement("button");
        button.innerText = "X";
        button.className = "clearButton";
        row.appendChild(button);
        tableBody.appendChild(row);
        console.log(row);
    };

    static clearFields() {
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("interest").value = "";

    };

    static showErrorMessage() {
        const container = document.querySelector(".container");
        const attendessForm = document.querySelector("#attendees-form");
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger alert-message";
        errorDiv.appendChild(document.createTextNode("Fill all the fields"));
        container.insertBefore(errorDiv, attendessForm);
        console.log(attendessForm);
        setTimeout(() => document.querySelector(".alert-message").remove(), 2000);
    }

    static removeElement(el) {
        console.log(el);

        if (el.className == "clearButton") {
            console.log(el.parentElement);
            el.parentElement.remove();
        }

    };
}


class Storage {
    static addInfo() {

    };

    static getInfo() {

    };

    static deleteInfo() {

    };
}



let form = document.querySelector("#attendees-form");
form.addEventListener("submit", displayAddedItems)

function displayAddedItems(e) {
    e.preventDefault();


    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let interest = document.getElementById("interest").value;

    console.log(name);

    if (name === "" || address === "" || interest === "") {
        UI.showErrorMessage();

    } else {

        let newatendee = new attendee(name, address, interest);

        UI.render(newatendee);
    }

    UI.clearFields();


};


document.querySelector("#attendees-list").addEventListener("click", function(e) {
    UI.removeElement(e.target);

});

document.addEventListener("DOMContentLoaded", UI.displayAtendees);