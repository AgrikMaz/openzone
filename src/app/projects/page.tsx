"use client"

import * as React from "react";
import axios from 'axios';
import Navbar from "@/components/Navbar/page";
import Link from "next/link";
import FadeLoader from "react-spinners/FadeLoader";

interface Project {
    name: string;
    stargazers_count: number;
    html_url: string;
}

const Project: React.FC = () => {
    const [query, setQuery] = React.useState('');
    const [isSearched, setIsSearched] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSearch = async () => {
        try {
            setIsSearched(true);
            setLoading(true);
            setError('');
            const response = await axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: `${query}`,
                    sort: 'stars',
                    order: 'desc'
                }
            });
            setSearchResults(response.data.items);
            if (response.data.items.length !== 0) {
                setIsSearched(false);
            }
        } catch (error) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="flex justify-center flex-col items-center">
                <h1 className="bg-gradient-to-r text-3xl font-bold from-blue-500 to-black text-transparent bg-clip-text">Search Open Source Projects</h1>
                <div className="relative flex w-96 mt-10" data-twe-input-wrapper-init data-twe-input-group-ref>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear border border-black"
                        placeholder="Search"
                        aria-label="Search"
                        id="search-focus"
                        aria-describedby="basic-addon4"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-primary px-5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                        type="button"
                        id="button-addon1"
                        data-twe-ripple-init
                        data-twe-ripple-color="light"
                    >
                        <span className="[&>svg]:h-5 [&>svg]:w-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                {loading && <div className="flex justify-center p-4"><FadeLoader color="#36d7b7" loading={loading} /></div>}
                {error && <p>{error}</p>}
                {!loading && isSearched && searchResults.length === 0 && <p className="mt-6">No results found</p>}
                <div className="p-4 grid grid-cols-3 gap-4 mt-2">
                    {searchResults.map((project, index) => (
                        <div key={index} className="bg-gray-200 p-4 overflow-hidden rounded shadow-md">
                            <h2 className="text-lg font-semibold">{project.name}</h2>
                            <p>{`Stars: ${project.stargazers_count}`}</p>
                            <div>
                                <p>URL:</p>
                                <div className="w-auto overflow-hidden">
                                    <Link className=" text-blue-500" href={project.html_url}>
                                        {project.html_url}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    );
}

export default Project;
