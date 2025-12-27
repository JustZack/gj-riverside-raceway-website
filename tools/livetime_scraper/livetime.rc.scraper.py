import bs4, requests, json
from datetime import datetime
from zoneinfo import ZoneInfo


class EventBrief():
    def __init__(self, row: bs4.element.Tag):
        cols = row.find_all("td")
        first = cols[0]
        
        # The ID is in a url like this: /results/?p=view_event&id=488422
        self.event_id = int(first.find("a")["href"].split("&id=")[-1])
        self.name = first.text.strip()

        # the date is formatted like: <span class="hidden">2025-12-02 00:00:00</span>Dec 2, 2025
        date_str = cols[1].find("span").text.strip()
        # Convert MST to UTC and format as ISO 8601: "2024-07-15T18:00:00.000Z"
        date_obj = datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S")
        # Make timezone-aware as MST, then convert to UTC
        date_mst = date_obj.replace(tzinfo=ZoneInfo("America/Denver"))
        date_utc = date_mst.astimezone(ZoneInfo("UTC"))
        self.date = date_utc.strftime("%Y-%m-%dT%H:%M:%S.000Z")

        # These values are just numeric in the table
        self.entries = int(cols[2].text.strip())
        self.drivers = int(cols[3].text.strip())

        self.livetime_path = f"/results/?p=view_event&id={self.event_id}"

        self.laps = 0

    def add_statistics(self, laps: int):
        self.laps = laps
    
    def __str__(self):
        return f"EventBrief(event_id={self.event_id}, name={self.name}, date={self.date}, entries={self.entries}, drivers={self.drivers})"


# The root URL for our livetime instance
LIVETIME_ROOT_URL = "https://jjsraceway.liverc.com/"
def get_livetime_url(path: str) -> str: return LIVETIME_ROOT_URL + path.lstrip("/")

def scrape_url(url: str) -> bs4.BeautifulSoup:
    response = requests.get(url)
    soup = None
    if response.status_code == 200:
        soup = bs4.BeautifulSoup(response.content, 'html.parser')
    else:
        raise Exception(f"Failed to retrieve content from {url}, status code: {response.status_code}")
    return soup

def scrape_livetime_page(path: str) -> bs4.BeautifulSoup:
    url = get_livetime_url(path)
    return scrape_url(url)

def extract_events() -> list[EventBrief]:
    soup = scrape_livetime_page("/events/")

    events = []
    # The events table on /events has ID #events 
    # and is loaded all at once
    events_table = soup.find("table", {"id": "events"})
    event_rows = events_table.find("tbody").find_all("tr")
    for row in event_rows:
        cols = row.find_all("td")
        first = cols[0]
        
        # The ID is in a url like this: /results/?p=view_event&id=488422
        id = first.find("a")["href"].split("&id=")[-1]
        name = first.text.strip()

        # the date is formatted like: <span class="hidden">2025-12-02 00:00:00</span>Dec 2, 2025
        date = cols[1].find("span").text.strip()

        # These values are just numeric in the table
        entries = int(cols[2].text.strip())
        drivers = int(cols[3].text.strip())

        event_brief = EventBrief(row)
        events.append(event_brief)
    events.reverse()  # Reverse to have oldest events first
    return events

def export_events_to_json(events: list[EventBrief], filepath: str):
    eventsData = []
    livetimeData = []
    for event in events:
        eventsData.append({
            "start": event.date,
            "end": event.date,
            "name": event.name,
            "visible": True,
            "cancelled": False,
            "livetimeID": event.event_id,
            "updatedAt": event.date,
            "createdAt": event.date
        })

        livetimeData.append({
            "id": event.event_id,
            "name": event.name,
            "entries": event.entries,
            "drivers": event.drivers,
            "laps": event.laps,
            "startedAt": event.date,
            "createdAt": event.date,
            "updatedAt": event.date
        })

    totalData = {
        "TrackEvents": eventsData,
        "LiveTimeEvent": livetimeData
    }
    with open(filepath, 'w') as f: json.dump(totalData, f, indent=4)

if __name__ == "__main__":
    events = extract_events()
    for event in events: print(event)
    export_events_to_json(events, "seed.data.json")










