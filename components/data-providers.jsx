import {
  generateWeatherData,
  generateIpInfo,
  generateCryptoData,
  generateNewsData,
  generateQuote,
  generateJoke,
  generateFortune,
  translateText,
  searchInfo,
  generateAIResponse,
} from "./gemini-api"

// Weather data
export async function fetchWeatherData(city = "Lalitpur") {
  try {
    return await generateWeatherData(city)
  } catch (error) {
    throw new Error(`Failed to fetch weather data: ${error.message}`)
  }
}

// IP information
export async function fetchIpInfo() {
  try {
    return await generateIpInfo()
  } catch (error) {
    throw new Error(`Failed to fetch IP information: ${error.message}`)
  }
}

// Cryptocurrency data
export async function fetchCryptoData() {
  try {
    return await generateCryptoData()
  } catch (error) {
    throw new Error(`Failed to fetch cryptocurrency data: ${error.message}`)
  }
}

// News data
export async function fetchNewsData() {
  try {
    return await generateNewsData()
  } catch (error) {
    throw new Error(`Failed to fetch news data: ${error.message}`)
  }
}

// Quote data
export async function fetchQuote() {
  try {
    return await generateQuote()
  } catch (error) {
    throw new Error(`Failed to fetch quote: ${error.message}`)
  }
}

// Joke data
export async function fetchJoke() {
  try {
    return await generateJoke()
  } catch (error) {
    throw new Error(`Failed to fetch joke: ${error.message}`)
  }
}

// Fortune data
export async function getFortune() {
  try {
    return await generateFortune()
  } catch (error) {
    throw new Error(`Failed to fetch fortune: ${error.message}`)
  }
}

// Translation
export async function getTranslation(text, targetLang) {
  try {
    return await translateText(text, targetLang)
  } catch (error) {
    throw new Error(`Failed to translate text: ${error.message}`)
  }
}

// Search
export async function searchQuery(query) {
  try {
    return await searchInfo(query)
  } catch (error) {
    throw new Error(`Failed to search for information: ${error.message}`)
  }
}

// AI Text Generation
export async function generateAIText(prompt) {
  try {
    return await generateAIResponse(prompt)
  } catch (error) {
    throw new Error(`Failed to generate AI response: ${error.message}`)
  }
}

// The only non-API utility function we'll keep
export function calculateExpression(expression) {
  try {
    // Using Function constructor to evaluate mathematical expressions
    // This is safer than eval() for simple calculations
    const result = new Function(`return ${expression}`)()
    return isNaN(result) ? "Error: Invalid expression" : result.toString()
  } catch (error) {
    return "Error: Invalid expression"
  }
}
