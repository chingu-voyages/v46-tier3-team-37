"use client"
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Button from "@/components/uiComponents/Button";
import Card from "@/components/uiComponents/Card";
import { ItemComplete } from "@/types/schemaTypes";
import s from "./page.module.css";


const SearchResults: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toolSearch = searchParams.get('toolName');

    const [isLoading, setLoading] = React.useState<boolean>(true);
    const [toolsData, setToolsData] = React.useState<ItemComplete[]>([]);
    const [sortBy, setSortBy] = React.useState<string>("name");

    let tools: ItemComplete[] = [];

    if (toolSearch) {
        tools = toolsData
            .filter(tool => tool.name.toLowerCase().includes(toolSearch.toLowerCase()));
    } else if (toolSearch == "") {
        tools = toolsData;
    }

    if (sortBy == "name") {
        tools = tools
            .sort((toolA, toolB) => {
                const nameA = toolA.name.toLowerCase();
                const nameB = toolB.name.toLowerCase();

                if (nameA < nameB) {
                    return -1
                }
                if (nameA > nameB) {
                    return 1
                }
                return 0;
            })
    }

    if (sortBy == "available") {
        tools = tools
            .filter(tool => tool.available === true)
    }

    if (sortBy == "price") {
        tools = tools
            .sort((toolA, toolB) => {
                return toolA.price - toolB.price;
            })
    }

    console.log('tools', tools)

    useEffect(() => {
        fetch('api/tools')
            .then((res) => res.json())
            .then((data: ItemComplete[]) => {
                setToolsData(data)
                setLoading(false)
            })
    }, []);


    const routeToItemPage = (toolId: string) => {
        router.push(`/tools/${toolId}`);
    }

    return (
        <section className={s.searchResults}>
            {isLoading
                ?
                <div>
                    Searching for tools...
                </div>
                :
                <div className={s.searchResultsContainer}>
                    {tools.length > 0
                        ?
                        <div className={s.searchResults}>
                            <div className={s.searchResultsTop}>
                                {toolSearch !== ""
                                    ?
                                    <div>Search results for &apos;&apos;{toolSearch}&apos;&apos;</div>
                                    :
                                    <div>Displaying all tools:</div>
                                }
                                <div className={s.sortOptionsContiner}>
                                    <div className={s.sortOptions}>
                                        <div className={s.sortBy}>
                                            <div>Sort by</div>
                                        </div>
                                        <select className={s.sortByOptions} onChange={e => {
                                            setSortBy(e.target.value)
                                        }}>
                                            <option value="price">Price</option>
                                            <option value="name" selected={true}>Name</option>
                                            <option value="available">Available now</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {tools.map(tool => (
                                <div className="flex justify-center mt-4" key={tool.id}>
                                    <div className="flex gap-2 flex-col md:w-1/2">
                                        <div onClick={() => routeToItemPage(tool.id)} key={tool.id}>
                                            <Card size={'md'} active={true} variant={'default'}
                                                title={tool.name}
                                                description={tool.description}
                                                price={tool.price.toString()}
                                                imageSrc={tool.images.length ? tool.images[0].url : 'https://www.harborfreight.com/media/catalog/product/cache/9fc4a8332f9638515cd199dd0f9238da/6/7/67716_W3.jpg'}>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        :
                        <div>No tools found for `{toolSearch}`</div>
                    }
                </div>
            }
        </section>
    )
}

export default SearchResults;