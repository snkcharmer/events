import EventList from "@/components/events/event-list";
// import { getAllEvents } from "@/dummy-data";
import { getAllEvents } from "@/helpers/api-util";
import EventsSearch from "@/components/events/events-search";
import { useRouter } from "next/router";

export default function AllEventsPage() {
  const allEvents = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={allEvents} />
    </>
  );
}
