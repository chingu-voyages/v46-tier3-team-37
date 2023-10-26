"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
// import { Tool } from "@/types/schemaTypes";
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import s from "./page.module.css";


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

    let toolsByName: Tool[] = [];

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


    return (
        <div className={s.searchResultsContainer}>
            {toolsByName.length > 0
                ?
                <div className={s.searchResults}>
                    <div>Search results for &apos;'{toolName}'&apos;</div>
                    {toolsByName.map(tool => (
                        <div className="flex justify-center mt-4" key={tool.id}>
                            <div className="flex gap-2 flex-col md:w-1/2">
                                <div key={tool.id}>
                                    <Card active={true} variant={'default'} title={tool.name} description={tool.description} >
                                        <Button variant={'thin'} size={'sm'} cardType='detailed'>More info</Button>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div>No tools found for `{toolName}`</div>
            }
        </div>
    )
}

export default SearchResults;