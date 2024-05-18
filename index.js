const readlineSync = require("readline-sync");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

function cesarCipher(str, idx) {
    let result = "";
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    for (let letter of str) {
        let index = alphabet.indexOf(letter);
        letter = letter.toLowerCase();
        if (index != -1) {
            let newIndex = (index+idx)%26;
            let newLetter = alphabet[newIndex];
            result += newLetter;
        }
    }

    return result;
}
function registerUser() {
    let username = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");
    let passwordCifrada = cesarCipher(password, 6942069);

    addUser(username,passwordCifrada);
}
function addUser(username, passwordCifrada) {
    let filePath = path.join(__dirname, "users.json");
    let users = [];

    fs.readFile(filePath, (err,data) => {
        if (err) {
            users;
        } else {
            users = JSON.parse(data);
        }
        users.push({username, passwordCifrada});
        fs.writeFile(filePath, JSON.stringify(users,null,), (err) => {
            if (err) {
                console.log("Error adding user");
            } else {
                console.log("User added");
            }
        })
    })
}
function login() {
    let username = readlineSync.question("Enter your name: ");
    let password = readlineSync.question("Enter your password: ");

    const filePath = path.join(__dirname,"users.json");
    fs.readFile(filePath, (err,data) => {
        if (err) {
            console.log("error reading file");
        } else {
            for (let usernames of JSON.parse(data)) {
                if (username === usernames.username &&
                    cesarCipher(password,6942069) === usernames.passwordCifrada) {
                    console.log("\nWelcome",username);
                    return;
                }
            }
            console.log("Wrong username or password");
        }
    })
}

console.log("Welcome, please select an option: ");
console.log("1. login");
console.log("2. create a new user");

let answer =  readlineSync.question(": ");
if (answer == 1) {
    login();
} else if (answer == 2) {
    registerUser();
} else {
    console.log("Error, invalid option");
}