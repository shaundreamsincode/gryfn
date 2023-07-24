import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import {Typography} from "@material-ui/core";
import { List, ListItem } from "@material-ui/core";

const Analytics = () => {
    const [chatCreatedEvents, setChatCreatedEvents] = useState([])
    const [summaryEmailSentEvents, setSummaryEmailSentEvents] = useState([])
    const [homePageViewedEvents, setHomePageViewedEvents] = useState([])

    useEffect(() => {
        ApiService.get('api/v1/analytics').then((response => {
            debugger

            setChatCreatedEvents(response.data.chat_created_events)
            setSummaryEmailSentEvents(response.data.summary_email_sent_events)
            setHomePageViewedEvents(response.data.home_page_viewed)

        }))
    }, [])
    if (!chatCreatedEvents || !summaryEmailSentEvents) {
        return(<div>Loading</div>)

    }

    return(<div>
        <Typography>
            Chat(s) created: { chatCreatedEvents.length }
        </Typography>

        <List>
            { chatCreatedEvents.map((event) => <ListItem>{ event.created_at }</ListItem>) }
        </List>

        <Typography>
            Summary email(s) sent: { summaryEmailSentEvents.length }
        </Typography>

        <List>
            { summaryEmailSentEvents.map((event) => <ListItem>{ event.created_at }</ListItem>) }
        </List>

        <Typography>
            Home page view(s): { homePageViewedEvents.length }
        </Typography>

        <List>
            { homePageViewedEvents.map((event) => <ListItem>{ event.created_at }</ListItem>) }
        </List>
    </div>)
}

export default Analytics