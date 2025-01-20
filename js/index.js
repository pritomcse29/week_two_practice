let getAllProducts = (query) => {
    if (!query)
    {
        return; 
    }
    console.log(query);
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(apiUrl)
        .then((r) => r.json())
        .then((data) => {
            console.log(data);
            const container = document.getElementById("card-container");
            container.innerHTML = ""; 
            if (data.meals) {
                showData(data.meals);
            } else {
                container.innerHTML = `<p>No products found for "${query}".</p>`;
            }
        })
        .catch((error) => console.error("Error fetching products:", error));
};

document.getElementById("search-btn").addEventListener("click",()=>{
    const inputText = document.getElementById("input-text").value.trim();
    if(inputText){
        getAllProducts(inputText);
        document.getElementById("input-text").value = "";
    }
   
    
    else{
     alert("Please enter some text.");
    }
 });

const showData = (data) =>{
   
    const container = document.getElementById("card-container");
    container.innerHTML ="";
   
        data.forEach((userData)=>{
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML=`
              <img class="card-img" src="${userData.strMealThumb}" onclick="details('${userData.idMeal}')">
              <h2>${userData.strMeal}</h2>
            
            `;
        container.appendChild(div);
        })
  
}

const details = (id) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(apiUrl)
        .then((r) => r.json())
        .then((data) => {
            if (data.meals) {
                const meal = data.meals[0];
                const container = document.querySelector(".card-containers");
                
                container.innerHTML = `
                  <div class="meal-details">
                      <img class="card-img" src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                      <h2>${meal.strMeal}</h2>
                      <p><strong>Category:</strong> ${meal.strCategory}</p>
                      <p><strong>Area:</strong> ${meal.strArea}</p>
                      <p><strong>Instructions:</strong> ${meal.strInstructions?.slice(0, 15)}</p>
                    
                  </div>
                `;
            }
        })
        .catch((error) => console.error("Error fetching meal details:", error));
};

getAllProducts();
