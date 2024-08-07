import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import cheerio from 'cheerio';



export default function News() {

    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = 'https://www.fibre2fashion.com/news/wool-news';
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
            };

            const advertisementKeywords = ['advertorial', 'sponsored', 'promotion', 'ad'];

            try {
                const response = await axios.get(url, { headers });
                const $ = cheerio.load(response.data);
                const newsArticles = [];
                $('.latest-news-box').each((index, element) => {
                    const title = $(element).find('.blocktitle').text().trim();
                    const date = $(element).find('.latest-news-date').text().trim();
                    const href = $(element).find('.latest-news-img a').attr('href');
                    const head = $(element).find('.categoryname').text().trim();

                    // Check if the title contains any advertisement keywords
                    if (advertisementKeywords.some(keyword => title.toLowerCase().includes(keyword)) || advertisementKeywords.some(keyword => head.toLowerCase().includes(keyword))) {
                        return; // Skip this article
                    }

                    newsArticles.push({ title, date, href });
                    if (newsArticles.length >= 5) {
                        return false; // Exit the loop after fetching 5 non-advertisement articles
                    }
                });
                setArticles(newsArticles);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    const weather = async () => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d70cb6edb5784b8eb89014e9a7c06c57&units=metric`
            );
            const data = await response.json();
            setWeatherData(data);
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const imageChanger = () => {
        if (!weatherData) return "clouds.png";
        const typeName = weatherData.weather[0].main.toLowerCase();
        switch (typeName) {
            case "clear":
                return "clear.png";
            case "clouds":
                return "clouds.png";
            case "rain":
                return "rain.png";
            case "snow":
                return "snow.png";
            default:
                return "clouds.png";
        }
    };

    return (
        <div className="flex flex-col gap-5 md:max-w-7xl m-auto border p-2 md:flex-row mt-24">
            <div className="left md:w-2/6">
                <div className=" container p-10 bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center rounded-xl ">
                    <div className="search-box flex gap-[10px] p-2 w-full md:justify-center">
                        <input
                            type="text"
                            className="p-[10px] rounded-2xl w-full outline-none cityname"
                            placeholder="search"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <button
                            className="bg-white p-[10px] text-gray-700 rounded-full searchbtn"
                            onClick={weather}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </div>

                    <div className="con2 flex gap-[10px] flex-col w-full items-center md:flex-row md:pt-[10px] md:items-center md:justify-around ">
                        <div className="img md:w-[50%] md:flex md:justify-center md:items-center">
                            <img src={require("./images/" + imageChanger())} className="setimg" />
                        </div>

                        <div className="temp w-full flex flex-col gap-[5px] items-center font-extrabold text-2xl pb-16 text-white md:w-[50%]">
                            <span>
                                <span className="tempvalue">{weatherData?.main.temp || "0"}</span>
                                <sup>o</sup>
                            </span>
                            <div className="citytext">{city}</div>
                        </div>
                    </div>

                    <div className="weather-fec w-full h-[100px] pt-[10px] flex gap-8">
                        <div className="humidity-sec flex flex-col gap-4 w-[50%] justify-center items-center">
                            <div className="humdityimg w-8">
                                <img src={require("./images/humidity.png")} alt="" className="humimg" />
                            </div>
                            <div className="humidity-content font-extrabold text-white text-[20px] flex flex-col items-center">
                                <p className="humidity-no text-center">{weatherData?.main.humidity || "0"}%</p>
                                <p className="hemidity-text">Humidity</p>
                            </div>
                        </div>

                        <div className="wind-sec flex flex-col gap-4 w-[50%] justify-center items-center">
                            <div className="windimg w-8">
                                <img src={require("./images/wind.png")} alt="" className="humimg" />
                            </div>
                            <div className="wind-content font-extrabold text-white text-[20px] flex flex-col items-center">
                                <p className="wind-no">{weatherData?.wind.speed || "0"} km/h</p>
                                <p className="wind-text text-center">Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right border md:w-3/4">
                <div className="container mx-auto p-4">
                    <h1 className=" text-2xl font-bold mb-4">Wool News</h1>
                    {articles.map((article, index) => (
                        <div key={index} className="mb-8">
                            <h2 className="font-bold mb-2">{article.title}</h2>
                            <p className="text-sm text-gray-600 mb-2">{article.date}</p>
                            <a href={article.href} className="text-blue-500 hover:underline">Read more</a>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
