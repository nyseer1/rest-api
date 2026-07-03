//dynamic segment (nextjs) created by wrapping file or folder name in square brackets: [segmentName]
// import Link from 'next/link';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Box, Button, Grid, GridCol, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import { BsBoxArrowUpRight } from "react-icons/bs";
import ListingService from "@/services/listing.service";

export default function HomePage() {
    const [listings, setListings] = useState([]);
    const [currentListing, setCurrentListing] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchName, setSearchName] = useState("");

    //TODO MAKE THESE ASYNC AWAIT
    //TODO ONLY CALLED TWO TIMES SO JUST INITIALIZE IT HERE AND THERE.
    //https://stackoverflow.com/a/55854902/32664082
    const retrieveListings = () => {
        ListingService.getAll()
            .then((response) => {
                setListings(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    //does this once on page load
    useEffect(() => {
        const retrieveListings = () => {
            ListingService.getAll()
                .then((response) => {
                    setListings(response.data);
                    console.log(response.data);
                })
                .catch((e) => {
                    console.log(e);
                });
        };

        retrieveListings();
    }, []);

    const onChangeSearchName = (e) => {
        setSearchName(e.target.value);
    };

    const refreshList = () => {
        retrieveListings();
        setCurrentListing(null);
        setCurrentIndex(-1);
    };

    const setActiveListing = (listing, index) => {
        setCurrentTutorial(listing);
        setCurrentIndex(index);
    };

    const removeAllListings = () => {
        ListingService.removeAll()
            .then((response) => {
                console.log(response.data);
                refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const findByName = () => {
        TutorialService.findByName(searchName)
            .then((response) => {
                setTutorials(response.data);
                setCurrentTutorial(null);
                setCurrentIndex(-1);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    return (
        <>
            <div id="home-section" />
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
                            <Button size="lg" component="a" href="/add" color="dark">
                                Listings:
                                <BsBoxArrowUpRight style={{ padding: "3px" }} />
                            </Button>
                            <input key={"search"} defaultValue={"Search here"}></input>
                        </Group>
                    </GridCol>
                    <GridCol span={{ base: 12, md: 4, lg: 4 }} />
                </Grid>
                <br />
                <br />
                <br />
                {/*  */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* LEFT COLUMN: SEARCH + LIST */}
                    <div className="flex-1">
                        <div className="flex mb-4">
                            <input
                                type="text"
                                className="border border-gray-300 rounded-l px-2 py-1 w-full"
                                placeholder="Search by title"
                                value={searchName}
                                onChange={onChangeSearchName}
                            />
                            <Button
                                className="bg-blue-500 text-white px-4 py-1 rounded-r"
                                onClick={findByName}
                            >
                                Search
                            </Button>
                        </div>

                        <h4 className="font-bold text-lg mb-2">Tutorials List</h4>
                        <ul className="divide-y divide-gray-200 border border-gray-200 rounded">
                            {listings.map((listing, index) => (
                                <li
                                    className={
                                        "px-4 py-2 cursor-pointer " +
                                        (index === currentIndex ? "bg-blue-100" : "")
                                    }
                                    onPointerDown={() => setActiveListing(listing, index)}
                                    key={listing.id}
                                >
                                    {listing.name}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className="bg-red-500 text-white px-3 py-1 rounded mt-4"
                            onClick={removeAllListings}
                        >
                            Remove All
                        </Button>
                    </div>

                    {/* RIGHT COLUMN: DETAILS */}
                    <div className="flex-1">
                        {currentTutorial ? (
                            <div className="p-4 bg-white rounded shadow">
                                <h4 className="font-bold text-xl mb-2">Tutorial</h4>
                                <div className="mb-2">
                                    <strong>Title: </strong>
                                    {currentTutorial.title}
                                </div>
                                <div className="mb-2">
                                    <strong>Description: </strong>
                                    {currentTutorial.description}
                                </div>
                                <div className="mb-2">
                                    <strong>Status: </strong>
                                    {currentTutorial.published ? "Published" : "Pending"}
                                </div>

                                <Link
                                    to={`/tutorials/${currentTutorial.id}`}
                                    className="inline-block bg-yellow-400 text-black px-3 py-1 rounded"
                                >
                                    Edit
                                </Link>
                            </div>
                        ) : (
                            <div>
                                <p>Please click on a Tutorial...</p>
                            </div>
                        )}
                    </div>
                </div>
                {/*  */}

                {/* Content of the section */}
                <div id="project-section">
                    <Grid>
                        <GridCol span={{ base: 10, md: 3, lg: 3 }} />

                        <GridCol span={{ base: 12, md: 6, lg: 6 }}>
                            <h1>Featured Listings:</h1>
                        </GridCol>

                        {/* button group */}
                    </Grid>
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
                    <br /> <br /> <br />
                    <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
                    <br />
                    {/* end of project section */}
                </div>
            </Box>
        </>
    );
}
