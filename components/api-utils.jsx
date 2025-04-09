"use client"

// API key for OpenWeatherMap (free tier)
const OPENWEATHER_API_KEY = "4a40b4e7b5e9b7fb9d9c8f7e6a5d4c3b" // This is a placeholder - replace with your actual API key

// API key for NewsAPI (free tier)
const NEWS_API_KEY = "c5a6a0b5f9d84e1b9d8c7f6e5a4d3c2b" // This is a placeholder - replace with your actual API key

// API key for CoinGecko (free tier)
// No API key needed for basic endpoints

// Helper function to handle API errors
const handleApiError = (error, fallbackData) => {
  console.error("API Error:", error)
  return fallbackData
}

// Weather API
export async function fetchRealWeatherData(city = "Lalitpur") {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`)
    }

    const data = await response.json()

    // Get 3-day forecast
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&cnt=24&appid=${OPENWEATHER_API_KEY}`,
    )

    if (!forecastResponse.ok) {
      throw new Error(`Forecast API error: ${forecastResponse.status}`)
    }

    const forecastData = await forecastResponse.json()

    // Extract daily forecasts (every 8 data points = 1 day)
    const dailyForecasts = [forecastData.list[0], forecastData.list[8], forecastData.list[16]]

    // Format the data
    return {
      location: `${data.name}, ${data.sys.country}`,
      temperature: `${Math.round(data.main.temp)}°C`,
      condition: data.weather[0].main,
      humidity: `${data.main.humidity}%`,
      wind: `${data.wind.speed} m/s`,
      forecast: [
        {
          day: "Today",
          temp: `${Math.round(dailyForecasts[0].main.temp)}°C`,
          condition: dailyForecasts[0].weather[0].main,
        },
        {
          day: "Tomorrow",
          temp: `${Math.round(dailyForecasts[1].main.temp)}°C`,
          condition: dailyForecasts[1].weather[0].main,
        },
        {
          day: getDayName(2),
          temp: `${Math.round(dailyForecasts[2].main.temp)}°C`,
          condition: dailyForecasts[2].weather[0].main,
        },
      ],
    }
  } catch (error) {
    return handleApiError(error, {
      location: "Lalitpur, Nepal",
      temperature: "24°C",
      condition: "Partly Cloudy",
      humidity: "65%",
      wind: "5 km/h",
      forecast: [
        { day: "Today", temp: "24°C", condition: "Partly Cloudy" },
        { day: "Tomorrow", temp: "26°C", condition: "Sunny" },
        { day: getDayName(2), temp: "25°C", condition: "Cloudy" },
      ],
    })
  }
}

// Helper function to get day name
function getDayName(daysFromNow) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const date = new Date()
  date.setDate(date.getDate() + daysFromNow)
  return days[date.getDay()]
}

