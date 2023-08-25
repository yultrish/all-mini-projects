console.log('update.js is working fine')
const params = new URLSearchParams(window.location.search);

window.addEventListener('load', () => {

    
    if(params.has("firstname")){
        const fn = document.querySelector('input#firstname');
        const ln= document.querySelector('input#lastname');
        const email = document.querySelector('input#email');
        
        const school = document.querySelector('input#school');
        
        const contact = document.querySelector('input#contact');
        
       
        //put response into the form input
        fn.value = params.get('firstname');
        ln.value = params.get('lastname');
        email.value = params.get('email');
        school.value = params.get('school');
        contact.value = params.get('contact');
        
        
    }

    const btnUpdate = document.querySelector('.submit-update')
    
    btnUpdate.addEventListener('click', async (e) => {
    e.preventDefault();
    
    console.log('update')
    const fn = document.querySelector('input#firstname').value;
    const ln= document.querySelector('input#lastname').value;
    const email = document.querySelector('input#email').value;
    const school = document.querySelector('input#school').value;
    const contact = document.querySelector('input#contact').value;

    let userId = params.get('id');
    
    const result = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/profile/${userId}`,{
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstname: fn,
            lastname: ln,
            email: email,
            school: school,
            contact: contact,

        })
     })

     const profileUpdated = result;

     if(profileUpdated.status == 200 || profileUpdated.status == 201){
        alert('profile updated successfully..!')
        setTimeout(()=>{
            window.location.href = './users.html'
        }, 1500)
    }

    })  
})

const goBack = document.querySelector('.logout > span')
goBack.addEventListener('click', () => {
    window.location.href = './users.html'
})