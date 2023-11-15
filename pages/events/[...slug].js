import EventList from "@/components/events/event-list";
// import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import ResultsTitle from "@/components/events/results-title";
import useSWR, { SWRConfig } from "swr";
import { useEffect, useState } from "react";
import ErrorAlert from "@/components/error-alert/error-alert";
import Button from "@/components/ui/button";

export default function FilteredEventPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://events-project-81123-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );
  // console.log(data);
  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (isNaN(numYear) || isNaN(numMonth) || error) {
    return <p>Invalid filter, Please adjust your values!</p>;
  }

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">No events found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

/* export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return {
      props: { hasError: true },
      // notFound: true,

      // redirect: {
      //   destination: '/error'
      // } 
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      year: numYear,
      month: numMonth,
    },
  };
} */
