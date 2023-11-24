'use client'
import React, { ChangeEvent, useState } from 'react';
import './style.css'

export type SearchProps = {
    onSearch: (value: string) => void
}

const Search = (props: SearchProps) => {
    const { onSearch } = props;
    const [value, setValue] = useState('Enter search...');

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { target } = event;
        setValue(target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Here, we call the onSearch function and pass the value
            onSearch(value);
        }
    };

    return (
        <div className="relative w-full text-gray-600">
            <input
                type="search"
                name="search"
                placeholder={value}
                style={{
                    backgroundColor: '#ffffff',
                    height: '40px',
                    padding: '10px 15px',
                    width: '100%',
                    borderRadius: '20px',
                    border: '1px solid #ccc',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease-in-out',
                    borderColor: 'rgba(99, 179, 237, 0.5)',

                }}
                onChange={(event) => searchHandler(event)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
            />
            <button
                type="submit"
                style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: '#ffffff',
                    border: 'none',
                    cursor: 'pointer',
                    outline: 'none',
                }}
                aria-label="Search Button"
            >
                <svg
                    className="h-6 w-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M13.53 14.47a8 8 0 111.414-1.414l3.96 3.96a1 1 0 01-1.414 1.414l-3.96-3.96zM8 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>

    );
};

export default Search;