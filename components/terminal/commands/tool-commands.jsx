"use client"

import { useState, useEffect } from "react"
import { SecurityScanSection } from "@/components/sections/security-scan-section"

// Import the data providers
import {
  fetchWeatherData,
  fetchIpInfo,
  fetchCryptoData,
  fetchNewsData,
  fetchQuote,
  fetchJoke,
  getFortune,
  calculateExpression,
  getTranslation,
  searchQuery,
  generateAIText,
} from "../utils/data-providers"

export function handleToolCommands(command) {
  const commandParts = command.split(" ")
  const mainCommand = commandParts[0].toLowerCase()

  switch (mainCommand) {
    case "weather": {
      const [, city] = commandParts
      const cityName = city || "Lalitpur"

      return <WeatherCommand city={cityName} />
    }

    case "ip":
      return <IpInfoCommand />

    case "crypto":
      return <CryptoCommand />

    case "news":
      return <NewsCommand />

    case "quote":
      return <QuoteCommand />

    case "joke":
      return <JokeCommand />

    case "scan":
      return <SecurityScanSection />

    case "fortune":
      return <FortuneCommand />

    case "calc":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">calc: Missing expression</p>
      } else {
        const expression = commandParts.slice(1).join(" ")
        const result = calculateExpression(expression)
        return (
          <div className="text-green-500 font-mono">
            <p>Expression: {expression}</p>
            <p>Result: {result}</p>
          </div>
        )
      }

    case "translate":
      if (commandParts.length < 3) {
        return <p className="text-red-500 font-mono">translate: Usage: translate [language] [text]</p>
      } else {
        const language = commandParts[1]
        const text = commandParts.slice(2).join(" ")
        return <TranslateCommand language={language} text={text} />
      }

    case "search":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">search: Missing search query</p>
      } else {
        const query = commandParts.slice(1).join(" ")
        return <SearchCommand query={query} />
      }

    case "ai":
      if (commandParts.length < 2) {
        return <p className="text-red-500 font-mono">ai: Missing prompt</p>
      } else {
        const prompt = commandParts.slice(1).join(" ")
        return <AICommand prompt={prompt} />
      }

    default:
      return null
  }
}

