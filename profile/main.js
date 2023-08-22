// ------------------- wait for all element to load -------------------
  $(function () {
  console.log("main javascript file is working");
    
  let initEmail = $("span#email");

  const params = new URLSearchParams(window.location.search);

  if (params.has("email")) {
    
    initEmail.text("");
    // -------- set email to span element --------------
    initEmail.text(params.get("email"));
  } else {
    console.log("The param myParam is not present.");
  }

  //logout
  const logout = document.querySelector(".logout");
  logout.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "../index.html";
  });


  const uploadButton = document.querySelector("div.img-profile div.iconDiv");

  uploadButton.addEventListener("click", function () {
    document.querySelector("input[type=file]").click();
    //path to image file
    $("input[type=file]").on("change", function () {
      var input = this;
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $("#image").attr("src", e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
      }
    });
  });

  setInterval(() => {
    const width = window.innerWidth;

    if (width <= 425) {
      const contactLabel = document.querySelector(
        "div.form-control.contact > label"
      );
      $(contactLabel).text("");
      $(contactLabel).text("Contact");
    }
  }, 4000);

  const changeProfile = document.querySelector(".header span");
  // -------- switch to edit profile---------------
  changeProfile.addEventListener("click", function () {
    const editProfile = document.querySelector(".edit-profile");
    const profileControl = document.querySelector(".profile-control");
    profileControl.classList.remove("d-flex");
    profileControl.classList.add("d-none");

    // -----------  show edit profile --------------
    editProfile.classList.remove("d-none");
    editProfile.classList.add("d-block");

    const editHeader = document.querySelector(".header h3");
    editHeader.style.display = "flex";
  });

  $(".submit-update").click(function  (e) {
    e.preventDefault();

    const editHeader = document.querySelector(".header h3");
    editHeader.style.display = "none";

    // ---------------- get window width ----------------
    const width = window.innerWidth;
    console.log(width);

    if (width <= 425) {
      // alert("Please use a desktop to update your profile");

      const editProfile = document.querySelector(".edit-profile");
      profileInfo = document.querySelector(".profile-control .profile-info");
      // editProfile.style.display = 'none';

      const profileControl = document.querySelector(".profile-control");
      profileControl.style.height = "100vh";
      profileControl.classList.remove("d-none");
      profileControl.classList.add("d-flex");

      // -----------  show edit profile --------------
      editProfile.classList.remove("d-block");
      editProfile.classList.add("d-none");
    }


    //---------------- post data to server -----------------------
 
     (async() =>{
       console.log("self invoking function is working")
//----------- get span data-------------
      let student_name = document.querySelector("span#name");
      let school_left = document.querySelector("#school-left");
      let profile_email = document.querySelector("#email-left");
      let profile_phone = document.querySelector("#contact-left");

       //----------- get form data-------------
       const fn = document.querySelector('input#firstname').value
       const ln = document.querySelector('input#lastname').value
       const school_right = document.querySelector("input#school").value;
      const email_right = document.querySelector("input#email").value;
      const phone_right = document.querySelector("input#contact").value;
      const btn = document.querySelector('.submit')

      if(fn == '' || email == ''){
        alert('please fill all fields')

        return 
      }

      const postData = {
        firstname: fn,
        lastname: ln,
        email: email_right,
        school: school_right,
        contact: phone_right,
      }

        // student_name.innerHTML = `${postData.firstname} ${postData.lastname}`
        //   profile_email.innerHTML = postData.email
        //   school_left.innerHTML = postData.school
        //   profile_phone.innerHTML = postData.contact
        //   console.log(student_name)

      console.log(postData)

      console.log(fn)
      console.log(postData.email)
      
      //------------------ ajax approach ---------------
      // $.ajax({
      //   type: "POST",
      //   url: "http://localhost:8000/api/user",
      //   dataType : "json",
      //   contentType: "application/json; charset=utf-8",
      //   data: JSON.stringify(postData),
      //   success: function (response) {
      //     console.log(response)
      //   }
      // });


    
       try{

            const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify(postData) // Convert user data to JSON string
          };
         const result = await fetch('http://kojoyeboah53i-d962a2da663c.herokuapp.com/api/ordabl/user',requestOptions )//fetch ends here

          let res = await result.json();
          console.log(res)
         
          //  btn.addEventListener('click', ()=>{
          student_name.innerHTML = `${res.firstname} ${res.lastname}`
          school_left.innerHTML = res.email 
          profile_email.innerHTML = res.school
          profile_phone.innerHTML = res.contact
          // console.log(student_name)
          //  })
          

    } catch(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
    
  
     })();

  });

 


  // ------------------- wait for all element to load ends -------------------
});
