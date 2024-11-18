"use client";

import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RecipeType } from "@/types";
import { RecipeContext } from "@/context/recipe-context";
import Link from "next/link";
import Image from "next/image";

export default function RecipeList({ recipes }: { recipes: Array<RecipeType> }) {
    const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);
    const {
        state: { selectedCuisine },
    } = useContext(RecipeContext);

    useEffect(() => {
        const getFilteredRecipes = async () => {
            const filtered = recipes.filter((recipe: RecipeType) => recipe.cuisine === selectedCuisine);
            setFilteredRecipes(filtered);
        };

        if (selectedCuisine) {
            getFilteredRecipes();
        }
    }, [recipes, selectedCuisine]);

    return (
        <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-x-10 gap-y-20 xl:gap-y-12 pt-12">
            {(filteredRecipes.length > 0 ? filteredRecipes : recipes).map((recipe: RecipeType, idx: number) => (
                <Link href={`/recipes/${recipe.id}`} key={`${recipe.name}-${idx}`}>
                    <Card
                        className="flex flex-col bg-orange-50 hover:scale-105 ease-in duration-200 fancyGradient"
                    >
                        <CardHeader>
                            <Image
                                src={recipe.image}
                                alt={recipe.name}
                                width={500}
                                height={500}
                                className="bg-cover rounded-md shadow-xl"
                            />
                        </CardHeader>
                        <CardContent>
                            <CardTitle className="uppercase lg:text-3xl relative font-bold line-clamp-2">
                                {recipe.name}
                            </CardTitle>
                        </CardContent>
                        <CardFooter className="flex items-start gap-2 lg:content-between lg:flex-row flex-col">
                            <div className="flex flex-col">
                                <p className="text-lg">Serves</p>
                                <p className="text-gray-800">{recipe.servings}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg">Prep Time</p>
                                <p className="text-gray-800">{recipe.prepTimeMinutes} MIN</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-lg">Cook Time</p>
                                <p className="text-gray-800">{recipe.cookTimeMinutes} MIN</p>
                            </div>
                        </CardFooter>
                    </Card>
                </Link>
            ))}
        </div>
    );
}
