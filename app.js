document.addEventListener("DOMContentLoaded",
    function(event){

    let dinos = [];

    function getDinoObjects(jsonData){
        // From dino json data, create Dino objects and return them as list
        for(let i=0; i<jsonData.length; i++){
            let dino = jsonData[i];
            dinos.push(new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
        }
    }

    // Create Dino Constructor
    function Dino(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    // Create Dino Objects
    fetch("dino.json")
    .then(response => response.json())
    .then(json => getDinoObjects(json["Dinos"]));


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.cmpHeight =
        function(height){
            return this.height == height;
        }

    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.cmpDiet =
        function(diet){
            return this.diet == diet;
        }

    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.cmpHeight =
        function(weight){
            return this.weight == weight;
        }


    // On button click, prepare and display infographic
    document.querySelector("#btn")
      .addEventListener("click", compareWithDinasour);

    function compareWithDinasour(event){
        // Create Human Object
        // Use IIFE to get human data from form
         let human = (function(){
         let hName = document.getElementById("name").value;
         let hHeightft = document.getElementById("feet").value;
         let hHeightin = document.getElementById("inches").value;
         let hWeightlb = document.getElementById("weight").value;
         let hDiet = document.getElementById("diet").value;
             return {
                 name : hName,
                 height: parseInt(hHeightft * 12) + parseInt(hHeightin),
                 weight: parseInt(hWeightlb),
                 diet : hDiet
             };
        })();

    // Remove form from screen
    document.getElementById("dino-compare").style.visibility = "hidden";

    // Generate Tiles for each Dino in Array
    // Let factIdx = getRandomInt(dinos.length);

    function addTile(imageURL, factTxt, titleTxt){
        let item = document.createElement("div");
        let imageItem = document.createElement("img");
        let titleItem = document.createElement("h2");

        item.className = "grid-item";
        imageItem.src = imageURL;
        titleItem.innerText = titleTxt

        item.appendChild(titleItem);
        item.appendChild(imageItem);

        if(factTxt){
            let factItem = document.createElement("p");
            factItem.innerText = factTxt;
            item.appendChild(factItem);
        }

        return item;
    }

    // Add tiles to DOM
    let grid = document.getElementById("grid");
    for(let idx=0;idx<9;idx++){
        let fact;
        let img_path;
        let title;
        let image_basename;
        if(idx < 4 ){
            image_basename =  dinos[idx].species;
            fact = dinos[idx].fact;
            title = image_basename;
        }
        else if(idx == 4){
            // Set human at middle position
            image_basename = "Human";
            title = human.name
            fact = null
        }
        else{
            image_basename =  dinos[idx -1].species;
            fact = dinos[idx-1].fact;
            title = image_basename;
        }
        img_path = "images/" + image_basename.toLowerCase() + ".png";
        grid.appendChild(addTile(img_path, fact, title));
    }

    }

});
