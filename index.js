// API  key of Freshdesk converted from binary to ascii
var key = btoa(config_var.API_KEY);
var domain=config_var.DOMAIN;


var ticketCollection = []; // >>>> overall ticket collection

var filteredTicket = []; // >>>> collection of filtered ticket

document.getElementById("allTickets").onclick = () => {
  filteredTicket.splice(0, filteredTicket.length);
  display();
};

// -----invalid ID popup starts------
function popupCall() {
  document.getElementById("popupDiv").style.display = "block";
  document.getElementById("right").style.opacity = "0.4";
  document.getElementsByClassName("left")[0].style.opacity = "0.4";
}
function popupCall2(msg) {
  document.getElementById("popupDiv-2").style.display = "block";
  document.getElementById("msg").innerText = "";
  document.getElementById("msg").innerText = msg;
  document.getElementById("right").style.opacity = "0.4";
  document.getElementsByClassName("left")[0].style.opacity = "0.4";
}

document.getElementById("popCloser").onclick = (e) => {
  e.target.parentElement.style.display = "none";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
  document.getElementById("edit-drawer").style.right = "-100%";
  document.getElementById("add-contact-drawer").style.right = "-100%";
};
document.getElementById("popCloser-2").onclick = (e) => {
  e.target.parentElement.parentElement.style.display = "none";
  document.getElementById("right").style.opacity = "1";
  document.getElementsByClassName("left")[0].style.opacity = "1";
  document.getElementById("edit-drawer").style.right = "-100%";
  document.getElementById("add-contact-drawer").style.right = "-100%";
  document.getElementById("update-contact-drawer").style.right = "-100%";
};

// -----invalid ID popup ends------

// --------- GET request (fetching all tickets) starts-------
function firstFetch() {
  fetch(`https://${domain}.freshdesk.com//api/v2/tickets`, {
    method: "GET",
    headers: { Authorization: "Basic " + key }
  })
    .then((response) => response.json())
    .then((x) => {
      console.log(x);
      ticketCollection.push(...x);
      display();
      console.log("<<<<<<< fetch call for tickets >>>>>>");
    });
}
firstFetch(); // called everytime the page loads

// --------- GET request (fetching all tickets) ends-------

// --------- GET request (filter ticket by ID) starts ----------

function idFetch() {
  var filterform = document.getElementById("FilterForm");

  filterform.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var u = document.getElementById("inputIDfetch").value;
  console.log(u);

  fetch(`https://${domain}.freshdesk.com//api/v2/tickets/${u}`, {
    method: "GET",
    headers: { Authorization: "Basic " + key }
  })
    .then((response) => response.json())
    .then((x) => {
      console.log("FETCHED by ID >>" + u, x);
      filteredTicket.push(x);

      display();
    })
    .catch((error) => {
      console.log("user not found!!", error);
      popupCall();
    });
}

// --------- GET  request (filter ticket by ID) ends ----------

// -------------  create new ticket form handler  starts ----------

function addForm() {
  console.log("fetch only >>>>>", ticketCollection);
  document.getElementById("createTicket").disabled = true;
  document.getElementById("createTicket").style.opacity = "0.7";
  var CreateForm = document.getElementById("add-form");

  CreateForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var allInputs = document.querySelectorAll(
    "#add-form input ,#add-form select,#add-form textarea"
  );

  var newArr = [];
  newArr.push(
    Array.from(allInputs).reduce(
      (acc, init) => ({ ...acc, [init.className]: init.value }),
      {}
    )
  );
  // ------------- POST request ( create new ticket ) starts ----------

  var parameterArr = {
    description: newArr[0].description,
    subject: newArr[0].subject,
    email: newArr[0].email,
    priority: +newArr[0].priority,
    status: +newArr[0].status,
    cc_emails: ["mymail@ymail.com"]
  };

  fetch(`https://${domain}.freshdesk.com//api/v2/tickets`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + key,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(parameterArr)
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("<<<<< post success(ticket created) >>>>>");

      popupCall2("ticket created successfully");
      ticketCollection.unshift(data);
    })
    .then((x) => display()) // refreshing the data display list
    .catch((err) => console.log("ERROR in POST !!!!!", err));

  // ----------POST request (create new ticket) ends--------

  return false;
}

