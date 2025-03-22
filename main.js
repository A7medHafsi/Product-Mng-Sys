let title = document.getElementById('title');
let price = document.getElementById('price');
let catrgory = document.getElementById('catrgory');
let count = document.getElementById('count');
let ads = document.getElementById('ads');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let submit = document.getElementById('submit');
let cencel = document.getElementById('cencel');
let deleteAll = document.querySelector('.deleteAll');
let label = document.querySelectorAll('label')
let mood = 'create';
let tmp;

let classTitle = document.querySelector('.title');
let controlePricee = document.querySelector('.controlePrice');
// new producte 
let newProdect =  document.querySelector('.new');
let input =  document.querySelector('.input');

newProdect.addEventListener('click' ,function(){
    input.style.height = '188px'
})
cencel.addEventListener('click' ,function(){
    if(mood === 'create'){
        input.style.height = '5px'
        clearData()

        label.forEach(label => {
            label.style.display = 'none';
        });
    }else{
        dataProdect[tmp] = newProdect;
        count.style.display = 'block'
        title.style.width = '20%'
        price.style.width = '20%'
        catrgory.style.width = '20%'
        ads.style.width = '20%'
        taxes.style.width = '20%'
        discount.style.width = '20%'
        total.style.width = '20%'
        submit.innerHTML = 'create'
        input.style.height = '5px'
        controlePricee.style.cssText = "justify-content: space-around; margin: 15px 0; width: 100%;";
        classTitle.style.margin = '10px 0';
        clearData()
        label.forEach(label => {
            label.style.display = 'none';
        });
    }

   
})


// create total

price.onkeyup = getTotal;
ads.onkeyup = getTotal;
taxes.onkeyup = getTotal;
discount.onkeyup = getTotal;

function getTotal(){
    
    if(price.value != ''){
        let result = (+price.value + +ads.value + +taxes.value ) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green'
    }else{
        total.innerHTML = 0;
        total.style.background = '#111'
    }

}

// create prodect

let dataProdect;

 if (localStorage.prodect != null){
    dataProdect = JSON.parse(localStorage.prodect);
 }else{
    dataProdect = [];
 }

submit.onclick = function(){
    let newProdect ={
        title:title.value,
        price:price.value,
        catrgory:catrgory.value,
        count:count.value,
        ads: ads.value.trim() !== "" ? ads.value : "0",
        taxes: taxes.value.trim() !== "" ? taxes.value : "0",
        discount: discount.value.trim() !== "" ? discount.value : "0",
        total:total.innerHTML,
    }
    
    if(title.value != '' && price.value != '' && catrgory.value != '' && count.value <= 100){
        if(mood === 'create'){
            if (newProdect.count > 1){
                for(let i = 0 ; i < newProdect.count ; i++){
                    dataProdect.push(newProdect);
                }
            }else{
                dataProdect.push(newProdect);
            }    
        }else{
            dataProdect[tmp] = newProdect;
            count.style.display = 'block'
            title.style.width = '20%'
            price.style.width = '20%'
            catrgory.style.width = '20%'
            submit.innerHTML = 'create'
            ads.style.width = '20%'
            taxes.style.width = '20%'
            discount.style.width = '20%'
            total.style.width = '20%'
            submit.innerHTML = 'create'
            input.style.height = '5px'
            controlePricee.style.cssText = "justify-content: space-around; margin: 15px 0; width: 100%;";
            //controlePricee.style.removeProperty('gap');
            classTitle.style.margin = '10px 0';
            clearData()
            label.forEach(label => {
                label.style.display = 'none';
            });
            tmp = 'create';
        }
        clearData()
    }
    localStorage.setItem('prodect' , JSON.stringify(dataProdect))
    showData()
}

// clear data 
 function clearData (){
    title.value = '';
    price.value = '';
    catrgory.value = '';
    taxes.value = '';
    ads.value = '';
    count.value = '';
    discount.value = '';
    total.innerHTML = '0';
    total.style.background = '#111';
 }

