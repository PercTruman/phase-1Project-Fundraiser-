document.addEventListener('DOMContentLoaded', ()=>{
    fetch('http://localhost:3000/users')
        .then(res=>res.json())
        .then(data=>console.log(data))
})

const newMemberForm=document.getElementById('new-member-form')
const studentStatsBtn=document.getElementById('student-stats-btn')
const instrumentTotals=document.getElementById('instrumentTotalsBtn')
const donationsRanker=document.getElementById('donationsRanker')


newMemberForm.addEventListener('submit',
    (e)=>{
        let firstNameField=e.target[0].value
        let lastNameField=e.target[1].value
        let emailField=e.target[2].value
        let phoneField=e.target[3].value
        let subcategoryField=e.target[4].value
        
        let memberObject={
            firstname: firstNameField,
            lastname: lastNameField,
            email: emailField,
            phonenumber: phoneField,
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
        body:JSON.stringify(memberObject)sd
})
    .then(res=>res.json())
    .then(member=> alert(member.firstname +` has been successfully added.`))
}