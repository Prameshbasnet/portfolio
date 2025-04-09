"use client"

// Gemini API key provided by the user
const GEMINI_API_KEY = "AIzaSyAJrTBYnBaqnuNq8PGhTSloM7nAsktUH7U"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

/**
 * Call the Gemini API with a prompt
 * @param {string} prompt - The prompt to send to Gemini
 * @returns {Promise<string>} - The generated text
 */
export async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1000,
        },
      }),
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()

    // Extract the generated text from the response
    if (
      data.candidates &&
      data.candidates.length > 0 &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts.length > 0
    ) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error("Unexpected response format from Gemini API")
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    throw error
  }
}

/**
 * Generate weather data using Gemini
 * @param {string} city - The city to get weather for
 * @returns {Promise<Object>} - Weather data
 */
export async function generateWeatherData(city = "Lalitpur") {
  const prompt = `Generate a realistic weather forecast for ${city} in JSON format. Include current temperature, condition, humidity, wind speed, and a 3-day forecast. The response should be in this exact format:
  {
    "location": "${city}",
    "temperature": "temperature in celsius with °C symbol",
    "condition": "weather condition",
    "humidity": "humidity percentage with % symbol",
    "wind": "wind speed with unit",
    "forecast": [
      {"day": "Today", "temp": "temperature", "condition": "condition"},
      {"day": "Tomorrow", "temp": "temperature", "condition": "condition"},
      {"day": "day after tomorrow name", "temp": "temperature", "condition": "condition"}
    ]
  }
  Only return the JSON, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error generating weather data:", error)
    throw error
  }
}

/**
 * Generate IP information using Gemini
 * @returns {Promise<Object>} - IP information
 */
export async function generateIpInfo() {
  const prompt = `Generate realistic IP information in JSON format. Include IP address, city, region, country, coordinates, ISP, postal code, and timezone. The response should be in this exact format:
  {
    "ip": "IP address",
    "city": "city name",
    "region": "region name",
    "country": "country name",
    "loc": "latitude,longitude",
    "org": "ISP name",
    "postal": "postal code",
    "timezone": "timezone"
  }
  Only return the JSON, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error generating IP information:", error)
    throw error
  }
}

/**
 * Generate cryptocurrency data using Gemini
 * @returns {Promise<Array>} - Cryptocurrency data
 */
export async function generateCryptoData() {
  const prompt = `Generate realistic cryptocurrency price data for 5 popular cryptocurrencies in JSON array format. Include name, symbol, price in USD, and 24-hour price change percentage. The response should be in this exact format:
  [
    {"name": "Bitcoin", "symbol": "BTC", "price": "price in USD", "change": "percentage with % symbol"},
    {"name": "Ethereum", "symbol": "ETH", "price": "price in USD", "change": "percentage with % symbol"},
    {"name": "cryptocurrency name", "symbol": "symbol", "price": "price in USD", "change": "percentage with % symbol"},
    {"name": "cryptocurrency name", "symbol": "symbol", "price": "price in USD", "change": "percentage with % symbol"},
    {"name": "cryptocurrency name", "symbol": "symbol", "price": "price in USD", "change": "percentage with % symbol"}
  ]
  Make sure some changes are positive and some are negative. Only return the JSON array, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error generating cryptocurrency data:", error)
    throw error
  }
}

/**
 * Generate news data using Gemini
 * @returns {Promise<Array>} - News data
 */
export async function generateNewsData() {
  const prompt = `Generate 5 realistic technology news headlines with sources in JSON array format. The response should be in this exact format:
  [
    {"title": "news headline", "source": "source name"},
    {"title": "news headline", "source": "source name"},
    {"title": "news headline", "source": "source name"},
    {"title": "news headline", "source": "source name"},
    {"title": "news headline", "source": "source name"}
  ]
  Make the headlines realistic and current. Only return the JSON array, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error generating news data:", error)
    throw error
  }
}

/**
 * Generate a quote using Gemini
 * @returns {Promise<Object>} - Quote data
 */
export async function generateQuote() {
  const prompt = `Generate an inspirational quote about technology or programming with its author in JSON format. The response should be in this exact format:
  {
    "text": "quote text",
    "author": "author name"
  }
  Only return the JSON, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error generating quote:", error)
    throw error
  }
}

/**
 * Generate a joke using Gemini
 * @returns {Promise<string>} - Joke text
 */
export async function generateJoke() {
  const prompt = "Generate a clean, funny programming joke. Only return the joke text, nothing else."

  try {
    return await callGeminiAPI(prompt)
  } catch (error) {
    console.error("Error generating joke:", error)
    throw error
  }
}

/**
 * Generate a fortune using Gemini
 * @returns {Promise<string>} - Fortune text
 */
export async function generateFortune() {
  const prompt =
    "Generate a fortune cookie message related to programming or technology. Only return the fortune text, nothing else."

  try {
    return await callGeminiAPI(prompt)
  } catch (error) {
    console.error("Error generating fortune:", error)
    throw error
  }
}

/**
 * Translate text using Gemini
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {Promise<string>} - Translated text
 */
export async function translateText(text, targetLang) {
  const prompt = `Translate the following text to ${targetLang}: "${text}". Only return the translated text, nothing else.`

  try {
    return await callGeminiAPI(prompt)
  } catch (error) {
    console.error("Error translating text:", error)
    throw error
  }
}

/**
 * Search for information using Gemini
 * @param {string} query - Search query
 * @returns {Promise<Array>} - Search results
 */
export async function searchInfo(query) {
  const prompt = `Provide information about "${query}" in JSON array format with 3 results. Each result should have a title, snippet, and URL. The response should be in this exact format:
  [
    {"title": "result title", "snippet": "brief description", "url": "https://example.com"},
    {"title": "result title", "snippet": "brief description", "url": "https://example.com"},
    {"title": "result title", "snippet": "brief description", "url": "https://example.com"}
  ]
  Only return the JSON array, nothing else.`

  try {
    const response = await callGeminiAPI(prompt)
    // Extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    } else {
      throw new Error("Could not extract JSON from Gemini response")
    }
  } catch (error) {
    console.error("Error searching for information:", error)
    throw error
  }
}

/**
 * Generate AI response using Gemini
 * @param {string} prompt - User prompt
 * @returns {Promise<string>} - AI response
 */
export async function generateAIResponse(prompt) {
  try {
    return await callGeminiAPI(prompt)
  } catch (error) {
    console.error("Error generating AI response:", error)
    throw error
  }
}
