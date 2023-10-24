"use client"

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Tool = {
    id: string,
    description: string,
    location: string,
    name: string,
    ownerId: string,
    price: number
}


const SearchResults: React.FC = () => {
    const searchParams = useSearchParams();
    const toolName = searchParams.get('toolName');

    const [toolsData, setToolsData] = React.useState<Tool[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    let toolsByName: Tool[];
    if (toolName) {
        toolsByName = toolsData
            .filter(tool => tool.name.toLowerCase().includes(toolName.toLowerCase()));
    }

    useEffect(() => {
        fetch('api/tools')
            .then((res) => res.json())
            .then((data: Tool[]) => {
                setToolsData(data)
                setLoading(false)
            })
    }, [])


    console.log('data', toolsData)
    console.log('toolsByName', toolsByName)


    return (
        <div>
            <div>SEARCH RESULTS</div>
        </div>
    )
}

export default SearchResults;