"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';




const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const toolName = searchParams.get('searchInput');

    const [toolsData, setToolsData] = React.useState<any[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true)


    useEffect(() => {
        fetch('api/tools')
        .then((res) => res.json())
        .then((data) => {
            setToolsData(data)
            setLoading(false)
        })
    }, [])


    console.log('data', toolsData)


    return (
        <div>
            search results
        </div>
    )
}

export default SearchResults;