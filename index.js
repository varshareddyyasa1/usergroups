async function postRequest(postUrl) {
    // Base Url is an assumption
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    try{
        const response = await fetch(postUrl, settings);
        const data = await response.json();
        return await { 'Status': true, 'Data': data };;
    }
    catch(e){
        return await { 'Status': false, 'Data': null };
    }
}

async function createUser(name){
    const baseUrl = "https://api.example.com/";
    const postUrl = `http://${baseUrl}/user/create?name=${name}`;
    try{
        const response = await postRequest(postUrl);
        if (response.Status){
            return await { 'Status': true, 'UserId': response.Data.userId };
        }
        return await { 'Status': false, 'UserId': null };
    }
    catch(e){
        return await { 'Status': false, 'UserId': null };
    }
}

async function addUserToGroup(userid, groupName){
    const baseUrl = "https://api.example.com/";
    const postUrl = `http://${baseUrl}/user/${userid}/addGroup?name=${groupName}`;
    try{
        const response = await postRequest(postUrl);
        return await response.Status;
    }
    catch(e){
        return await false;
    }
}

async function createUserAndAddToGroup(name, groupName){
    const user = await createUser(name);
    if (user.Status){
        const userId = user.UserId;
        return await addUserToGroup(userId, groupName);
    }
    return await false;
}

async function createAllUsers(){
    return await createUserAndAddToGroup("Alice", "Department C") 
        && createUserAndAddToGroup("Bob", "Department C") 
        && createUserAndAddToGroup("Eve", "Department C");
}

function index(){
    createAllUsers().then(status => {
        if (status)
            console.log("Complete");
        else
            console.log("Incomplete");
    })
    .catch(e => {
        console.log("Error: " + e);
    })
}