const c = (id)=>document.querySelector(id); // a const to help us making a shortcut

// main function 
document.querySelector('.search').addEventListener('submit',async(e)=>{
    e.preventDefault();
    c('.shower').style.display = 'none';
    let input = document.querySelector('#search').value; // getting the city name

    if(input !== ''){
        showWaning('Carregando...') //showing the submit(the search) is running
    }
    // getting the URL API and putting the city name and our key 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=b3c3e754a9c820b5b4478d95ea002a8f&units=metric&lang=pt_br`;
    let results = await fetch(url); //using the fetch function to get our informations
    let json = await results.json(); //transforming our results of the fetch to JSON

    //placing the informations of our request and putting in the right fields
    if(json.cod == 200) {
        c('.city').innerHTML = `${json.name}/${json.sys.country}`;
        c('.temperature').innerHTML = `${json.main.temp.toFixed(0)}°C`;
        c('.speed').innerHTML = `${(json.wind.speed * 3.6).toFixed(0)}km/h`;
        c('.pointer').style.transform = `rotate(${json.wind.deg - 90}deg)`;
        c('.temp-img img').setAttribute('src',`http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`);
        c('.desc').innerHTML = `${json.weather[0].description}`;
        showWaning('');

        c('.shower').style.display = 'flex';

    } else {
        if(input == '') {
            showWaning('Digite O Nome da cidade...')
        } else {
        showWaning('A cidade não foi encontrada')
        }
        
    }

});

// A functions to show our waning
function showWaning (warning) {
    document.querySelector('.warning').innerHTML = warning;
}

// a function to do a animated background
function changeBg() {
    c('body').style.background = `url("midia/bg${1 + Math.floor(Math.random() * 4)}.jpg")`;
    c('body').style.backgroundSize = 'cover';
    c('body').style.backgroundRepeat = 'no-repeat';
    c('body').style.backgroundPosition = 'center';
    c('img').style.objectFit = "cover";
}


setInterval(changeBg,8000);
