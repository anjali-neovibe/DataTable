getJson();
countryDisplay();


var allData;
var allCountries;

var btnAdd = document.getElementById("addButton");
var btnEdit = document.getElementById("editButton");
var form = document.querySelector('.form');


//--------------------------------------------
//Get Json Data
function getJson() {
  fetch('data.json')
    .then(function(res){
      return res.json();
    })
    .then(function(datas){      
      allData = datas;
      // console.log(allData);
      display(allData);       
    })
}


//--------------------------------------------
//COUNTRY
const countryID = document.getElementById("countries");
const stateID= document.getElementById("state");

//COUNTRY DISPLAY
function countryDisplay(){
  fetch('subdata.json')
    .then(function(res){
      return res.json();
    })
    .then(function(countries){
      allCountries = countries;
      var cDisplay = '';
      allCountries.forEach(function(country){ 
      cDisplay += `<option value = "${country.name}">${country.name}</option>`;
      })
      countryID.innerHTML = cDisplay;

    })
}


//ON CHANGE COUNTRY & STATE DISPLAY
function countryChange() {
  fetch('subdata.json')
    .then(function(res){
      return res.json();
    })
    .then(function(countries){
      allCountries = countries;
      allCountries.forEach(function(country){

        if (countryID.value == country.name){
          var sDisplay;
          country.states.forEach(function(st){

            sDisplay += `<option value = "${st}">${st}</option>`;
          })
          stateID.innerHTML = sDisplay;
          console.log(sDisplay);
        }
      })

    })
  console.log(countryID.value);
}



//--------------------------------------------
//DISPLAY ALL DATA
function display(allData){
  let output = '';
      allData.forEach(function(data) {
        // console.log(data);
        output += `
          <tr>
            <td>${data.id}</td>
            <td>${data.sal}</td>
            <td>${data.fname}</td>
            <td>${data.lname}</td>
            <td>${data.email}</td>
            <td>${data.gender}</td>
            <td>${data.number}</td>
            <td>${data.country}</td>
            <td>${data.state}</td>
            <td>${data.city}</td>
            <td>${data.date}</td>
            <td><a href="#"><i class="fa fa-edit"></i></a></td>
            <td><a href="#"><i class="fa fa-trash"></i></a></td>
          </tr>
        `;
      })
      document.querySelector('.tbody').innerHTML = output;
}



//--------------------------------------------
//ADD NEW USER 
function add(){
  
  console.log(form.newid.value);
  var newid = form.newid.value;
  var newsal = form.newsal.value;
  var newfname = form.newfname.value;
  var newlname = form.newlname.value;
  var newemail = form.newemail.value;
  var gender = form.gender.value;
  var newnum = form.newnum.value;
  var countries = form.countries.value;
  var states = form.state.value;
  var city = form.city.value;
  var newdate = form.newdate.value;

  allData.push({
    "id" : newid,
    "sal" : newsal,
    "fname" : newfname,
    "lname" : newlname,
    "email" : newemail,
    "gender" : gender,
    "number" : newnum,
    "country" : countries,
    "state" : states,
    "city" : city,
    "date" : newdate
  });
  document.getElementById('newid').value = '';
  document.getElementById('newfname').value = '';
  document.getElementById('newlname').value = '';
  document.getElementById('newemail').value = '';
  document.getElementById('newnum').value = '';
  document.getElementById('city').value = '';
  document.getElementById('newdate').value = '';
  document.getElementById('countries').value = '';
  document.getElementById('state').value = '';
  modal.style.display = "none";
  alert("Sucessfully Added");
  
  console.log(allData);
  display(allData);
}



//REMOVE USER
document.querySelector(".tbody").addEventListener('click', function(e){
  if (e.target.className == "fa fa-trash"){
    var check = confirm("Are You Sure to Delete");
    if(check){
      e.target.parentNode.parentNode.parentNode.remove();
    }
  }
})


//Edit User -  Content Display 
document.querySelector(".tbody").addEventListener('click', function(e){
  if (e.target.className == "fa fa-edit"){
    var check = confirm("Are You Sure to Edit");
    if(check){
      modal.style.display = "block";
      btnAdd.style.display = 'none';
      btnEdit.style.display = 'block';

      var tdTextContents = [];
      var parent = e.target.parentNode.parentNode.parentNode;
      var childern = parent.children;
      for(var i=0; i<childern.length; i++){
        tdTextContents.push(childern[i].textContent);  
      }
      
      newid.value = tdTextContents[0];
      form.newsal.value = tdTextContents[1];
      newfname.value = tdTextContents[2];
      newlname.value = tdTextContents[3];
      newemail.value = tdTextContents[4];
      form.gender.value = tdTextContents[5];
      newnum.value = tdTextContents[6];
      form.countries.value = tdTextContents[7];
      // form.states.value = tdTextContents[8];
      city.value = tdTextContents[9];
      newdate.value = tdTextContents[10];
      document.getElementById('newid').disabled = true;
    }   
  }
})

