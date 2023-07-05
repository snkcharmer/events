import EventList from "@/components/events/event-list";
// import { getFilteredEvents } from "@/dummy-data";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import ResultsTitle from "@/components/events/results-title";
import useSWR from "swr";
import { useEffect,useState } from "react";

export default function FilteredEventPage(props) {
  const router = useRouter();
  const filterData = router.query.slug;

  const {data,error} = useSWR('https://events-project-81123-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
  useEffect
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (props.hasError) {
    return <p>Invalid filter, Please adjust your values!</p>;
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length == 0) {
    return <p className="center">No events found</p>;
  }

  const date = new Date(props.year, props.month - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (isNaN(numYear) || isNaN(numMonth)) {
    return {
      props: { hasError: true }
      // notFound: true,

      /* redirect: {
        destination: '/error'
      } */
    };
  }

  const filteredEvents = await getFilteredEvents({ 
    year: numYear, 
    month: numMonth 
  });

  return {
    props: {
      events: filteredEvents,
      year: numYear, 
     month: numMonth 
    }
  }
}
