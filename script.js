const allBtn = document.getElementById('all-btn')
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');
let issueCount = document.getElementById('issue-count');
const allCardContainer = document.getElementById('all-card-container');
const spinnerGet = document.getElementById('spinner')



// signin functionality

function signin() {

    const username = document.getElementById('username');
    usernameValue = username.value;

    const password = document.getElementById('password');
    passwordValue = password.value;


    // console.log(usernameValue, passwordValue);

    if (usernameValue === '' || passwordValue === '') {
        alert('Please enter username and password');
        return;

    } else if (usernameValue !== 'admin' || passwordValue !== 'admin123') {

        alert('Incorrect username or password');
        return;
    }

    else {
        alert('Login Successful');
        window.location.assign('./main.html')

    }
}



// issue count 
function countIssue() {

    issueCount.innerText = allCardContainer.children.length;

    // console.log(allCardContainer.children.length)



}



// loading spinner 

function spinner(status) {

    if (status === true) {
        allCardContainer.classList.add('hidden');
        spinnerGet.classList.remove('hidden')

    } else {

        spinnerGet.classList.add('hidden')
        allCardContainer.classList.remove('hidden');

    }
}






// dynamically show open or closed card after clicked 

async function clickedBtn(btnName) {

    spinner(true);

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    const allData = data.data;
    spinner(false);


    if (btnName === 'open') {

        allBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        closedBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        openBtn.classList.add('text-white', 'bg-[#4A00FF]');

        filteredData = allData.filter(item => item.status === 'open');
        displayCard(filteredData);
        countIssue()
    }

    else if (btnName === 'closed') {

        allBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        openBtn.classList.remove('text-white', 'bg-[#4A00FF]')
        closedBtn.classList.add('text-white', 'bg-[#4A00FF]');

        filteredData = allData.filter(item => item.status === 'closed');


        displayCard(filteredData);
        countIssue()
    }

    else {

        closedBtn.classList.remove('text-white', 'bg-[#4A00FF]');
        openBtn.classList.remove('text-white', 'bg-[#4A00FF]')
        allBtn.classList.add('text-white', 'bg-[#4A00FF]');

        displayCard(allData);
        countIssue()
    }





}



// loading all card

async function loadingAllCard() {

    spinner(true);

    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    spinner(false);
    displayCard(data.data);
    // console.log(data)
}


async function displayCard(allData) {

    const allCardContainer = document.getElementById('all-card-container');

    allCardContainer.innerHTML = '';


    allData.forEach((datum) => {

        const createdCard = document.createElement('div');
        createdCard.className = `card-container shadow rounded border-t-4 ${datum.status === 'open' ? 'border-green-500' : 'border-purple-500'}  `;

        createdCard.innerHTML = `

          <!-- card head -->
                <div class=" flex justify-between p-2" onclick="modalShow(${datum.id})">
                    ${datum.status === 'open' ? '<img src="./assets/Open-Status.png" alt=""></img>' : '<img src="./assets/Closed-Status .png" alt=""></img>'}
                    <button class="${datum.priority === 'high' ? 'bg-red-100 text-red-500' : datum.priority === 'medium' ? 'bg-[#FFF8DB] text-[#D97706]' : 'text-[#9CA3AF] bg-[#EEEFF2]'} px-4 rounded-xl  text-[0.8em]">${datum.priority.toUpperCase()}</button>
                </div>


                <!-- card main and labels container -->

              <div class="p-2 " onclick="modalShow(${datum.id})">
                  <!-- card main -->

                <div class="space-y-3 h-[7.5em] ">
                    <p class="text-[0.9em] font-semibold">${datum.title}</p>
                    <p class="text-[0.8em] text-[#64748B]">${datum.description}</p>
                </div>

                <!-- card labels -->

                <div class="flex gap-1 mt-3">
                    ${datum.labels?.[0] ? `<button class="${datum.labels[0].length > 3 ? 'px-1 py-0.2  border-green-300 bg-green-50 text-green-500' : 'px-3 py-0.3 border-red-300  bg-red-50 text-red-500'} text-[0.7em] rounded-2xl border-2 ">${datum.labels[0].toUpperCase()}</button>` : ''}
                    ${datum.labels?.[1] ? `<button class="${datum.labels[1].length > 3 ? 'px-1 py-0.2 ' : 'px-3 py-0.3'} rounded-2xl border-2  border-[#FDE68A] text-[0.7em] bg-[#FFF8DB] text-[#D97706]">${datum.labels[1].toUpperCase()}</button>` : ''}
                </div>

              </div>

                <!-- card footer -->

                 <div class="my-4 border-t-1 border-[#64748B80] p-2 m-2" onclick="modalShow(${datum.id})">
                     <p class="text-[#64748B]">${datum.assignee}</p>
                    <p class="text-[#64748B]">${new Date(datum.createdAt).toLocaleDateString()}</p>
                </div>


        
        ` ;

        allCardContainer.append(createdCard)

    })





}

