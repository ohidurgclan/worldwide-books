// function for data fetch from api
const fetchData = async (searchValue) => {
    document.getElementById("resultFound").textContent = "";
    spinnerShow("block");
    containerShow("none");
    try {
        const result = await fetch(
            `https://openlibrary.org/search.json?q=${searchValue}`
        );
        const data = await result.json();

        showData(data);
    } catch (error) {
        spinnerShow("none");
        document.getElementById("createCard").innerHTML = `
    <h3 class='text-light'>No Data Found</h3>
    `;
    }
};

// function for receving search key word by clicking search button
document.getElementById('button-addon2').addEventListener("click", () => {
    const searchValue = document.getElementById("inputValue").value;
    fetchData(searchValue);

    document.getElementById("inputValue").value = "";
});

// function for showing api data in ui
const showData = (bookData) => {
    document.getElementById(
        "resultFound"
    ).innerText = `Total Book: ${bookData.numFound}`;

    const container = document.getElementById("createCard");
    container.textContent = "";

    if (bookData.docs.length === 0) {
        container.innerHTML = `
      <h5 class="text-primary">Nothing Found!</h5>
      `;
    }
    bookData.docs.slice(0, 15).forEach((book) => {
        const img = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const alternateImg =
            'http://dirtydeedsindustries.com/wp-content/uploads/2016/08/placeholder.jpg.png';
        const div = document.createElement("div");
        div.innerHTML = `
 <div class="card card-shadow h-100 p-3 m-3"> ${book.cover_i ? ` <img class="img img-fluid h-75" src=${img}>` : `<img class="img img-fluid h-75" src=${alternateImg}>`
            } 
    <h5 class="mt-3"><span class="fw-bold">Name:</span> ${book.title}</h5>
    <p class="mt-3"><span class="fw-bold">Author Name:</span>  ${book.author_name?.[0]} </p>
    <p class="p-0 mt-1"><span class="fw-bold">Publisher:</span> ${book.publisher?.[0]} </p>
    <pclass="p-0 mt-1"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year}</p>
    </div>
    `;
        div.classList.add('col-xxl-12', 'col-xl-12', 'col-md-12', 'mt-5', 'card-deck');
        container.appendChild(div);
    });
    containerShow("block");
    spinnerShow("none");
};

// show spinner function
const spinnerShow = (display) => {
    if (display === "none") {
        document.getElementById("spinner").style.display = "none";
    } else {
        document.getElementById("spinner").style.display = "block";
    }
};

// books container show or not function
const containerShow = (display) => {
    if (display === "none") {
        document.getElementById("createCard").style.display = "none";
    } else {
        document.getElementById("createCard").style.display = "grid";
    }
};