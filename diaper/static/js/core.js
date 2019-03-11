var loginCallback = function callback(success, response) {
    document.getElementById("lbNotification").style.display = "block";
    if (success) {
        document.getElementById("lbNotification").style.color = "green";
        document.getElementById("lbNotification").innerHTML = "Logged with success! :)";
        document.getElementById("pnlGetDiaper").style.display = "";
        document.getElementById("pnlPostDiapers").style.display = "";
        console.log(response);
        setToken(response.token)
        var email = response.user.email;
        var name = response.user.name;
        if (email.length > 0) {
            document.getElementById("lbUser").innerHTML = email;
        } else {
            document.getElementById("lbUser").innerHTML = name;
        }
    } else {
        document.getElementById("lbNotification").style.color = "red";
        document.getElementById("lbNotification").innerHTML = "Login failed! :(";
        localStorage.removeItem("token")
        document.getElementById("lbUser").innerHTML = "----";
        document.getElementById("pnlGetDiapers").style.display = "none";
        document.getElementById("pnlPostDiapers").style.display = "none";
    }
}

function getToken() {
    return localStorage.getItem("token")
}

function setToken(token) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", "Token " + token);
    } else {
        console.log("No localStorage found")
    }
}

function loginRequest() {
    var url = "../api/login/";

    httpLoginAsync(url, loginCallback, "POST", {username: document.getElementById('txtUsername').value, password: document.getElementById('txtPassword').value})
}

function loginDefaultRequest() {
    var url = "../api/login/";

    httpLoginAsync(url, loginCallback, "POST", {username: "admin", password: "admin"})
}

function getDiaperList(componentToUpdate) {
    var url = "../api/diaper/";

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        } else {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        }
    };

    httpRequestAsync(url, cb, "GET", null)
}

function getDiaperCount(componentToUpdate) {
    var url = "../api/diaper/";

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        } else {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        }
    };
    var search = "";
    var queryType = document.querySelector('input[name="query-type"]:checked').value;
    if (queryType === "size") {
        var list = document.getElementById("inputGetDiaperSize");
        search = list.options[list.selectedIndex].value;
    } else {
        search = document.getElementById("txtGetDiaperModel").value;
    }
    httpRequestAsync(url, cb, "POST", {"query": queryType, "search": search})
}

function getDiaperDetail(componentToUpdate) {
    if (document.getElementById("txtGetDiaperId").value.length === 0) {
        document.getElementById(componentToUpdate).innerHTML = "Id is required";
        return;
    }
    var url = "../api/diaper/" + document.getElementById("txtGetDiaperId").value;

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        } else {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        }
    };

    httpRequestAsync(url, cb, "GET", null)
}

function insertDiaper(componentToUpdate) {
    if (document.getElementById("txtNewDiaperName").value.length === 0) {
        document.getElementById("txtNewDiaperName").style.border = " red 1px solid";
        return
    }
    if (document.getElementById("txtNewDiaperModel").value.length === 0) {
        document.getElementById("txtNewDiaperModel").style.border = " red 1px solid";
        return
    }
    var url = "../api/diaper/";

    var list = document.getElementById("inputNewDiaperSize");
    var diaper = {
        "name": document.getElementById("txtNewDiaperName").value,
        "model": document.getElementById("txtNewDiaperModel").value,
        "size": list.options[list.selectedIndex].value

    };

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        } else {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        }
    };

    httpRequestAsync(url, cb, "PUT", diaper)
}

function updateDiaper(componentToUpdate) {
    var id = document.getElementById("txtUpdateDiaperId").value;
    var name = document.getElementById("txtUpdateDiaperName").value;
    var model = document.getElementById("txtUpdateDiaperModel").value;
    if (id.length === 0) {
        document.getElementById("txtUpdateDiaperId").style.border = " red 1px solid";
        return
    }
    if (name.length === 0) {
        document.getElementById("txtUpdateDiaperName").style.border = " red 1px solid";
        return
    }
    if (model.length === 0) {
        document.getElementById("txtUpdateDiaperModel").style.border = " red 1px solid";
        return
    }
    var url = "../api/diaper/" + id + "/";

    var list = document.getElementById("inputUpdateDiaperSize");
    var diaper = {
        "name": document.getElementById("txtUpdateDiaperName").value,
        "model": document.getElementById("txtUpdateDiaperModel").value,
        "size": list.options[list.selectedIndex].value

    };

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        } else {
            document.getElementById(componentToUpdate).innerHTML = JSON.stringify(response, undefined, 4);
        }
    };

    httpRequestAsync(url, cb, "PUT", diaper)
}

function removeDiaper(componentToUpdate) {
    var id = document.getElementById("txtRemoveDiaperId").value;

    if (id.length === 0) {
        document.getElementById("txtRemoveDiaperId").style.border = " red 1px solid";
        return
    } else {
        document.getElementById("txtRemoveDiaperId").style.border = "";
    }

    var url = "../api/diaper/" + id + "/";

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = "Deleted successfully.";
        } else {
            document.getElementById(componentToUpdate).innerHTML = "Delete operation error.";
        }
    };

    httpRequestAsync(url, cb, "DELETE", null)
}

function removeDiapers(componentToUpdate) {
    var ids = document.getElementById("txtRemoveDiapersId").value.split(",");

    if (document.getElementById("txtRemoveDiapersId").value.length === 0) {
        document.getElementById("txtRemoveDiapersId").style.border = " red 1px solid";
        return
    } else {
        document.getElementById("txtRemoveDiapersId").style.border = "";
    }

    var url = "../api/diaper/";

    var cb = function callback(success, response) {
        if (success) {
            document.getElementById(componentToUpdate).innerHTML = "Deleted successfully.";
        } else {
            document.getElementById(componentToUpdate).innerHTML = "Delete operation error.";
        }
    };

    httpRequestAsync(url, cb, "DELETE", {"diapers": ids})
}

function httpRequestAsync(url, callback, type, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState > 0 && (xmlHttp.status === 200 || xmlHttp.status === 204)) {
            callback(true, JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.readyState > 0 && xmlHttp.status > 204) {
            callback(false, JSON.parse(xmlHttp.responseText));
        }
    }

    xmlHttp.open(type, url, true); // true for asynchronous
    xmlHttp.setRequestHeader("Authorization", getToken());
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    if (data != null) {
        xmlHttp.send(JSON.stringify(data, undefined, 4));
    } else {
        xmlHttp.send(null);
    }
}

function httpLoginAsync(url, callback, type, data) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            callback(true, JSON.parse(xmlHttp.responseText));
        } else if (xmlHttp.readyState > 0 && xmlHttp.status > 204) {
            callback(false, null);
        }
    }
    xmlHttp.open(type, url, true); // true for asynchronous
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(data));
}

document.addEventListener('DOMContentLoaded', function () {
    token = getToken();
    if (token != null) {
        url = "../api/auth/";
        httpRequestAsync(url, loginCallback, "GET", null)
    }
}, false);