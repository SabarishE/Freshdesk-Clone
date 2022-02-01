import {API_KEY,DOMAIN} from "../config.js";

// ---------chart for dashboard starts---------

const labels = [
  0,
  1,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20
];
const data = {
  labels: labels,
  datasets: [
    {
      data: [0, 0, 0, 3, 4, 5, 2, 3, 0, 1, 0, 0, 0, 0, 0, 0],
      backgroundColor: "white",
      borderColor: "#5a8dfc",
      borderWidth: 1,
      pointBorderColor: "#5a8dfc",
      pointBorderWidth: 3,
      pointHoverBorderColor: "#a5c0fc"
    }
  ],
  options: {
    maintainAspectRatio: true,
    responsive: true
  }
};
const config = {
  type: "line",
  data: data,
  options: {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: "white",
        bodyColor: "black",
        borderColor: "black",
        borderWidth: 1,
        titleColor: "black"
      }
    },
    scales: {
      xAxis: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Hours"
        }
      },
      yAxis: {
        grid: {
          display: false
        }
      }
    }
  },
  elements: {
    line: {}
  }
};
var myChart = new Chart(document.getElementById("myChart"), config);

// ---------chart for dashboard ends---------

// -------------left nav-bar functionality starts ---------

document.getElementById("dashboardR").onclick = (e) => {
  document.getElementById("page").innerText = "My Dashboard";
  document.getElementById("dashboardContent").style.display = "block";

  document.getElementById("greyDiv").style.display = "none";
  document.getElementById("contactContent").style.display = "none";
  document.getElementById("ticketByIdDiv").style.display = "none";
  document.getElementById("ticket-ops").style.display = "none";
};

document.getElementById("ticketR").onclick = (e) => {
  document.getElementById("page").innerText = "All tickets";
  document.getElementById("greyDiv").style.display = "block";
  document.getElementById("ticketByIdDiv").style.display = "block";

  document.getElementById("dashboardContent").style.display = "none";
  document.getElementById("contactContent").style.display = "none";
  document.getElementById("formDiv").style.display = "none";
};

document.getElementById("contactR").onclick = (e) => {
  document.getElementById("page").innerText = "All contacts";
  document.getElementById("contactContent").style.display = "block";

  document.getElementById("dashboardContent").style.display = "none";
  document.getElementById("greyDiv").style.display = "none";
  document.getElementById("ticketByIdDiv").style.display = "none";
  document.getElementById("ticket-ops").style.display = "none";
};

// -------------left nav-bar functionality ends ---------

//  -----left side navi-bar toggle starts -----
document.getElementById("tog").onclick = (e) => {
  document.getElementsByClassName("left")[0].removeAttribute("id");
  document.getElementsByClassName("left")[0].setAttribute("id", "active");
};
document.getElementById("menu-close").onclick = (e) => {
  document.getElementsByClassName("left")[0].removeAttribute("id");
  document.getElementsByClassName("left")[0].setAttribute("id", "non-active");
};
//  -----left side nav-bar toggle ends -----

// ------- "new" button click (add ticket FORM starts) --------

document.getElementById("new-select").onchange = (e) => {
  if (e.target.value === "ticket") {
    document.getElementById("formDiv").style.display = "block";
    document.getElementById("greyDiv").style.display = "block";
    document.getElementById("dashboardContent").style.display = "none";
    document.getElementById("contactContent").style.display = "none";
    document.getElementById("ticketByIdDiv").style.display = "block";
    document.getElementById("page").innerText = "New ticket";
    document.getElementById("ticket-ops").style.display = "none";
  } else {
    document.getElementById("add-contact-drawer").style.right = "0";
    document.getElementById("right").style.opacity = "0.4";
    document.getElementsByClassName("left")[0].style.opacity = "0.4";
    document.getElementById("ticket-ops").style.display = "none";
  }
};

document.getElementById("addform-close").onclick = (e) => {
  e.target.parentElement.style.display = "none";
  document.getElementById("page").innerText = "All tickets";
};

document.getElementById("update-contact-drawer-close").onclick = (e) => {
  document.getElementById("update-contact-drawer").style.right = "-100%";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
};
// ------- "new" button click (add ticket FORM ends) --------

// -----------CREATE ticket from reset button starts--------

document.getElementById("resetBtn").onclick = () => {
  document.getElementById("add-form").reset();
  document.getElementById("createTicket").disabled = false;
  document.getElementById("createTicket").style.opacity = "1";
};
// -----------CREATE ticket from reset button ends--------

