document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(members=>members.forEach(member=>memberArray.push(member)))

    fetch('http://localhost:3000/donationsByInstrument')
        .then(res=>res.json())
        .then(totals=>totals.forEach(total=totalDonationsByInstrumentArray.push(total.value)) )
})

let memberArray =[]
let totalDonationsByInstrumentArray=[]
let showDonations = false

const newMemberForm=document.getElementById('new-member-form')
const studentStatsInput=document.getElementById('student-stats-input')
const instrumentTotals=document.getElementById('subgroup')
const donationsRankerBtn=document.getElementById('donationsRankerBtn')
const reloadBtn=document.getElementById('refreshBtn').addEventListener('click', ()=>location.reload())

const totalDonationsByInstrument = {
    flutesPiccolos:0,
    clarinetsBassClarinets:0,
    dblReeds:0,
    saxes:0,
    trumpets:0,
    horns:0,
    trombones:0,
    euphoniumsTubas:0,
    percussion:0,
    colorguard:0
}


newMemberForm.addEventListener('submit',
    (e)=>{
        let firstNameField=e.target[0].value
        let lastNameField=e.target[1].value
        let emailField=e.target[2].value
        let phoneField=e.target[3].value
        let startingAmountField=e.target[4].value
        let subcategoryField=e.target[5].value
        
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
      let donations=member.donations


        donationsRankerBtn.style.display = "none"
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

        let donationText=document.createElement('h3')
            donationText.innerText=donations
      
        studentStatsInput.append(statDisplayDiv)
            statDisplayDiv.innerHTML = `
            Name: ${nameDisplay}<br>
            Email: ${emailText.innerText}<br>
            Phone: ${phoneText.innerText}<br>
            Total Donations: ${donationText.innerText}`
  }
      
instrumentTotals.addEventListener('change', (e)=>{
    let selectedInstrument = e.target.value
           sumTotalByInstrument(selectedInstrument)
})
let runningTotal = 0

function sumTotalByInstrument(selectedInstrument){
     memberArray.forEach(member=>{
        if (member.instrument==selectedInstrument){
            console.log('hi')
            runningTotal+=parseInt(member.donations)
           return runningTotal
        }
      
    })
    displayInstrumentTotal(runningTotal)
}

  function displayInstrumentTotal(runningTotal){
        donationsRankerBtn.style.display = "none"

        let instrumentDonationElement= document.getElementById('instrumentTotalTool')
        let instrumentDonations =document.createElement('h2')

        instrumentDonations.innerText=runningTotal
        instrumentDonationElement.append('$ ',instrumentDonations.innerText)
    } 

        donationsRankerBtn.addEventListener('click', ()=>{
            showDonations = !showDonations
            if(showDonations){
                donationsRankerBtn.innerText = "Hide List"
                memberArray.sort((a,b)=> b.donations - a.donations)
                memberArray.forEach(member=>{
                    let memberHeader= document.createElement('h5')
                    memberHeader.innerText=`${member.firstname} ${member.lastname}  $${member.donations}`
                    donationRanker.append(memberHeader)
                })
            } else{
                donationsRankerBtn.innerText = "Show Donations(highest first)"
                location.reload()
            }
        })