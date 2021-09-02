/*------------------------------------------------
        Default Variable For HTML Elements.
--------------------------------------------------*/
const resultFound = document.getElementById('resultFound');
const createCard = document.getElementById('createCard');
/*---------------------------------------------------------
            Book Data load Function Starts
-----------------------------------------------------------*/
const searchBooks = () => {
    const inputText = document.getElementById('inputValue');
    const inputValue = inputText.value;
    if (inputValue === '') {
        resultFound.innerText = `Please Type Your Search Keywords.`;
        createCard.textContent = '';
    } else {
        document.getElementById('createCard').textContent = '';
        document.getElementById('resultFound').innerText = '';
        inputText.value = '';
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayResult(data));
    }
}
/*---------------------------------------------------------
            Book Data load Function Ends.
-----------------------------------------------------------*/
/*---------------------------------------------------------
            Display Result Function Starts
-----------------------------------------------------------*/
const displayResult = getData => {
    resultFound.innerText = `${getData.numFound} Result Founds;`
    createCard.textContent = '';
    if (getData.numFound === 0) {
        resultFound.innerText = `Nothing Found! in Your Search Keyword.`;
    } else {
        const displayData = getData.docs;
        // for each loop start
        displayData.forEach(data => {
            const imgurL = () => {
                if (data.cover_i) {
                    return `https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg`;
                } else {
                    return "http://dirtydeedsindustries.com/wp-content/uploads/2016/08/placeholder.jpg.png";
                }
            };
            const thumbImg = imgurL();
                    // Creating card div
            const div = document.createElement('div');
            div.classList.add('col-xxl-4','col-xl-4','col-md-4','mt-5','card-deck');
            div.innerHTML = `
            <div class="card card-shadow h-100 p-3 m-3">
                <img style="height: 20rem;" class="img img-fluid" src=${thumbImg}>
                <h4 class="mt-3"><span class="fw-bold">Name:</span> ${data.title.slice(0, 15)}</h4>
                <p class="p-0 mt-1"><span class="fw-bold">Author:</span> ${data.author_name[0]}</p>
                <p class="p-0 mt-1"><span class="fw-bold">Publisher:</span> ${data.publisher.slice(0, 5)}</p>
                <p class="p-0 mt-1"><span class="fw-bold">First Publish Year:</span> ${data.first_publish_year}</p>
            </div>
            `               // Ending card div end
            createCard.appendChild(div);
        });                 // Forach loop end
    }
}
/*---------------------------------------------------------
            Display Result Function Starts
-----------------------------------------------------------*/
/*- - - - - Programming Hero Dynamic API Assignment - - - - - -*/
/*-------------------------------------------------------
      Assignmet-6 Submited By Md Ohidur Rahman.
         Thank You Programming Hero Examiner.
                    Have a Nice Day!
--------------------------------------------------------*/