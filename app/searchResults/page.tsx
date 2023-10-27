"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { Tool } from "@/types/schemaTypes";
import s from "./page.module.css";


const SearchResults: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toolName = searchParams.get('toolName');

    const [toolsData, setToolsData] = React.useState<Tool[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    let toolsByName: Tool[] = [];

    if (toolName) {
        toolsByName = toolsData
            .filter(tool => tool.name.toLowerCase().includes(toolName.toLowerCase()));
    }

    console.log('toolsData', toolsData)

    useEffect(() => {
        fetch('api/tools')
            .then((res) => res.json())
            .then((data: Tool[]) => {
                setToolsData(data)
                setLoading(false)
            })
    }, []);

    const routeToItemPage = (toolId: string) => {
        router.push(`/tools/${toolId}`);
    }

    return (
        <div className={s.searchResultsContainer}>
            {toolsByName.length > 0
                ?
                <div className={s.searchResults}>
                    <div>Search results for &apos;&apos;{toolName}&apos;&apos;</div>
                    {toolsByName.map(tool => (
                        <div className="flex justify-center mt-4" key={tool.id}>
                            <div className="flex gap-2 flex-col md:w-1/2">
                                <div onClick={() => routeToItemPage(tool.id)} key={tool.id}>
                                    <Card size={'md'} active={true} variant={'default'} title={tool.name} description={tool.description} price={tool.price.toString()} >
                                        {/* <Button variant={'thin'} size={'sm'} cardType='detailed'>More info</Button> */}
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