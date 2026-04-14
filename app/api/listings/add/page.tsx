"use client"; //required for useState
//dynamic segment (nextjs) created by wrapping file or folder name in square brackets: [segmentName]
// import Link from 'next/link';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Box, Button, Grid, GridCol, Group } from "@mantine/core";
import { BsBoxArrowUpRight } from "react-icons/bs";
import ListingService from "@/services/listing.service";
import { useState } from "react";

export default function AddListing() {

    const [name, setName] = useState('Cat-Nip');
    const [sellerName, setSellerName] = useState('Cat-Food-Co');
    const [price, setPrice] = useState(1.00);
    const [verified, setVerified] = useState(false);
    const [posted, setPosted] = useState(false); //check if listing was posted
    const data = { name, sellerName, price, verified };

    const saveListing = async () => {
        //TODO FORM VALIDATION(https://vinejs.dev/docs/introduction) AND MAKE SURE ROUTES ALIGN WITH AXIOS ROUTES. (CORS HEADER 'Access-Control-Allow-Origin' missing)
        //TODO ALSO USE MANTINE CARDS FOR EACH ENTITY LISTED USING A .MAP ON AN ARRAY OF ENTITIES. https://mantine.dev/core/card/
        //TODO STUDY THIS MORE TOO https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes
        //this console log shows in browser console since whole page is a client component. i might move this section to a different page if the whole page needs to be a svr component
        console.log('attempting saveListing')
        try {
            const response = await ListingService.create(data);
            console.log(response.data);
            setPosted(true);
        }
        catch (e) {
            console.log(e);
        }
    }

    const newListing = () => {
        setName('');
        setSellerName('');
        setPrice(1.00);
        setVerified(false);
        setPosted(false); //restart listing submission
    }



    return (
        <>
            <div id="home-section" />
            <div className="max-w-sm mx-auto p-4 bg-white rounded shadow">
                {posted ? (
                    <div>
                        <h4 className="font-bold text-green-600 mb-4">
                            Tutorial submitted successfully!
                        </h4>
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                            onClick={newListing}
                        >
                            Add Another
                        </button>
                    </div>
                ) : (
                    <div>
                        <h4 className="font-bold text-xl mb-2">Add Listing</h4>

                        <div className="mb-2">
                            <label className="block mb-1 font-medium">Product</label>
                            <input
                                type="text"
                                className="border border-gray-300 rounded w-full px-2 py-1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="mb-2">
                            <label className="block mb-1 font-medium">Price</label>
                            <input type="number" id="price" name="price" min="1" max="5" step="0.01"
                                className="border border-gray-300 rounded w-full px-2 py-1"
                                value={price}
                                onChange={(e) => {
                                    if (Number(e.target.value) % 0.01 == 0) {
                                        setPrice(Number(e.target.value));
                                    } else {
                                        //tell user invalid must be within 
                                    }

                                }}
                            />
                        </div>

                        <Button
                            className="bg-green-500 text-white px-3 py-1 rounded mt-2"
                            onClick={saveListing}
                        >
                            Submit

                        </Button>
                    </div>
                )}
            </div>
            {/* <HeaderSimple /> */}

            <Box px={{ base: "sm", md: "xl" }}>
                {/* grouped by rows */}
                <Grid>
                    <GridCol span={{ base: 1, md: 5, lg: 5 }} />
                    <GridCol span={{ base: 12, md: 2, lg: 2 }}>
                        {/* <Image
                            component={NextImage}
                            radius="lg"
                            h={200}
                            w="auto"
                            fit="contain"
                            src={myPhoto}
                            alt="My image"
                        /> */}

                        <br />
                        <br />
                        <br />
                    </GridCol>
                    <GridCol span={{ base: 1, md: 5, lg: 5 }} />

                    <GridCol span={{ base: 12, md: 4, lg: 4 }} />
                    <GridCol span={{ base: 12, md: 4, lg: 4 }}>
                        <Group justify="center">
                            {/* <Button size="lg" component="a" href="#contact-section" color='lightseagreen'>
                Say Hello
              </Button> */}
                            <Button
                                size="lg"
                                component="a"
                                href="/add"
                                color="dark"
                            >
                                Add Listing
                                <BsBoxArrowUpRight style={{ padding: '3px', }} />
                            </Button>
                            <input key={'search'} defaultValue={'Search here'}></input>
                        </Group>
                    </GridCol>
                    <GridCol span={{ base: 12, md: 4, lg: 4 }} />
                </Grid>
                <br />
                <br />
                <br />


                {/* Content of the section */}
                <div id="project-section">
                    <Grid>
                        <GridCol span={{ base: 10, md: 3, lg: 3 }} />

                        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
                            <h1>Featured Listings:</h1>
                        </GridCol>

                        {/* button group */}
                    </Grid>


                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />

                    {/* end of project section */}
                </div>
            </Box>
        </>
    );
}