// Component for Weather command with loading state
function WeatherCommand({ city }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadWeather() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchWeatherData(city)
        setWeather(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [city])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching weather data for {city}...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching weather data: {error}</p>
        <p className="text-xs mt-2">Try again later or check your input.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Weather for {weather.location}</p>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p>Temperature: {weather.temperature}</p>
          <p>Condition: {weather.condition}</p>
          <p>Humidity: {weather.humidity}</p>
          <p>Wind: {weather.wind}</p>
        </div>
        <div>
          <p className="font-bold">Forecast:</p>
          {weather.forecast.map((day, index) => (
            <p key={index}>
              {day.day}: {day.temp} - {day.condition}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

// Component for IP Info command with loading state
function IpInfoCommand() {
  const [ipInfo, setIpInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadIpInfo() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchIpInfo()
        setIpInfo(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadIpInfo()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching IP information...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching IP information: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">IP Information</p>
      <p>IP: {ipInfo.ip}</p>
      <p>
        Location: {ipInfo.city}, {ipInfo.region}, {ipInfo.country}
      </p>
      <p>Coordinates: {ipInfo.loc}</p>
      <p>ISP: {ipInfo.org}</p>
      <p>Postal Code: {ipInfo.postal}</p>
      <p>Timezone: {ipInfo.timezone}</p>
    </div>
  )
}

// Component for Crypto command with loading state
function CryptoCommand() {
  const [cryptoData, setCryptoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCryptoData() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchCryptoData()
        setCryptoData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadCryptoData()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching cryptocurrency prices...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching cryptocurrency prices: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Cryptocurrency Prices</p>
      <div className="space-y-1">
        {cryptoData.map((coin, index) => (
          <p key={index}>
            {coin.name} ({coin.symbol}): {coin.price}{" "}
            <span className={coin.change.startsWith("+") ? "text-green-500" : "text-red-500"}>{coin.change}</span>
          </p>
        ))}
      </div>
      <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleString()}</p>
    </div>
  )
}

// Component for News command with loading state
function NewsCommand() {
  const [newsData, setNewsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadNewsData() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchNewsData()
        setNewsData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadNewsData()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching latest news...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching news: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Latest News</p>
      <div className="space-y-1">
        {newsData.map((item, index) => (
          <p key={index}>
            • {item.title} <span className="text-gray-500">({item.source})</span>
          </p>
        ))}
      </div>
      <p className="text-gray-500 text-xs mt-2">Last updated: {new Date().toLocaleString()}</p>
    </div>
  )
}

// Component for Quote command with loading state
function QuoteCommand() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadQuote() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchQuote()
        setQuote(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadQuote()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching quote...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching quote: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Quote of the Day</p>
      <p>"{quote.text}"</p>
      <p className="text-gray-500 text-right">— {quote.author}</p>
    </div>
  )
}

// Component for Joke command with loading state
function JokeCommand() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadJoke() {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchJoke()
        setJoke(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadJoke()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Fetching joke...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error fetching joke: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Programming Joke</p>
      <p>{joke}</p>
      <p className="text-gray-500 text-xs mt-2">😄</p>
    </div>
  )
}

// Component for Fortune command with loading state
function FortuneCommand() {
  const [fortune, setFortune] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadFortune() {
      setLoading(true)
      setError(null)
      try {
        const data = await getFortune()
        setFortune(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadFortune()
  }, [])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Reading your fortune...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error reading your fortune: {error}</p>
        <p className="text-xs mt-2">Try again later.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Your Fortune:</p>
      <p>{fortune}</p>
    </div>
  )
}

// Component for Translate command with loading state
function TranslateCommand({ language, text }) {
  const [translation, setTranslation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadTranslation() {
      setLoading(true)
      setError(null)
      try {
        const data = await getTranslation(text, language)
        setTranslation(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadTranslation()
  }, [language, text])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Translating to {language}...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error translating text: {error}</p>
        <p className="text-xs mt-2">Try again later or check your input.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Translation</p>
      <p>Original text: {text}</p>
      <p>Language: {language}</p>
      <p className="mt-2 p-2 border border-green-800 bg-black/30">{translation}</p>
    </div>
  )
}

// Component for Search command with loading state
function SearchCommand({ query }) {
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadSearchResults() {
      setLoading(true)
      setError(null)
      try {
        const data = await searchQuery(query)
        setSearchResults(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadSearchResults()
  }, [query])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>Searching for "{query}"...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>
          Error searching for "{query}": {error}
        </p>
        <p className="text-xs mt-2">Try again later or refine your search query.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">Search Results for "{query}"</p>
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="space-y-3">
          {searchResults.map((result, index) => (
            <div key={index} className="border-b border-green-800 pb-2 last:border-0">
              <p className="font-bold text-blue-400">{result.title}</p>
              <p className="text-xs" dangerouslySetInnerHTML={{ __html: result.snippet }} />
              <p className="text-xs text-blue-300 mt-1">{result.url}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Component for AI command with loading state
function AICommand({ prompt }) {
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadAIResponse() {
      setLoading(true)
      setError(null)
      try {
        const data = await generateAIText(prompt)
        setResponse(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadAIResponse()
  }, [prompt])

  if (loading) {
    return (
      <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
        <p>AI is thinking about "{prompt}"...</p>
        <div className="loading-dots mt-2">
          <span className="dot">.</span>
          <span className="dot">.</span>
          <span className="dot">.</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 font-mono border border-red-800 p-2 bg-black/30">
        <p>Error generating AI response: {error}</p>
        <p className="text-xs mt-2">Try again later or refine your prompt.</p>
      </div>
    )
  }

  return (
    <div className="text-green-500 font-mono border border-green-800 p-2 bg-black/30">
      <p className="font-bold text-white mb-2">AI Response</p>
      <p className="text-xs text-gray-400 mb-2">Prompt: {prompt}</p>
      <div className="p-2 bg-black/50 rounded">
        <p className="whitespace-pre-wrap">{response}</p>
      </div>
    </div>
  )
}
