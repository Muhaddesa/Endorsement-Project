// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://real-time-5c911-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsementList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const endorseListEl = document.getElementById("endorse-list")

addButtonEl.addEventListener('click', function(){
    let inputValue= inputFieldEl.value
    push(endorsementInDB, inputValue)
    clearInputFieldEl()
    //console.log(inputValue)
    
})
onValue(endorsementInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorseListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToEndorseListEl(currentItem)
        }    
    } else {
        endorseListEl.innerHTML = "No items here... yet"
    }
})
function clearEndorseListEl() {
    endorseListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToEndorseListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorseListEl.append(newEl)
}