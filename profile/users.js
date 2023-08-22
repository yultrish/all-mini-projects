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
                        <h3>${user.firstname} ${user.lastname}</h3>
                        <h3>${user.email}</h3>
                        <h3>${user.school}</h3>
                    </div>
                    <div class="icons">
                        <span class="material-symbols-outlined">
                        delete
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

    
});








