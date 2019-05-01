// Onpage process

// Filter function 
// Have one argument s
// If s is false this function is use in manager page
// Else it use in s-manager page
function filter(s = false) {
  // Get search term
  let search = document.getElementById("search");
  let filterTerm = search.value.toUpperCase();

  // Filter result by search term
  let filtered = employees.filter(e =>
    e.Ho_ten.toUpperCase().includes(filterTerm)
  );

  // Filter by department (s is true - this function use in s-manager page)
  if (s) {
    let department = document.querySelector('input[name="department"]:checked')
      .value;
    if (department != "all") {
      filtered = filtered.filter(e => e.Don_vi == department);
    }
  }

  // Create table contains filtered content
  let tbody = document.getElementById("listBody");
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  for (let i = 0; i < filtered.length; i++) {
    let tr = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.setAttribute("scope", "col");
    th1.innerText = i + 1;

    let span = document.createElement("span");
    span.setAttribute("class", "text-capitalize");
    span.innerText = filtered[i].Ho_ten;

    let th2 = document.createElement("th");
    th2.setAttribute("scope", "col");
    th2.appendChild(span);

    tr.appendChild(th1);
    tr.appendChild(th2);

    if (s) {
      let th3 = document.createElement("th");
      th3.setAttribute("scope", "col");
      th3.innerText = filtered[i].Don_vi;
      tr.appendChild(th3);
    }

    let a = document.createElement("a");
    a.setAttribute("href", `./${username}/${password}/${filtered[i].CMND}`);
    a.setAttribute("target", "_blank");
    a.innerText = "Chi tiết";
    let th4 = document.createElement("th");
    th4.setAttribute("scope", "col");
    th4.appendChild(a);

    tr.appendChild(th4);

    tbody.appendChild(tr);
  }
}

// Select display screen - between list screen and stat screen
function fnDisplaySelect(func = "") {
  let list = document.getElementById("list");
  let stat = document.getElementById("stat");

  if (func == "list") {
    list.style.display = "";
    stat.style.display = "none";
  } else {
    list.style.display = "none";
    stat.style.display = "";
  }
}
