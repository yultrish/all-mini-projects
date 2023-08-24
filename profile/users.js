window.addEventListener('load', async () => {
    console.log('users js is working')

    const displayUsers = async () => {
        try {
            const result = await fetch('http://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/all-users')
            
            if (result.status === 200 || result.status === 201) {
                const res = await result.json();
                console.log(res);

                const usersContainer = document.querySelector('.container');
                let userData = '';

                res.forEach(user => {
                    userData += `
                    <div class="users">
                    <div class="user">
                        <h3>${user.id}</h3>
                        <h3>${user.firstname} ${user.lastname}</h3>
                        <h3>${user.email}</h3>
                        <h3>${user.school}</h3>
                        <h3>${user.contact}</h3>
                    </div>
                    <div class="icons">
                        <span class="material-symbols-outlined delete-button" data-user-id="${user.id}">
                        delete
                        </span>
                        <span class="material-symbols-outlined edit-button" id="${user.id}">
                        edit_square
                        </span>
                   </div>
                   </div>
                    `;
                });

                usersContainer.innerHTML = userData;
             
                
            }
        } catch (err) {
            console.error(err);
        }
    }

    await displayUsers(); 

    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`https://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/profile/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200 || response.status === 201) {
                console.log('User deleted successfully');
                return true;
            } else {
                console.log('Failed to delete user');
                return false;
            }
        } catch (err) {
            console.error(err);
            return false;
        }
    }    
       //beginning of delete event
                const deleteButtons = document.querySelectorAll('.delete-button');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', async (event) => {
                      const  confirmed = confirm("Are you sure you want to delete this user?");
                        if(confirmed===true){
                              const userId = event.target.getAttribute('data-user-id');
                            const userContainer = event.target.closest('.users'); // parent container for the user element
                            
                           userContainer.classList.add('user-deleting-transition'); //CSS class for the fade-out effect
                            await deleteUser(userId);
                            
                            // 'transitionend' event to remove the element after the fade-out animation completes
                            userContainer.addEventListener('transitionend', () => {
                                userContainer.remove();
                            });

                        }

                    });
                });
                //end of delete event


                //beginning of edit event
                const editBtn = document.querySelectorAll('.edit-button')
                editBtn.forEach((btn)=>{
                    btn.addEventListener('click', async(e)=>{
                        console.log('edit')
                    })
                })
                //end of edit event

    
});








