function filter() {
  let search = document.getElementById("search");
  let filter = search.value.toUpperCase();

  let table = document.getElementById("table");
  let tbody = table.getElementsByTagName("tbody")[0];
  let tr = tbody.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let th = tr[i].getElementsByTagName("th")[1];
    if (th) {
      let txtVal = th.textContent || th.innerText;
      if (txtVal.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}


