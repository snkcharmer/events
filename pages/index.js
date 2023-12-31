import EventList from "@/components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
// import { getFeaturedEvents } from "@/dummy-data";
import Head from "next/head";
import NewsletterRegistration from "@/components/input/newsletter-registration";

export default function Home(props) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Events</title>
        <meta name="description" content="Find your wonderful events" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