// ------- UPDATE ticket form  (right drawer DISPLAY starts) ------

document.getElementById("drawer-close-one").onclick = () => {
  document.getElementById("edit-drawer").style.right = "-100%";
  document.getElementById("ticket-ops").style.display = "none";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
};

document.getElementById("drawer-close-two").onclick = () => {
  document.getElementById("edit-drawer").style.right = "-100%";
  document.getElementById("ticket-ops").style.display = "none";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
};

document.getElementById("UpdateFormBtn").onclick = (e) => {
  document.querySelector("#UpdationId").value = +document.getElementById(
    "UpdateFormBtn"
  ).value;

  console.log("ID in form >>>>", document.querySelector("#UpdationId").value);
  console.log(
    "To be sent for updation >>>>>",
    document.getElementById("UpdateFormBtn").value
  );
  document.getElementById("ticket-ops").style.display = "none";
  document.getElementById("edit-drawer").style.right = "0";
  document.getElementById("right").style.opacity = "0.4";
  document.getElementsByClassName("left")[0].style.opacity = "0.4";
};

// ------- UPDATE ticket form (right drawer DISPLAY ends) ------

// -------add contact form (right drawer display starts)------

document.getElementById("contact-drawer-close").onclick = () => {
  document.getElementById("add-contact-drawer").style.right = "-100%";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
};

// -------add contact form (right drawer display ends)------

// ------ dash board date string display starts------
const d = new Date();
document.getElementById("dateString").innerHTML =
  "as of " + d.toDateString() + "   ," + d.toLocaleTimeString();
// ------ dash board date string display ends------
//----------------------------------------------------------------------------------------

function popupCall2(msg) {
  document.getElementById("popupDiv-2").style.display = "block";
  document.getElementById("msg").innerText = "";
  document.getElementById("msg").innerText = msg;
  document.getElementById("right").style.opacity = "0.4";
  document.getElementsByClassName("left")[0].style.opacity = "0.4";
}

// ------CONTACTS DOM STARTS -----------
var key = btoa(API_KEY);
var domain=DOMAIN;

var contactCollection = [];
function fetchContacts() {
  fetch(`https://${domain}.freshdesk.com//api/v2/contacts`, {
    method: "GET",
    headers: { Authorization: "Basic " + key }
  })
    .then((response) => response.json())
    .then((x) => {
      console.log("<<<<<< fetch call for contacts >>>>>>");
      contactCollection.push(...x);
    })
    .then((x) => contactsTable())
    .catch((err) => console.log("error in fetching contacts ", err));
}

fetchContacts();

// -----------CREATE contact from reset button starts--------

document.getElementById("resetBtnc").onclick = () => {
  document.getElementById("contact-add-form").reset();
  document.getElementById("createContact").disabled = false;
  document.getElementById("createContact").style.opacity = "1";
};
// -----------CREATE contact from reset button ends--------

// --------- adding new contact starts-------------
function contactAddForm() {
  document.getElementById("createContact").disabled = true;
  document.getElementById("createContact").style.opacity = "0.7";
  var CreateForm = document.getElementById("contact-add-form");

  CreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var allInputs = document.querySelectorAll("#contact-add-form input ");

  var newArr = [];
  newArr.push(
    Array.from(allInputs).reduce(
      (acc, init) => ({ ...acc, [init.className]: init.value }),
      {}
    )
  );

  var parameterArr = {
    name: newArr[0].name,
    email: newArr[0].email
  };

  console.log(parameterArr);

  fetch(`https://${domain}.freshdesk.com//api/v2/contacts`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parameterArr)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert("invalid credentials");
      } else {
        console.log(
          "post success(contact created) >>> , response data >>>>>>",
          data
        );
        contactCollection.unshift(data);
        popupCall2("contact created successfully");
      }
    })
    .then((x) => contactsTable())
    .catch((err) => console.log("ERROR in POST !!!!!", err));

  // ----------POST request (for creating ticket) ends--------
}

// --------- adding new contact ends-------------

// --------- updating a  contact starts-------------

