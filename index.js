document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(members=>members.forEach(member=>memberArray.push(member)))
})

let memberArray =[]

const newMemberForm=document.getElementById('new-member-form')
const studentStatsInput=document.getElementById('student-stats-input')
const instrumentTotals=document.getElementById('instrumentTotalsBtn')
const donationsRanker=document.getElementById('donationsRanker')
const reloadBtn=document.getElementById('refreshBtn').addEventListener('click', ()=>location.reload())


newMemberForm.addEventListener('submit',
    (e)=>{
        let firstNameField=e.target[0].value
        let lastNameField=e.target[1].value
        let emailField=e.target[2].value
        let phoneField=e.target[3].value
        let startingAmountField=e.target[4].value
        let subcategoryField=e.target[4].value
        
        let memberObject={
            firstname: firstNameField,
            lastname: lastNameField,
            email: emailField,
            phonenumber: phoneField,
            donations: startingAmountField,
            instrument: subcategoryField
        }
        postNewMember(memberObject)
    }
)

function postNewMember(memberObject){
    fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
    },
        body:JSON.stringify(memberObject)
})
    .then(res=>res.json())
    .then(member=> alert(member.firstname +` has been successfully added.`))
}

studentStatsInput.addEventListener('keypress', (e)=>{
    let input = e.target.value.toLowerCase()
        if (e.key === 'Enter'){
            searchStudents(input)
        }
    })

function searchStudents(input){
    memberArray.forEach(member=>{
        if (member.lastname.toLowerCase() ===input){
            displayFoundStudent(member)
        }
    })
}

  function displayFoundStudent(member){
      let first = member.firstname
      let last = member.lastname
      let email= member.email
      let phone =member.phonenumber


        donationsRanker.style.display = "none"
        instrumentTotals.style.display ="none"

        let statDisplayDiv = document.createElement('div')
        statDisplayDiv.id = 'statDisplayDiv'

        let firstnameText = document.createElement('h4')
            firstnameText.innerText= first

        let lastnameText = document.createElement('h4')
            lastnameText.innerText= last

        let nameDisplay = firstnameText.innerText + ' ' + lastnameText.innerText

        let emailText=document.createElement('h3')
            emailText.innerText=email

        let phoneText=document.createElement('h3')
            phoneText.innerText=phone
      
        studentStatsInput.append(statDisplayDiv)
            statDisplayDiv.innerHTML = `
            ${nameDisplay}<br>
            ${emailText.innerText}<br>
            ${phoneText.innerText}`
  }