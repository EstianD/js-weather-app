window.addEventListener('load', ()=> {
    
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/'; //TO MAKE API WORK ON LOCALHOST
            const api = `${proxy}https://api.darksky.net/forecast/4c3a7fc5c4316f69b2f9b7ab5d7b6706/${lat},${long}`;
        
            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(response => {
                    console.log(response);
                    const { temperature, summary, icon } = response.currently; //SHORTHAND TO PULL OUT DATA WITH THE SAME JSON STRUCTURE NAME - 'temperature, summary'
                    // SET DOM ELEMENTS FROM THE API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = response.timezone;

                    // FORMULA FOR CELSIUS

                    let celsius = (temperature - 32) * (5 / 9);

                    // SET ICON
                    setIcons(icon, document.querySelector(".icon"));

                    // CANGE TEMPERATURE TO CELSIUS/FARENHEIT
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });



        
    } else {
        h1.textContent = 'This is not working because it is not enabled!';
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});