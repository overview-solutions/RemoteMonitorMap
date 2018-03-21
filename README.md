# RemoteMonitorMap

# Introduction
As the IEEE Smart Village committee is tracking and supporting the advancement of several micro-grid projects across the African continent,
this is a map to showcase many of those projects, as well as track overall progress of energy and telecom access throughout the region.

# Map Data
Taking inspiration from the [Open Infrastructure Map](https://openinframap.org/#4/31.99/-40.91/Power-Telecoms), the goal of this map is to 
feature up-to-date information on the existing infrastructure, as well as additional geolocated datasets on specific micro-grid sites.
This is primarily using the [power=lines](https://wiki.openstreetmap.org/wiki/Power) data from OSM at the moment.

# Mapping Tools
The power line data is pulled from OSM using [this site](http://overpass-turbo.eu/), and then uploaded into [Mapbox](https://www.mapbox.com/) Studio as a set of tilesets.
These tilesets are combined into the following Mapbox Style: mapbox://styles/earthadam/cjf0rz4yj6dj32sliavy2l0dg

# Goals
1. Integrate this into the [IEEE Smart Village](http://ieee-smart-village.org/) website.
2. Add data visualizations like [these](http://kw4h.org/dashboard/db/filibaba?refresh=1m&orgId=2) for remote monitoring
 - Considering the use of [D3.js](https://d3js.org/) instead of [Grafana](https://grafana.com/) (used in kw4h Dashboard.
3. Determine best methods for editing and adding new power lines into the OSM power layers ([iD?](http://ideditor.com/), [JOSM?](https://josm.openstreetmap.org/))
4. Add telecom data as necessary
5. Determine ways of highlighting areas of need (lack of infrastructure)

# Useful links
See this [Mapbox + OSM project](https://mapbox.gitbooks.io/open-data-openstreetmap/content/Case%20studies/seattle-automatization-of-updating-curb-situation-in-seattle.html) to map sidewalk accessibility in Seattle.
A Smart City startup called [FOAM](https://www.foam.space/) in NYC using Mapbox in their stack, along with some other things that might be useful for data visualization