// show data in the table
function showData (){
    let table = [];

    for( let i =0 ; i < dataProdect.length ; i++){

        table += `   <tr>
                        <td>${i+1}</td>
                        <td>${dataProdect[i].title}</td>
                        <td>${dataProdect[i].price}</td>
                        <td>${dataProdect[i].catrgory}</td>
                        <td>${dataProdect[i].ads}</td>
                        <td>${dataProdect[i].taxes}</td>
                        <td>${dataProdect[i].discount}</td>
                        <td>${dataProdect[i].total}</td>
                        <td><button onclick = updateData(${i}) id="update">update</button></td>
                        <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                        
                    </tr>`
    }

    document.getElementById('tbody').innerHTML = table;
    if(dataProdect.length > 1){
        deleteAll.style.display ='block';
       }else{
        deleteAll.style.display ='none';
       }
}
showData ()

// dark mode 

// delete btn 

function deleteData (i){
    dataProdect.splice(i,1);
    //localStorage.setItem('prodect' , JSON.stringify(dataProdect));
    localStorage.prodect = JSON.stringify(dataProdect);
    showData()
}

// delete all 
deleteAll.addEventListener( 'click',function deleteAllColom(){
    localStorage.clear();
    dataProdect.splice(0);
    showData();
})

// update Data
function updateData(i){
    input.style.height = '188px'
    input.style.setProperty('transform', 'none', 'important');
    input.blur();
    title.value = dataProdect[i].title;
    price.value = dataProdect[i].price;
    catrgory.value = dataProdect[i].catrgory;
    ads.value = dataProdect[i].ads;
    taxes.value = dataProdect[i].taxes;
    discount.value = dataProdect[i].discount;
    total.innerHTML = dataProdect[i].total;
    count.style.display = 'none'
    title.style.width = '25%'
    price.style.width = '25%'
    catrgory.style.width = '25%'
    ads.style.width = '15%'
    taxes.style.width = '15%'
    discount.style.width = '15%'
    total.style.width = '150px'
    classTitle.style.margin = '10px 30px'
    controlePricee.style.cssText = "justify-content: space-around; margin: 15px 0; width: 100%;";
    submit.innerHTML = 'update'
    getTotal()
    mood = 'update';
    label.forEach(label => {
        label.style.display = 'block';
    });
    tmp = i;
    scroll({top:0 , behavior:"smooth"});

}

// search 

let searchTitle = document.querySelector('#searchTitle');
let searchCategory = document.querySelector('#searchCategory');
let searchInput = document.querySelector('#search');
let searchMood = 'title';


function getSearchMood(id){
    if(id === 'searchTitle'){
        searchMood = 'title'
        searchInput.placeholder = "Search By Title";
    }else{
        searchMood = 'category'
        searchInput.placeholder = "Search By Category";
    }
    searchInput.focus();
    searchInput.value = "";
    showData()
}

//عند كتابة قيمة في searchInput
searchInput.onkeyup = () => searchData(searchInput.value);


function searchData(value){
    let table = '';
    for(let i = 0 ; i< dataProdect.length ; i++){
        if(searchMood === 'title'){  
                //هل الحرف موجود في الكلمة 
                if(dataProdect[i].title.toLowerCase().includes(value.toLowerCase())){
                    table += `   <tr>
                        <td>${i+1}</td>
                        <td>${dataProdect[i].title}</td>
                        <td>${dataProdect[i].price}</td>
                        <td>${dataProdect[i].catrgory}</td>
                        <td>${dataProdect[i].ads}</td>
                        <td>${dataProdect[i].taxes}</td>
                        <td>${dataProdect[i].discount}</td>
                        <td>${dataProdect[i].total}</td>
                        <td><button onclick = updateData(${i}) id="update">update</button></td>
                        <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                    
                    </tr>`
                }     
        }else{
                //هل الحرف موجود في الكلمة 
                if(dataProdect[i].catrgory.toLowerCase().includes(value.toLowerCase())){
                    table += `   <tr>
                        <td>${i+1}</td>
                        <td>${dataProdect[i].title}</td>
                        <td>${dataProdect[i].price}</td>
                        <td>${dataProdect[i].catrgory}</td>
                        <td>${dataProdect[i].ads}</td>
                        <td>${dataProdect[i].taxes}</td>
                        <td>${dataProdect[i].discount}</td>
                        <td>${dataProdect[i].total}</td>
                        <td><button onclick = updateData(${i}) id="update">update</button></td>
                        <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
                    
                    </tr>`
                }        
            }
            document.getElementById('tbody').innerHTML = table;
    }
    

}