// IP Information API
export async function fetchRealIpInfo() {
  try {
    const response = await fetch("https://ipapi.co/json/")

    if (!response.ok) {
      throw new Error(`IP API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country_name,
      loc: `${data.latitude},${data.longitude}`,
      org: data.org,
      postal: data.postal,
      timezone: data.timezone,
    }
  } catch (error) {
    return handleApiError(error, {
      ip: "192.168.1.1",
      city: "Lalitpur",
      region: "Bagmati Province",
      country: "Nepal",
      loc: "27.6588,85.3247",
      org: "AS45650 Vianet Communications Pvt. Ltd.",
      postal: "44600",
      timezone: "Asia/Kathmandu",
    })
  }
}

// Cryptocurrency API
export async function fetchRealCryptoData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h",
    )

    if (!response.ok) {
      throw new Error(`Crypto API error: ${response.status}`)
    }

    const data = await response.json()

    return data.map((coin) => ({
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      price: `$${coin.current_price.toLocaleString()}`,
      change: `${coin.price_change_percentage_24h.toFixed(2)}%`,
    }))
  } catch (error) {
    return handleApiError(error, [
      { name: "Bitcoin", symbol: "BTC", price: "$64,235.78", change: "+2.3%" },
      { name: "Ethereum", symbol: "ETH", price: "$3,456.92", change: "+1.7%" },
      { name: "Solana", symbol: "SOL", price: "$142.56", change: "+5.2%" },
      { name: "Cardano", symbol: "ADA", price: "$0.45", change: "-0.8%" },
      { name: "Dogecoin", symbol: "DOGE", price: "$0.12", change: "+10.5%" },
    ])
  }
}

// News API
export async function fetchRealNewsData() {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-articles?country=us&category=technology&pageSize=5&apiKey=${NEWS_API_KEY}`,
    )

    if (!response.ok) {
      throw new Error(`News API error: ${response.status}`)
    }

    const data = await response.json()

    return data.articles.map((article) => ({
      title: article.title,
      source: article.source.name,
    }))
  } catch (error) {
    // Fallback to using a free API that doesn't require a key
    try {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty")

      if (!response.ok) {
        throw new Error(`Hacker News API error: ${response.status}`)
      }

      const storyIds = await response.json()
      const topStoryIds = storyIds.slice(0, 5)

      const storyPromises = topStoryIds.map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`).then((res) => res.json()),
      )

      const stories = await Promise.all(storyPromises)

      return stories.map((story) => ({
        title: story.title,
        source: "Hacker News",
      }))
    } catch (innerError) {
      return handleApiError(innerError, [
        { title: "Nepal to Host International Tech Conference", source: "Kathmandu Post" },
        { title: "New Developments in AI Technology", source: "Tech Today" },
        { title: "Software Development Industry Growing in Nepal", source: "Nepal Times" },
        { title: "Flutter 3.0 Released with New Features", source: "Dev Weekly" },
        { title: "React 19 Announced with Performance Improvements", source: "Frontend News" },
      ])
    }
  }
}

// Quotes API
export async function fetchRealQuote() {
  try {
    const response = await fetch("https://api.quotable.io/random?tags=technology,famous-quotes")

    if (!response.ok) {
      throw new Error(`Quote API error: ${response.status}`)
    }

    const data = await response.json()

    return {
      text: data.content,
      author: data.author,
    }
  } catch (error) {
    return handleApiError(error, {
      text: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
    })
  }
}

// Jokes API
export async function fetchRealJoke() {
  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single",
    )

    if (!response.ok) {
      throw new Error(`Joke API error: ${response.status}`)
    }

    const data = await response.json()

    return data.joke
  } catch (error) {
    return handleApiError(error, "Why do programmers prefer dark mode? Because light attracts bugs!")
  }
}

// Fortune API (using advice slip API)
export async function fetchRealFortune() {
  try {
    const response = await fetch("https://api.adviceslip.com/advice")

    if (!response.ok) {
      throw new Error(`Fortune API error: ${response.status}`)
    }

    const data = await response.json()

    return data.slip.advice
  } catch (error) {
    return handleApiError(error, "You will soon embark on a new coding adventure.")
  }
}

// Translation API using LibreTranslate (free and open source)
export async function translateText(text, targetLang) {
  try {
    const response = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: targetLang,
      }),
      headers: { "Content-Type": "application/json" },
    })

    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`)
    }

    const data = await response.json()

    return data.translatedText
  } catch (error) {
    // Fallback translations
    const fallbackTranslations = {
      es: `Traducción simulada: ${text}`,
      fr: `Traduction simulée: ${text}`,
      de: `Simulierte Übersetzung: ${text}`,
      ja: `模擬翻訳: ${text}`,
      zh: `模拟翻译: ${text}`,
    }

    return handleApiError(error, fallbackTranslations[targetLang] || `Translation not available for ${targetLang}`)
  }
}

// Search API using Wikipedia
export async function searchWikipedia(query) {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`,
    )

    if (!response.ok) {
      throw new Error(`Wikipedia API error: ${response.status}`)
    }

    const data = await response.json()

    return data.query.search.slice(0, 5).map((result) => ({
      title: result.title,
      snippet: result.snippet.replace(/<\/?span[^>]*>/g, ""),
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(result.title.replace(/ /g, "_"))}`,
    }))
  } catch (error) {
    return handleApiError(error, [
      {
        title: "Search results unavailable",
        snippet: "Could not fetch search results. Please try again later.",
        url: "#",
      },
    ])
  }
}

// AI Text Generation using Hugging Face Inference API
export async function generateAIText(prompt) {
  try {
    const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // You would need to get an API key from Hugging Face
        Authorization: "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your API key
      },
      body: JSON.stringify({ inputs: prompt, parameters: { max_length: 100 } }),
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()

    return data[0].generated_text
  } catch (error) {
    return handleApiError(
      error,
      `I'm sorry, I couldn't generate AI text at the moment. Here's a simple response to "${prompt}": This is a placeholder response since the AI service is currently unavailable.`,
    )
  }
}