//Edit User - Update
function edit(){
  console.log("edit");
    allData.forEach(function(data){
      if(data.id == newid.value){
        console.log("Hello");
        data.sal = newsal.value;
        data.fname = newfname.value;
        data.lname = newlname.value;
        data.email = newemail.value;
        data.gender = form.gender.value;
        data.number = newnum.value;
        data.country = countries.value;
        data.state = state.value;
        data.city = city.value;
        data.date = newdate.value;
      }
    })
    modal.style.display = "none";
    alert("Sucessfully Updated");

    document.getElementById('newid').value = '';
    document.getElementById('newfname').value = '';
    document.getElementById('newlname').value = '';
    document.getElementById('newemail').value = '';
    document.getElementById('newnum').value = '';
    // document.getElementById('countries').value = '';
    
    document.getElementById('city').value = '';
    document.getElementById('newdate').value = '';
    document.getElementById('newid').disabled = false;
    form.gender.value = '';
    form.countries.value = '';
    form.state.value = '';
    
    display(allData);
}





//Search bar
function searchFilter() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toLowerCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[2];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toLowerCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}


//Sorting
function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  // var opt = document.getElementById("desc"); 
  var selectBox = document.getElementById("selectBox");
  var selectedValue = selectBox.options[selectBox.selectedIndex].value;
  var selectedId = selectBox.options[selectBox.selectedIndex].id;
  // console.log(selectedId);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[selectedValue];
      y = rows[i + 1].getElementsByTagName("TD")[selectedValue];
      //check if the two rows should switch place:
      if (selectedId =="desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      else {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


//--------------------------------------------
//FORM VALIDATION
document.getElementById('newid').addEventListener('blur', validateID);
// document.getElementById('newsal').addEventListener('blur', validateSal);
document.getElementById('newfname').addEventListener('blur', validateFname);
document.getElementById('newlname').addEventListener('blur', validateLname);
document.getElementById('newemail').addEventListener('blur', validateEmail);
document.getElementById('newnum').addEventListener('blur', validateNumber);
document.getElementById('city').addEventListener('blur', validateCity);

//Validate ID
function validateID() {
  const userID = document.getElementById('newid');
  const re = /^[0-9]{1,6}$/;

  if(!re.test(userID.value)) {
    alert("Please Enter a Valid ID having digits");
    userID.value = '';
  }
  allData.forEach(function(data) {
    if(userID.value == data.id){
      alert("This ID is already used");
      userID.value = '';
    }
  })
}


//Validate Firstname
function validateFname() {
  const firstName = document.getElementById('newfname');
  const re = /^[a-zA-Z]{2,10}$/;

  if(!re.test(firstName.value)) {
    alert("Please Enter a Valid First Name");
    firstName.value = '';
  }
}

//Validate Lastname
function validateLname() {
  const lastName = document.getElementById('newlname');
  const re = /^[a-zA-Z]{2,10}$/;

  if(!re.test(lastName.value)) {
    alert("Please Enter a Valid Last Name");
    lastName.value = '';
  }
}

//Validate Email
function validateEmail() {
  const userEmail = document.getElementById('newemail');
  const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

  if(!re.test(userEmail.value)) {
    alert("Please Enter a Valid Email");
    userEmail.value = '';
  }
  allData.forEach(function(data) {
    if(userEmail.value == data.email){
      alert("This Email is already used");
      userEmail.value = '';
    }
  })
}

//Validate number
function validateNumber() {
  const userNum = document.getElementById('newnum');
  const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

  if(!re.test(userNum.value)) {
    alert("Invalid Phone Number");
    userNum.value = '';
  }
  allData.forEach(function(data) {
    if(userNum.value == data.number){
      alert("This Number is already used");
      userNum.value = '';
    }
  })
}

//Validate City
function validateCity() {
  const userCity = document.getElementById('city');
  const re = /^[a-zA-Z]{2,20}$/;

  if(!re.test(userCity.value)) {
    alert("Please Enter a Valid City");
    userCity.value = '';
  }
}





//--------------------------------------------
// POP UP
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  btnAdd.style.display = 'block';
  btnEdit.style.display = 'none';
  document.getElementById('countries').value = '';
  document.getElementById('newsal').value = '';

}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}