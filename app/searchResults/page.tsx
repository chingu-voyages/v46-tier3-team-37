"use client"
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { Item, ItemWithImages } from "@/types/schemaTypes";
import s from "./page.module.css";


const SearchResults: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toolName = searchParams.get('toolName');

    const [toolsData, setToolsData] = React.useState<ItemWithImages[]>([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    let toolsByName: ItemWithImages[] = [];

    if (toolName) {
        toolsByName = toolsData
            .filter(tool => tool.name.toLowerCase().includes(toolName.toLowerCase()));
    }

    console.log('toolsData', toolsData)

    useEffect(() => {
        fetch('api/tools')
            .then((res) => res.json())
            .then((data: ItemWithImages[]) => {
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
                                    <Card size={'md'} active={true} variant={'default'} title={tool.name} description={tool.description} price={tool.price.toString()} imageSrc={tool.images.length ? tool.images[0].url : 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg'}>
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