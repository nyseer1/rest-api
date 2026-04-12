//dynamic segment (nextjs) created by wrapping file or folder name in square brackets: [segmentName]
// import Link from 'next/link';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Box, Button, Grid, GridCol, Group } from "@mantine/core";
import { BsBoxArrowUpRight } from "react-icons/bs";

export default function HomePage() {
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
              <Button
                size="lg"
                component="a"
                href="/api/listings/add"
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
