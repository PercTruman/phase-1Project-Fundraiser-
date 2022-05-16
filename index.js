document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/users")
    .then((res) => res.json())
    .then((members) => members.forEach((member) => memberArray.push(member)));
});

let memberArray = [];
let showDonations = false;

const newMemberForm = document.getElementById("new-member-form");
const studentStatsInput = document.getElementById("student-stats-input");
const instrumentTotals = document.getElementById("subgroup");
const donationsRankerBtn = document.getElementById("donationsRankerBtn");


const totalDonationsByInstrumentArray = [
  { instrument: "piccolos", total: 0 },
  { instrument: "flutes", total: 0 },
  { instrument: "clarinets", total: 0 },
  { instrument: "bassclarinets", total: 0 },
  { instrument: "dblReeds", total: 0 },
  { instrument: "saxes", total: 0 },
  { instrument: "trumpets", total: 0 },
  { instrument: "horns", total: 0 },
  { instrument: "trombones", total: 0 },
  { instrument: "euphoniums", total: 0 },
  { instrument: "tubas", total: 0 },
  { instrument: "percussion", total: 41 },
  { instrument: "colorguard", total: 0 },
];

newMemberForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let firstNameField = e.target.first_name.value;
  let lastNameField = e.target.last_name.value;
  let emailField = e.target.email.value;
  let phoneField = e.target.phone.value;
  let startingAmountField = e.target.startingAmount.value;
  let subcategoryField = e.target.subgroup.value;

  let memberObject = {
    firstname: firstNameField,
    lastname: lastNameField,
    email: emailField,
    phonenumber: phoneField,
    donations: startingAmountField,
    instrument: subcategoryField,
  };
  postNewMember(memberObject);
});

function postNewMember(memberObject) {
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(memberObject),
  })
    .then((res) => res.json())
    .then((member) =>
      alert(
        `${member.firstname} has been successfully added to the ${member.instrument} section.`
      )
    );
}

studentStatsInput.addEventListener("keypress", (e) => {
  let input = e.target.value.toLowerCase();
  if (e.key === "Enter") {
    searchStudents(input);
  }
});

function searchStudents(input) {
  let foundStudent = memberArray.find(
    (member) => member.lastname.toLowerCase() === input
  );
  foundStudent
    ? displayFoundStudent(foundStudent)
    : alert("Student not found.");
}

function displayFoundStudent(member) {
  let first = member.firstname;
  let last = member.lastname;
  let email = member.email;
  let phone = member.phonenumber;
  let donations = member.donations;

  let statDisplayDiv = document.createElement("div");
  statDisplayDiv.className = "statDisplayDiv";

  let firstnameText = document.createElement("h4");
  firstnameText.innerText = first;

  let lastnameText = document.createElement("h4");
  lastnameText.innerText = last;

  let nameDisplay = firstnameText.innerText + " " + lastnameText.innerText;

  let emailText = document.createElement("h3");
  emailText.innerText = email;

  let phoneText = document.createElement("h3");
  phoneText.innerText = phone;

  let donationText = document.createElement("h3");
  donationText.innerText = donations;

  let closeLink= document.createElement('button');
  closeLink.id ="closeLink"
  closeLink.innerText= "Close Window"

 studentStatsInput.appendChild(statDisplayDiv);
statDisplayDiv.innerHTML = `
             Name: ${nameDisplay}<br>
             Email: ${emailText.innerText}<br>
             Phone: ${phoneText.innerText}<br>
             Total Donations: ${donationText.innerText}
             `;

statDisplayDiv.append(closeLink)
closeLink.addEventListener("click",()=>statDisplayDiv.innerHTML='');
}


let instrumentDonationElement = document.getElementById("instrumentTotalTool");
let instrumentDonations = document.createElement("h2");
instrumentTotals.addEventListener("change", (e) => {
  let selectedInstrument = e.target.value;
  sumTotalByInstrument(selectedInstrument);
});

function sumTotalByInstrument(selectedInstrument) {
  let singleInstrumentArray = memberArray.filter(
    (member) => member.instrument === selectedInstrument
  );
  let donationsArray = [];
  singleInstrumentArray.forEach((obj) =>
    donationsArray.push(parseFloat(obj.donations))
  );
  const initialValue = 0;

  const instrumentTotal = donationsArray.reduce(
    (prevValue, curValue) => prevValue + curValue,
    initialValue
  );
  displayInstrumentTotal(instrumentTotal);
}

function displayInstrumentTotal(instrumentTotal) {
  // donationsRankerBtn.style.display = "none";

  instrumentDonations.innerText = instrumentTotal;
  instrumentDonationElement.after("$ ", instrumentTotal.toFixed(2));
}

donationsRankerBtn.addEventListener("click", () => {
  showDonations = !showDonations;
  if (showDonations) {
    donationsRankerBtn.innerText = "Hide List";
    memberArray.sort((a, b) => b.donations - a.donations);
    memberArray.forEach((member) => {
      let memberHeader = document.createElement("h5");
      memberHeader.innerText = `${member.firstname} ${member.lastname}  $${member.donations}`;
      donationRanker.append(memberHeader);
    });
  } else {
    donationsRankerBtn.innerText = "Show Donations(highest first)";
    document.getElementById('donationRanker').innerHTML =''
 }
});