// -------------  create new ticket FORM (by POST ) ends ----------

// ---------- updating ticket form handler starts (right-side-drawer)  ---------

function editForm() {
  console.log("update ticket started >>>>>>");

  var EditForm = document.getElementById("edit-form");

  EditForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  var allInputs = document.querySelectorAll(
    "#edit-form input ,#edit-form select,#edit-form textarea"
  );

  var newArr = Array.from(allInputs).reduce(
    (acc, init) => ({ ...acc, [init.className]: init.value }),
    {}
  );

  let d = new Date();
  var updatedTicket = { ...newArr, due_by: d.toISOString() };

  console.log("UPDATED input TICKET >>>>", updatedTicket);

  // --------PUT request to update ticket  starts------
  var parameter = {
    priority: +updatedTicket.priority,
    status: +updatedTicket.status,
    subject: updatedTicket.subject
  };

  fetch(
    `https://${domain}.freshdesk.com//api/v2/tickets/${+updatedTicket.id}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Basic " + key,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(parameter)
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.errors) {
        alert("invalid credentials");
      } else {
        console.log("<<<<< PUT success(ticket updated) >>>>>");
        popupCall2("ticket updated successfully");
        ticketCollection.push(data);
      }
    })
    .catch((err) => console.log("error in updating ticket", err));

  // --------PUT request to update ticket ends------

  const updateInd = (v) => +v.id === +updatedTicket.id;
  var ind = ticketCollection.findIndex(updateInd);

  ticketCollection.splice(ind, 1, updatedTicket);

  display();

  EditForm.reset();
}

// ---------- updating ticket form handler ends (right-side-drawer)  ---------

//  ------------- DOM for display of response data in HTML starts ------------

function display() {
  if (filteredTicket.length !== 0) {
    displaytickets(filteredTicket);
  } else {
    displaytickets(ticketCollection);
  }

  var delarr = [];

  function selectTicket(ticketSelected) {
    document.getElementById("UpdateFormBtn").value = +ticketSelected;
    console.log(
      "update button value >>>",
      document.getElementById("UpdateFormBtn").value
    );
    document.getElementById("DelBtn").onclick = () => {
      deleteHandle(ticketSelected);
    };
  }
  //    ---------delete handler starts--------
  function deleteHandle(e) {
    if (!delarr.includes(e)) delarr.push(e);

    const deleteInd = (v) => +v.id === e && delarr.includes(+v.id);

    var ind = ticketCollection.findIndex(deleteInd);

    ticketCollection.splice(ind, 1);

    console.log("deleted id >>>", e);
    popupCall2("ticket deleted");

    return displaytickets(ticketCollection);
  }

  //    ---------delete handler ends   -----------

  //----------display of tickets starts ----------

  function displaytickets(x) {
    var display = document.getElementById("ticket-demo");

    display.innerHTML = "";

    var length = x.length;

    // creating tickets card using for loop

    for (var j = 0; j < length; j++) {
      var card = document.createElement("div");
      card.setAttribute("id", "ticket-card");

      var cardleft = document.createElement("div");
      cardleft.setAttribute("id", "ticket-card-left");

      var TicketSelectBtn = document.createElement("button");

      TicketSelectBtn.setAttribute("class", "TicketSelectBtn");
      TicketSelectBtn.value = x[j].id;

      TicketSelectBtn.onclick = (e) => {
        selectTicket(+e.target.value);
        document
          .querySelectorAll(".TicketSelectBtn")
          .forEach((e) => (e.style.backgroundColor = "white"));
        e.target.style.backgroundColor = "rgb(33, 37, 247)";
        e.target.innerHTML = "&#10003;";

        document.getElementById("ticket-ops").style.display = "block";
      };

      var avatar = document.createElement("div");
      avatar.setAttribute("id", "ticket-avatar");
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
      avatar.style.backgroundColor = colorArr[Math.floor(Math.random() * 10)];

      // ------ Ticket details starts-------

      var ticketDetail = document.createElement("div");
      ticketDetail.setAttribute("id", "ticketDetail");

      var subject = document.createElement("p");
      subject.setAttribute("id", "ticket-subject");
      subject.innerText = x[j].subject;

      // Due date calculation starts

      var millisecdiff = Date.parse(x[j].due_by) - Date.parse(new Date());

      var due = Math.round(millisecdiff / (1000 * 3600 * 24));

      // Due date calculation ends

      var OtherDetails = document.createElement("p");
      OtherDetails.setAttribute("id", "ticket-OtherDetails");

      var duedetail = document.createElement("p");
      duedetail.setAttribute("id", "ticket-duedetail");
      duedetail.style.fontSize = "0.8rem";

      duedetail.innerHTML =
        due >= 0
          ? "TYPE- " + x[j].type + "   |   DUE-  Due by " + due + " days"
          : "TYPE- " +
            x[j].type +
            "   |   DUE-  Overdue by " +
            due * -1 +
            " days";



      ticketDetail.append(subject, duedetail, OtherDetails);

      cardleft.append(TicketSelectBtn, avatar, ticketDetail);
      // card left ends

      // card right starts
      var cardright = document.createElement("div");
      cardright.setAttribute("id", "ticket-card-right");

      //  ---------- priority drop starts ---------

      var priorityDrop = document.createElement("select");

      var priorityDropPop = document.createElement("span");
      priorityDropPop.setAttribute("class", "ppops");

      priorityDropPop.innerText = "Priority";

      priorityDrop.setAttribute("id", "priorityDrop");

      var priorityArray = [
        ["Low", 1],
        ["Medium", 2],
        ["High", 3],
        ["Urgent", 4]
      ];

      priorityArray.map((v) => {
        var opt = document.createElement("option");

        opt.innerText = v[0];
        opt.value = +v[1];

        if (+v[1] === +x[j].priority) opt.setAttribute("selected", true);

        return priorityDrop.append(opt);
      });

      //  ---------- group drop starts ---------

      var groupDrop = document.createElement("select");

      var groupDropPop = document.createElement("span");
      groupDropPop.setAttribute("class", "gpops");

      groupDropPop.innerText = "Assign a group or agent";

      var groupArray = [
        "Account managers",
        "Billing",
        "Escalations",
        "Product Management",
        "QA",
        "Replacement",
        "Sales",
        "Shipping and delivery"
      ];

      groupArray.map((v) => {
        var opt = document.createElement("option");
        opt.innerText = v;
        opt.value = v;

        if (v === x[j].group) opt.setAttribute("selected", true);

        return groupDrop.append(opt);
      });

      //  ---------- group drop endss ---------

      //  ----------  status drop starts ---------
      var statusDrop = document.createElement("select");

      var statusDropPop = document.createElement("span");
      statusDropPop.setAttribute("class", "spops");

      statusDropPop.innerText = "Status";

      var statusArray = [
        ["Open", 2],
        ["Pending", 3],
        ["Resolved", 4],
        ["Closed", 5],
        ["Waiting on customer", 6],
        ["Waiting on third party", 7]
      ];

      var newStatus = x[j].status;

      statusArray.map((v) => {
        var opt = document.createElement("option");
        opt.innerText = v[0];
        opt.value = v[1];

        if (v[1] === +newStatus || v[1] === newStatus) {
          opt.setAttribute("selected", true);
        }
        return statusDrop.append(opt);
      });

      //  ----------  status drop ends ---------

      var pIcon = document.createElement("span");
      pIcon.innerHTML = '<i class="fas fa-wave-square drops"></i>';

      var gIcon = document.createElement("span");
      gIcon.innerHTML = '<i class="fas fa-user-plus drops"></i>';

      var sIcon = document.createElement("span");
      sIcon.innerHTML = '<i class="fas fa-ticket-alt drops"></i>';

      var pblock = document.createElement("div");
      pblock.setAttribute("id", "pb");
      var gblock = document.createElement("div");
      gblock.setAttribute("id", "gb");
      var sblock = document.createElement("div");
      sblock.setAttribute("id", "sb");

      pblock.append(pIcon, priorityDrop, priorityDropPop);
      gblock.append(gIcon, groupDrop, groupDropPop);
      sblock.append(sIcon, statusDrop, statusDropPop);

      cardright.append(pblock, gblock, sblock);

      // ------ Ticket details ends-------

      card.append(cardleft, cardright);

      display.append(card);
    }
  }
}
