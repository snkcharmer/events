import Link from "next/link";
import classes from './event-item.module.css';
import Button from '../ui/button';

export default function EventItem(props) {
    const { title, image, date, location, id } = props;
    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    const formatAddress = location.replace(', ','\n');
    const exploreLink = `/events/${id}`;

    return <li className={classes.item}>
        <img src={'/' + image } alt="" />
        <div className={classes.content}>
            <div className={classes.summary}>
                <h2>{title}</h2>
                <div className={classes.date}>
                    <time>{humanReadableDate}</time>
                </div>
                <div className={classes.address}>
                    <address>{formatAddress}</address>
                </div>
            </div>
            <div className={classes.content}>
                <Button link={exploreLink}>Explore Event</Button>
            </div>
        </div>
    </li>
}