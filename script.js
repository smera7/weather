// Function to fetch weather data for a location
async function getWeatherData(location) {
  try {
    if (!location) {
      throw new Error("Location is missing");
    }

    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=8ca4cc8d0b2e4da8940223626241001&q=${location}`
    );

    const data = await response.json();
    console.log("Full API Response:", data);

    const processedData = processData(data);
    console.log("Processed data:", processedData);
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

// Function to process the JSON data and return required data
function processData(data) {
  if (
    !data ||
    !data.location ||
    !data.location.name ||
    !data.current ||
    !data.current.temp_c ||
    !data.current.condition ||
    !data.current.condition.text ||
    !data.current.humidity ||
    !data.current.wind_kph
  ) {
    throw new Error("Invalid data structure received from the API");
  }

  const processedData = {
    location: data.location.name,
    temperature: data.current.temp_c,
    condition: data.current.condition.text,
    humidity: data.current.humidity,
    windSpeed: data.current.wind_kph,
  };
  display(processedData);
  return processedData;
}

// Example usage
async function search() {
  try {
    var input = document.getElementById("search").value;
    console.log("Input", input);
    const weatherData = await getWeatherData(input);
    // Perform any further actions with the weatherData here
  } catch (error) {
    // Handle the error, e.g., display an error message to the user
    console.log("Error in search:", error);
  }
}

async function display(data) {
  try {
    // Append processedData to the DOM
    const container = document.getElementById("weather-container");
    container.innerHTML = "";
    const weatherDataElement = document.createElement("div");
    weatherDataElement.innerHTML = `
            <h2>Location: ${data.location}</h2>
            <p>Temperature: ${data.temperature}°C</p>
            <p>Condition: ${data.condition}</p>
            <p>Humidity: ${data.humidity}%</p>
            <p>Wind Speed: ${data.windSpeed} kph</p>
        `;
    container.appendChild(weatherDataElement);
  } catch (error) {
    console.log("Error in display:", error);
  }
}