function contactUpdateForm() {
  console.log("contact update alert !!!!!!!!!!");
  var updateForm = document.getElementById("contact-update-form");

  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var id = document.getElementById("UpdationIdContact").value;
  console.log("updation call for ID >>>>", id);
  // -------request -----------

  var allInputs = document.querySelectorAll(
    "#contact-update-form input ,#contact-update-form textarea"
  );

  var newArr = Array.from(allInputs).reduce(
    (acc, init) => ({ ...acc, [init.className]: init.value }),
    {}
  );

  var updatedContact = { ...newArr, due_by: "2021-07-15T14:14:44Z" };

  console.log("input arr >>>>", newArr);

  // --------PUT request to update ticket  starts------
  var parameter = {
    name: newArr.name.split(" ").join(" "),
    job_title: newArr.job_title,
    email: newArr.email
  };


  fetch(`https://${domain}.freshdesk.com//api/v2/contacts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: "Basic " + key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parameter)
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert("invalid credentials");
        console.log("error", data);
      } else {
        console.log(
          "put success(contact updated) >>> , response data >>>>>>",
          data
        );

        popupCall2("contact updated successfully");

        var ind = contactCollection.findIndex((x) => x.id === +id);

        contactCollection.splice(ind, 1, data);
      }
    })
    .then((x) => contactsTable())
    .catch((err) => console.log("error in updating contact", err));

  updateForm.reset();
}
// --------- updating a  contact starts-------------

// -------function for displaying all contacts starts--------

function contactsTable() {
  var tableDiv = document.getElementById("contactTableDiv");
  tableDiv.innerHTML = "";
  var table = document.createElement("table");
  // table.innerHTML = "";

  var header = table.createTHead();

  var headrow = header.insertRow();
  headrow.setAttribute("class", "tableHeader");
  var h1 = headrow.insertCell("0");
  h1.innerText = "Contact";
  var h2 = headrow.insertCell("1");
  h2.innerText = "Title";
  var h3 = headrow.insertCell("2");
  h3.innerText = "Company";
  var h4 = headrow.insertCell("3");
  h4.innerText = "Email";
  var h5 = headrow.insertCell("4");
  h5.innerText = "Work phone";
  var h6 = headrow.insertCell("5");
  h6.innerText = "Facebook";
  var h7 = headrow.insertCell("6");
  h7.innerText = "Twitter";
  var h8 = headrow.insertCell("7");

  contactCollection.forEach((v) => {
    var row = table.insertRow();

    var c1 = row.insertCell(0);

    var contactAvat = document.createElement("button");
    contactAvat.setAttribute("id", "contactAvatar");

    contactAvat.style.display = "inline-block";
    contactAvat.innerText = v.name.charAt(0).toUpperCase();

    var colorArr = [
      "rgb(140, 250, 198)",
      "rgb(238, 177, 162)",
      "rgb(245, 214, 147)",
      "rgb(181, 238, 117)",
      "rgb(166, 250, 243)",
      "rgb(243, 182, 243)",
      "rgb(179, 163, 163)",
      "rgb(175, 161, 252)",
      "rgb(245, 214, 147)",
      "rgb(181, 238, 117)"
    ];
    contactAvat.style.backgroundColor =
      colorArr[Math.floor(Math.random() * 10)];

    c1.style.fontWeight = "bold";

    c1.append(contactAvat, v.name);
    c1.setAttribute("id", "nameHover");

    var c2 = row.insertCell(1);
    c2.innerText = v.job_title == null ? "--" : v.job_title;
    var c3 = row.insertCell(2);
    c3.innerText = "--";
    var c4 = row.insertCell(3);
    c4.innerText = v.email == null ? "--" : v.email;
    var c5 = row.insertCell(4);
    c5.innerText = v.id == null ? "--" : v.id;
    var c6 = row.insertCell(5);
    c6.innerText = v.facebook_id == null ? "--" : v.facebook_id;
    var c7 = row.insertCell(6);
    c7.innerText = v.twitter_id == null ? "--" : v.twitter_id;
    var c8 = row.insertCell(7);
    var editBtn = document.createElement("button");
    editBtn.value = v.id;
    editBtn.innerText = "edit";
    editBtn.setAttribute("class", "contactEditBtn");
    editBtn.onclick = (e) => {
      console.log("edit button click>>", v.id);
      document.getElementById("UpdationIdContact").value = v.id;

      document.getElementById("update-contact-drawer").style.right = "0";
      document.getElementById("right").style.opacity = "0.4";
      document.getElementsByClassName("left")[0].style.opacity = "0.4";
      document.getElementById("ticket-ops").style.display = "none";
    };
    c8.appendChild(editBtn);
  });
  tableDiv.append(table);
}

// ------CONTACTS DOM ENDS -----------