// displayCard()

loadingAllCard()



// modal function 

async function modalShow(id){

    const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`) ;
    const data =await res.json();
    displayModal(data.data) ;
}   






// display modal 

async function displayModal(details){

    console.log(details)

    const takeDiv = document.getElementById('modal_container') ;

    takeDiv.innerHTML = '' ;

    takeDiv.innerHTML = `

      <!-- modal header -->

            <div class="space-y-4 text-center ">

                <h1 class="font-bold  text-left text-[1.5em]">${details.title}</h1>

                <div class="flex gap-1.5">
                    <button class="rounded-2xl text-[0.8em] text-white ${details.status === 'open'?'bg-[#00A96E]' : 'bg-purple-500' }  px-3 py-1 border-none ">${details.status}</button>
                    <p class=" py-1 text-[0.8em] font-bold text-[#64748B]">•</p>
                    <p class=" py-1 text-[0.8em] text-[#64748B]">Opened by ${details.author}</p>
                    <p class=" py-1 text-[0.8em] font-bold text-[#64748B]">•</p>
                    <p class=" py-1 text-[0.8em] text-[#64748B]">${new Date(details.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>

            <!-- labels -->
            <div class="my-6 flex gap-1">
               ${details.labels?.[0]?  `<button class="${details.labels[0].length > 3? 'px-1 py-0.2  border-green-300 bg-green-50 text-green-500' :  'px-3 py-0.3 border-red-300  bg-red-50 text-red-500' } border-2 text-[0.8em]  rounded-2xl ">${details.labels[0].toUpperCase()}</button>` : '' }
                 ${details.labels?.[1] ? `<button class="${details.labels[1].length > 3 ? 'px-1 py-0.2 ' : 'px-3 py-0.3'} rounded-2xl border-2  border-[#FDE68A] text-[0.7em] bg-[#FFF8DB] text-[#D97706]">${details.labels[1].toUpperCase()}</button>` : ''}

            </div>

            <!-- description -->
             <div>
                <p class="text-[#64748B] text-[0.9em] ">${details.description}</p>
             </div>

             <!-- assignee and priority box -->
              <div class="bg-gray-50 rounded-md p-4 my-4 flex gap-30">

                <div class="">
                    <p class="text-[#64748B] text-[0.8em]">Assignee:</p>
                    <p class="font-semibold text-[0.9em]">${details.author}</p>
                </div>

                <div class="">
                    <p class="text-[#64748B] text-[0.9em] text-center">Priority:</p>
                     <button class="${details.priority === 'high' ? 'bg-red-500 text-white' : details.priority === 'medium' ? 'bg-[#D97706] text-white' : 'text-white bg-gray-500'} px-3 rounded-xl  text-[0.7em]">${details.priority.toUpperCase()}</button>
                </div>
              </div>

               <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>

    
    
    `
    document.getElementById('card_modal').showModal()

    
}



// search function 

document.getElementById('btn-search').addEventListener('click', async () => {


    closedBtn.classList.remove('text-white', 'bg-[#4A00FF]');
    openBtn.classList.remove('text-white', 'bg-[#4A00FF]');
    allBtn.classList.add('text-white', 'bg-[#4A00FF]');

    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    // console.log(searchValue) ;

    if (searchValue.length === 0) {
        alert('Please Search Something');
        return;
    }

    spinner(true)

    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);

    const data = await res.json();

    const allData = data.data;

    spinner(false)

    displayCard(allData);
    countIssue();

})