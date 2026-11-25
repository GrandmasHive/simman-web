export type Block =
  | { h2: string }
  | { p: string }
  | { ul: string[] };

export type Author = {
  name: string;
  role: string;
  image?: string; // path under /public, e.g. /authors/sanket-modi.jpg
};

// A post that first ran on another site. The page points its canonical URL there and
// says where it first appeared, with a link.
export type FirstPublished = {
  outlet: string; // e.g. "HospitalityTech Edition"
  url: string; // the original article's full URL
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO
  readingMinutes: number;
  author?: Author; // omitted: the post is by Simplified Management
  firstPublished?: FirstPublished;
  content: Block[]; // a p block may carry inline links as [text](https://...)
};

export const posts: Post[] = [
  {
    slug: "small-properties-should-price-busy-dates-by-written-rule",
    title: "Small Properties Should Price Busy Dates by Written Rule",
    description: "Hotel rates in India rose faster than occupancy last quarter. Small properties should set busy-date prices months ahead, from their own booking records.",
    category: "Column",
    date: "2026-11-25",
    readingMinutes: 5,
    author: {
      name: "Sanket Modi",
      role: "Managing Director, Simplified Management",
      image: "/authors/sanket-modi.jpg"
    },
    firstPublished: {
      outlet: "HospitalityTech Edition",
      url: "https://hospitalitytechedition.com/opinion/small-properties-should-price-busy-dates-by-written-rule/"
    },
    content: [
      {
        p: "India's listed hotel companies filed their July to September results this month, and the figures on price point one way. In its [investor presentation filed with the stock exchanges on 21 November](https://www.bseindia.com/xml-data/corpfiling/AttachLive/7a09d18c-1d81-4193-a26a-e9ed7426443e.pdf), EIH Associated Hotels cites HVS Anarock data showing industry occupancy up 1 to 3% on a year earlier, while the average room rate rose 8 to 10% to between ₹8,300 and ₹8,500 a night. The company's management adds: \"We continue to observe year-on-year increase in average rates across all regions.\""
      },
      {
        p: "Apeejay Surrendra Park Hotels reported 94% occupancy for the same quarter in [its presentation filed on 17 November](https://www.bseindia.com/xml-data/corpfiling/AttachLive/33ba9d03-8b45-4b17-b224-c7f3048bdc85.pdf). Its managing director, Vijay Dewan, said: \"In Q2 FY27, we have delivered double-digit operating EBITDA growth of 11 % supported by 94% occupancy, among the highest in India, and with continued leadership in RevPAR in the upper-upscale segment.\""
      },
      {
        p: "These are large hotels in big cities, and I would not carry their numbers over to a six room homestay in Coorg or a villa in Goa. The method carries over. The groups that are lifting their rates decide prices by date, from their own data, well before a guest calls."
      },
      {
        p: "My view is that every small property should do the same at its own scale: write down its prices for busy dates months ahead, set them from its own booking history, and use the same price everywhere it sells."
      },
      {
        h2: "The case for keeping one price"
      },
      {
        p: "The strongest argument against this deserves a fair hearing. A small property lives on goodwill. A family that comes back every December remembers what it paid last year, and a sharp rise on a festival weekend can read as greed. A guest who sees one rate on a booking site and hears another on the phone stops trusting both. The homestay down the road may hold its rate and take the booking."
      },
      {
        p: "I agree that guests remember prices, and that is the reason to plan them. A rise that is set in advance, applied the same way on every channel and limited to the dates where demand is clear is easy to explain. A loyal family can be given last year's rate as a written rule of its own. The price that damages trust is the one invented on the spot, when the owner hears that a wedding is in town and quotes whatever feels right that morning."
      },
      {
        p: "Guests and regulators are also asking for prices that hold up. This site reported that [UK pricing rules put hotel resort fees and restaurant charges in the total price](https://hospitalitytechedition.com/news/uk-cma-total-price-rules-hotel-resort-fees-restaurant-charges/), and a RateGain audit found that [57% of the European luxury hotels it checked hide the total price](https://hospitalitytechedition.com/news/rategain-europe-direct-booking-friction-audit-57-percent-hide-total-price/) on their own sites. Those rules apply in Britain and Europe, and India has its own. Both point toward one full price, shown early."
      },
      {
        h2: "What a written price plan looks like"
      },
      {
        p: "Large chains buy software for this. This site reported that [B&B Hotels selected Duetto for revenue management](https://hospitalitytechedition.com/news/bb-hotels-selects-duetto-revenue-management/) across more than 930 hotels. A property with six rooms can start with a notebook or a spreadsheet and an hour a week."
      },
      {
        ul: [
          "Mark the dates that matter for your town: long weekends, the run from Diwali to New Year, local festivals, school holidays in the cities your guests come from, and the wedding dates families in your area have fixed.",
          "Look at last year's bookings for those dates. Note how early each one filled and at what price.",
          "Set three or four rate levels, such as a quiet weekday, a weekend, a peak date and an event date, and write down which dates get which level.",
          "Set a floor for quiet weekdays: the lowest rate you will accept, so a slow Tuesday does not push the price below your costs.",
          "Load the same rates on every booking site and on the list your caretaker quotes from, with taxes included in the price you show.",
          "Review the plan once a week. Move a date up a level only when bookings for it are coming in faster than they did last year."
        ]
      },
      {
        h2: "Why this season"
      },
      {
        p: "EIH Associated Hotels' management expects demand to stay strong through FY27, supported by meetings and events travel and an expected revival in foreign tourists. The same presentation notes that domestic air traffic fell about 6% on a year earlier in the quarter, citing DGCA data, which it puts down to rising aviation fuel prices, capacity limits and regional pressures."
      },
      {
        p: "I read that as a reason for properties within driving distance of the big cities to watch their own enquiries closely this winter. A family that skips a flight may still take a long weekend by road. A property with its prices already written down can answer each enquiry in a minute, at a rate it chose with a clear head."
      },
      {
        p: "If I ran a small property this week, I would open the calendar for December to February, mark every date that sold out last year, and write a rate next to each one before the first wedding enquiry of the season comes in."
      },
      {
        p: "Source: [EIH Associated Hotels, Q2 FY27 investor presentation (BSE filing, 21 November 2026)](https://www.bseindia.com/xml-data/corpfiling/AttachLive/7a09d18c-1d81-4193-a26a-e9ed7426443e.pdf); [Apeejay Surrendra Park Hotels, Q2 FY27 investor presentation (17 November 2026)](https://www.bseindia.com/xml-data/corpfiling/AttachLive/33ba9d03-8b45-4b17-b224-c7f3048bdc85.pdf)"
      }
    ]
  },
  {
    slug: "small-properties-need-their-own-repeat-guest-list",
    title: "Small Properties Need Their Own Repeat Guest List",
    description: "EaseMyTrip reports a repeat booking rate above 90%. Sanket Modi says small hotels and homestays should earn the second stay from their own guest records.",
    category: "Column",
    date: "2026-11-18",
    readingMinutes: 4,
    author: {
      name: "Sanket Modi",
      role: "Managing Director, Simplified Management",
      image: "/authors/sanket-modi.jpg"
    },
    firstPublished: {
      outlet: "HospitalityTech Edition",
      url: "https://hospitalitytechedition.com/opinion/small-properties-need-their-own-repeat-guest-list/"
    },
    content: [
      {
        p: "EaseMyTrip's results for the July to September quarter, [filed with the stock exchanges on 14 November](https://www.bseindia.com/xml-data/corpfiling/AttachLive/006e8681-2acc-447f-aa4d-2242ce1dfb1e.pdf), put a number on something small property owners in India see every season. The company says hotel segment bookings rose to 7.9 lakh from 4.2 lakh a year earlier, growth of 87.5%, and that Hotels and Packages revenue rose 188.8% to ₹92 crore."
      },
      {
        p: "The line I keep returning to comes from the company's co-founder and chief executive, Rikant Pittie: \"With a customer repeat booking rate exceeding 90%, we have an established base of loyal customers.\""
      },
      {
        p: "That is a strong position for a travel platform. It also tells hotel and homestay owners where a returning guest's habit sits today. If a family that stays in a Shimla cottage this December wants to come back next year, the natural place for them to start is the app they used the first time."
      },
      {
        p: "My view is that every small property should keep its own list of past guests and earn a share of their next stay directly, within the rules of the sites it sells on."
      },
      {
        h2: "The case for leaving it to the platforms"
      },
      {
        p: "The strongest argument against this is a fair one. The booking site found the guest, paid for the marketing and handled the payment. An owner with four rooms and two staff has no time for email campaigns, and a property that pushes guests off a platform can break its contract and lose its place in search results."
      },
      {
        p: "I agree with most of that. Booking sites are how strangers find a small property, and I would never ask an owner to drop one or to steer a guest away in the middle of a booking. Read each site's terms on guest contact before you do anything with guest details, and follow them."
      },
      {
        p: "The argument runs out at the second stay. That booking comes from the stay itself, from the room, the breakfast and the caretaker who arranged a cab at five in the morning. The property earned that guest's trust, and it should keep a record of it."
      },
      {
        h2: "Guest details are getting harder to keep"
      },
      {
        p: "That record is also getting thinner. This site reported in October that [Booking.com stops sending guest phone numbers to hotel systems](https://hospitalitytechedition.com/news/booking-com-stops-sending-guest-phone-numbers-hotel-systems/), according to Mews and Smoobu, which leaves an owner with no number for pre-arrival messages on those bookings. Asking the guest at check-in, with their consent, is the simplest way to keep that number."
      },
      {
        p: "Some guests already prefer to book with the property itself. A TravelBoom survey of 500 leisure travellers, fielded in October, found that [OTA share of leisure bookings fell to 32.8% while hotel websites held at 18%](https://hospitalitytechedition.com/articles/ota-leisure-booking-share-falls-hotel-websites-hold-18-percent-travelboom/). The survey was not run in India, and I would not carry its figures over. They do show that a steady share of travellers will book on a hotel's own site when one is there."
      },
      {
        h2: "What a repeat guest list looks like at a small property"
      },
      {
        p: "A small team can build one by writing down the same few details the same way for every stay."
      },
      {
        ul: [
          "At check-in, ask for a phone number and email address, and ask whether the guest is happy to hear from you about future stays. Write down the answer.",
          "Note why they came: a wedding in town, a school holiday, a work trip, a temple visit. The reason tells you when they are likely to travel again.",
          "Note which site they booked on and what they paid, so you can compare the cost of a direct booking with the commission on the same stay.",
          "Reply to their review, good or bad. Shiji's benchmark found that [hotels reply to reviews in 3.1 days](https://hospitalitytechedition.com/articles/hotel-review-reply-time-3-1-days-positive-mentions-shiji-q3-benchmark/) across the hotels it tracked, and a small property can match that pace."
        ]
      },
      {
        h2: "Where the money is"
      },
      {
        p: "A returning guest who books directly saves the owner the commission on that stay. For a property that fills its busy weekends through booking sites, that saving on even a handful of repeat stays a year adds up, and it comes from guests who already know the place."
      },
      {
        p: "The second gain matters more to me. An owner with a list of past guests can fill a quiet weekday in the monsoon with a message to the families who came last year and said yes to hearing from them."
      },
      {
        p: "If I ran a small property, I would start with the December bookings already in the calendar. Ask each of those guests for a number and their permission at check-in, note why they came, and send them one message with a direct booking link before the same season next year."
      },
      {
        p: "Source: [EaseMyTrip, Q2 FY27 media release (BSE filing, 14 November 2026)](https://www.bseindia.com/xml-data/corpfiling/AttachLive/006e8681-2acc-447f-aa4d-2242ce1dfb1e.pdf)"
      }
    ]
  },
  {
    slug: "airbnb-india-growth-case-for-selling-on-more-sites",
    title: "Airbnb's India Growth Makes the Case for Selling on More Sites",
    description: "Nights booked by Indian travellers on Airbnb grew over 60% in Q3. Small owners should list on more sites and set up their records first.",
    category: "Column",
    date: "2026-11-07",
    readingMinutes: 4,
    author: {
      name: "Sanket Modi",
      role: "Managing Director, Simplified Management",
      image: "/authors/sanket-modi.jpg"
    },
    firstPublished: {
      outlet: "HospitalityTech Edition",
      url: "https://hospitalitytechedition.com/opinion/airbnb-india-growth-case-for-selling-on-more-sites/"
    },
    content: [
      {
        p: "Airbnb's third-quarter shareholder letter carries one line that every homestay, villa and small hotel owner in India should read twice. Nights booked by guests from India grew by more than 60% on the platform, and the number of first-time bookers from India rose by more than 80%."
      },
      {
        p: "Airbnb calls it \"the second consecutive quarter of acceleration\" for India, which tells me this is a trend and more than a festival-season spike."
      },
      {
        p: "\"Origin\" matters here. These are Indian travellers, wherever they stay. That is the guest an owner in Lonavala, Coorg or Goa depends on for long weekends and school holidays, and that guest is now learning to book homes on a global platform at a fast clip."
      },
      {
        p: "My view is that owners should read this as a reason to sell on more booking sites, and to get their own records in order before they do."
      },
      {
        h2: "Why one site feels safe"
      },
      {
        p: "The strongest argument for staying on a single booking site is simplicity. One calendar, one payout, one set of reviews and one support desk. An owner with three rooms and no staff has a fair point when they say a second site means a second chance of selling the same night twice."
      },
      {
        p: "I take that seriously, because a clash costs real money. A cancelled guest leaves a bad review, the site may charge a penalty, and the owner spends the weekend on the phone."
      },
      {
        p: "Avoiding that risk has its own price. A property that lives on one site lives on that site's ranking rules, its commission and its view of which guests to show the listing to. When the site changes any of those, the owner finds out from an empty calendar."
      },
      {
        h2: "The guest is already shopping around"
      },
      {
        p: "The Indian traveller in Airbnb's numbers does not book in one place. The same family that finds a villa on Airbnb this year may book a hotel on Booking.com or MakeMyTrip next year and a homestay through Instagram the year after. The same letter shows the pull running the other way as well. Airbnb says [about 35% of guests whose first Airbnb booking is a hotel return to book a home](https://hospitalitytechedition.com/news/airbnb-q3-hotels-single-digit-share-nights-35-percent-return-homes/)."
      },
      {
        p: "Platforms are building to keep those guests inside their own apps. Booking Holdings has announced [a planned $100M investment in Vayo, its new travel agent product](https://hospitalitytechedition.com/news/booking-holdings-launches-vayo-ai-travel-agent/), and loyalty programmes are adding rental homes, as [Wyndham Rewards did with Homes & Havens](https://hospitalitytechedition.com/news/wyndham-rewards-homes-havens-vacation-rentals/). Each of these moves widens the shop window and raises the stakes for any property that is missing from it."
      },
      {
        h2: "More sites means more paperwork"
      },
      {
        p: "Small owners get stuck at this step. Adding a site is easy. Running three sites from three apps, a notebook and a WhatsApp group is where the money leaks out."
      },
      {
        p: "For Indian owners the trouble tends to show up in four places."
      },
      {
        ul: [
          "A calendar that is updated by hand, late at night, after a booking has already come in elsewhere.",
          "Payouts that arrive on different days from different sites, with commissions deducted in different ways.",
          "Co-owners, often family members, who each want to know what their share of the month was.",
          "Guest records that cannot support a GST invoice when a corporate guest asks for one."
        ]
      },
      {
        p: "Each of these is a record-keeping problem, and each gets worse with every site an owner adds."
      },
      {
        h2: "What I would do this quarter"
      },
      {
        p: "If I owned a small property and read Airbnb's India numbers, I would do three things before the December holidays."
      },
      {
        p: "First, list on at least one global site and one Indian site, so the property is visible to the traveller who shops on either."
      },
      {
        p: "Second, keep one master calendar that every booking is checked against, and decide in advance who on the team settles a clash and how fast."
      },
      {
        p: "Third, write down how money is split. Commission by site, cleaning and staff costs, and each owner's share should come out of the same record every month, so nobody argues over a spreadsheet in January."
      },
      {
        p: "Indian guests are booking homes in larger numbers, and the platforms are competing for them. Owners who meet those guests on more than one site, with their records ready for it, will keep more of that demand."
      },
      {
        p: "Source: [Airbnb, Q3 2026 shareholder letter (SEC Form 8-K, Exhibit 99.1)](https://www.sec.gov/Archives/edgar/data/1559720/000119312526449727/d437988dex991.htm)"
      }
    ]
  },
  {
    slug: "stop-double-bookings-airbnb-booking-com",
    title: "How to stop double bookings across Airbnb and Booking.com",
    description:
      "Double bookings cost you money and reviews. Here is how cross-channel sync cuts them down across every OTA you sell on.",
    category: "Channel Management",
    date: "2026-06-20",
    readingMinutes: 6,
    content: [
      { p: "If you list the same property on Airbnb, Booking.com, Agoda and a few other channels, a double booking is not a matter of if, but when. The moment two guests book the same night on two different platforms, you are forced to cancel one, eat the penalty, and take a hit on your ranking and reviews." },
      { p: "It rarely feels dramatic when it happens. You get a booking confirmation email from one platform, then a notification from another for the same dates, and for a moment you assume it is a mistake in the app rather than a mistake in your process. By the time you have confirmed it is real, one guest has already made travel plans around a stay that no longer exists." },
      { h2: "Why double bookings happen" },
      { p: "Each OTA keeps its own copy of your calendar. Unless those calendars talk to each other, there is a window where one channel does not know a night was just sold on another. Manual updates and iCal links, which sync on a delay, leave that window wide open." },
      { p: "In practice, the collision starts in one of three places. First, someone updates availability on one platform's extranet and forgets, or runs out of time, to mirror it everywhere else before the next booking comes in. Second, an iCal feed between two platforms updates on its own schedule, sometimes every few hours, which is long enough for a night to sell twice in the gap. Third, a guest books directly, by phone or WhatsApp, and that reservation never touches any calendar at all until someone manually blocks the date." },
      { ul: [
        "Manual calendar updates are slow and easy to forget",
        "iCal imports can lag by hours, long enough to oversell",
        "Direct and offline bookings often skip the calendar entirely",
        "The more channels you add, the higher the collision risk",
      ] },
      { h2: "What a double booking actually costs you" },
      { p: "The visible cost is the cancellation penalty most OTAs charge when a host cancels a confirmed reservation. The less visible cost is what happens after. A cancelled booking can knock your listing down in search ranking, sometimes for weeks. A guest who has to be relocated or refunded at the last minute is unlikely to leave a five-star review, even if you handle it well. And if it happens more than once, you start second-guessing every new booking notification instead of trusting the system to hold." },
      { p: "For a single property, this is an occasional headache. For an operator running five, ten or twenty units across multiple channels, the odds of a collision on any given week climb fast, and the time spent manually checking and re-checking calendars becomes a job in itself." },
      { h2: "A day this plays out on, in practice" },
      { p: "Picture a weekend in a hill-station town during peak season. An operator managing six villas gets a booking on Airbnb for a two-bedroom unit, Friday to Sunday. Ten minutes later, a repeat guest messages the same operator directly on WhatsApp asking to book the same villa for an overlapping Saturday night, because they saw it was open on the operator's website last week. The operator, mid-conversation with a housekeeping vendor about a separate property, says yes and plans to block the calendar after lunch. Lunch turns into a maintenance call, and by the time the calendar gets updated, a Booking.com guest has already confirmed the same Saturday night through a listing that still showed it as open." },
      { p: "None of the three people involved, the operator or either guest, did anything wrong by their own account. The Airbnb guest booked a listing that was available when they looked. The direct guest booked a villa the operator personally confirmed. The Booking.com guest booked a night the calendar still showed as free. The failure was entirely in the gap between \"confirmed\" and \"reflected everywhere,\" and that gap is exactly what a fragmented, manually updated calendar creates." },
      { h2: "The fix: two-way channel sync" },
      { p: "A channel manager keeps one master calendar and pushes changes out to every connected OTA. When a night sells on Booking.com, that update syncs to Airbnb, Agoda and the rest, closing the window that manual updates and delayed iCal links leave open. You stop checking five different extranets and start trusting one dashboard." },
      { p: "With Simplified Management, your availability, rates and reservations sync across your connected channels from one dashboard, so you can keep the same night from being sold twice. Instead of logging into each OTA's own back end to block a date, you make the change once and it carries through to every channel that property is listed on. In the scenario above, the moment the direct booking is logged into the same system, that villa closes out on every connected OTA at once, rather than staying open on channels the operator has not personally touched yet." },
      { h2: "Building a routine around it" },
      { p: "Sync alone will not save you if the underlying process is still loose. A few habits make the difference between a channel manager that quietly does its job and one that still leaves room for error." },
      { ul: [
        "Block maintenance days and owner stays on the master calendar the moment you know about them, not the night before",
        "Route direct and offline bookings through the same system as OTA bookings, rather than tracking them separately",
        "Assign one person per property (or per shift, if you run a team) as the source of truth for calendar changes",
        "Check sync status after any period of patchy internet or a platform outage, rather than assuming it caught up on its own",
      ] },
      { h2: "What to look for in a channel manager" },
      { ul: [
        "True two-way sync (not delayed iCal)",
        "Coverage of the OTAs your guests actually use, including MakeMyTrip and Goibibo for India",
        "A single master calendar that drives all distribution",
        "Clear visibility into which channel a booking came from, so you can trace issues back to the source",
      ] },
      { h2: "What sync does not solve on its own" },
      { p: "It is worth being honest about the limits here too. Two-way sync closes the gap between channels, but it depends on every change actually being entered into the system in the first place. A booking taken over the phone and never logged anywhere still creates the same risk it always did, sync or no sync. A channel manager reduces the number of places a mistake can happen; it does not remove the need for someone to actually enter the booking." },
      { p: "The same goes for new channels added later. If a property gets listed on a new platform outside the normal setup process, perhaps by a team member trying to expand reach quickly, and that listing is never connected to the same sync, it sits outside the safety net entirely. The channel manager only protects what it is actually connected to." },
      { h2: "What good looks like after a few months" },
      { p: "Operators who get this right tend to describe the same shift: they stop opening five separate apps every morning to sanity-check the calendar, because they trust the one dashboard reflects reality. New guest inquiries get answered faster, because there is no need to cross-check availability against three other tabs first. And when a double booking does happen, which even a well-synced setup cannot promise never happens given the direct-booking gap above, it is rare enough that it gets treated as an exception worth investigating, not a routine cost of doing business." },
      { p: "None of this removes the need for good operational habits. But it does remove the single biggest cause of double bookings: a calendar that only tells part of the story to only some of your channels." },
    ],
  },
  {
    slug: "channel-manager-vs-pms",
    title: "Channel manager vs PMS: what is the difference?",
    description:
      "PMS, channel manager, booking engine: the terms get mixed up. Here is a plain-English guide to what each one does and why you need both.",
    category: "Guides",
    date: "2026-06-14",
    readingMinutes: 5,
    content: [
      { p: "If you are shopping for property software, you have probably seen PMS and channel manager used almost interchangeably. They are not the same thing, and understanding the difference helps you buy the right tool instead of paying twice for overlapping features, or worse, buying one when you actually need both." },
      { h2: "What a PMS does" },
      { p: "A property management system (PMS) is your operational control room. It handles reservations, guests, housekeeping tasks, staff, payments and reporting for your whole portfolio in one place. If you think about everything that happens between a guest confirming a booking and checking out, most of it lives inside the PMS: who is assigned to clean the room, what the guest's check-in time is, whether the deposit has been collected, and what the property earned that month." },
      { p: "For a single homestay run by its owner, a PMS might feel like overkill. For anyone managing multiple properties, or managing on behalf of owners who expect a report at month end, it becomes the backbone that keeps operations from running on memory and WhatsApp threads." },
      { h2: "What a channel manager does" },
      { p: "A channel manager is your distribution engine. It connects your listings to OTAs like Airbnb, Booking.com and Agoda, and keeps availability, rates and bookings synced across all of them. Its job stops at the calendar and the rate sheet. It does not care whether a room has been cleaned, or whether a guest called about a late check-out. It cares that the eight nights you sold on one channel are blocked everywhere else, and that the rate you set for the weekend shows up consistently across platforms." },
      { p: "Without a channel manager, keeping calendars aligned across several OTAs by hand means logging into each platform's extranet separately, every time something changes. That is workable with one property on two channels. It stops being workable once you are running several properties across five or more channels." },
      { h2: "Where the confusion comes from" },
      { p: "Part of the reason the two terms get blurred is that some tools genuinely do both, and vendors market the combined product under whichever name is more familiar to the buyer. Another part is that both systems touch the booking, just at different points: the channel manager captures that a booking happened and where it came from, and the PMS takes over from there to manage the stay itself." },
      { p: "A booking engine adds a third layer to the confusion, since it is sometimes bundled into the same conversation. A booking engine is the tool that lets guests book directly through your own website, without going through an OTA at all. It is neither a PMS nor a channel manager on its own, but a direct booking still needs to land in the same calendar as everything else, which is exactly where a channel manager and PMS working together matter, so a website booking closes out availability on Airbnb and Booking.com just as reliably as an OTA booking would." },
      { h2: "What this looks like for a small portfolio versus a larger one" },
      { p: "For someone running a single homestay, the gap between \"just a channel manager\" and \"PMS plus channel manager\" might not be obvious day to day. There is one calendar to watch, one set of guests to message, and not much staff coordination to speak of. The moment a second or third property enters the picture, that changes. Now there is a cleaning schedule to coordinate across properties, multiple staff members who need to know which room they are responsible for on a given day, and an owner or investor, sometimes several, who expects a clear accounting of what each property earned." },
      { p: "This is the point where relying on a channel manager alone starts to show its limits. It will keep your calendars in sync, which matters, but it has nothing to say about who cleaned unit 4B on Tuesday, whether the linen order went out, or what unit 4B's owner is owed for the month. Those questions live entirely on the PMS side, and without one, they end up living in someone's notebook or a side spreadsheet that nobody else can see." },
      { h2: "Why you want both" },
      { p: "On their own, each solves half the problem. A channel manager with no PMS behind it tells you a booking exists but gives you nowhere to track housekeeping, staff assignments or owner payouts. A PMS with no channel manager leaves you updating five OTA calendars by hand, with all the double-booking risk that comes with it." },
      { p: "Together, they let you run operations and distribution from a single source of truth, which is exactly how Simplified Management is built: PMS and channel manager in one dashboard, so a booking that comes in through any connected channel flows straight into the same operational view your team already works from." },
      { ul: [
        "PMS: run day-to-day operations, from reservations to housekeeping to staff and reporting",
        "Channel manager: distribute listings and sync availability and rates across OTAs",
        "One combined platform: no data silos, no double entry, one calendar that both sides of the business trust",
      ] },
      { h2: "What runs on data silos in practice" },
      { p: "The most common failure mode with separate tools is not that either one breaks, it is that they drift apart quietly. A booking lands through the channel manager, and someone has to remember to key it into the PMS for housekeeping and staff to see it. Miss that step during a busy week and a room does not get cleaned before the next guest arrives, not because the calendar was wrong, but because the two systems never actually talked to each other, a person had to be the bridge, and people are busiest exactly when this kind of manual bridging is most likely to get missed." },
      { p: "That is the practical argument for one platform over two separate ones stitched together with manual re-entry: not that the individual tools are worse, but that every manual handoff between them is a place where a booking can arrive on the calendar and never make it to the team actually responsible for the stay." },
      { h2: "Questions worth asking before you buy" },
      { p: "If you are choosing between tools, a few direct questions tend to separate a genuine combined platform from two products marketed together under one name." },
      { ul: [
        "Does a booking made on any connected OTA automatically create the housekeeping and staff tasks tied to that stay?",
        "Can an owner or partner see a payout statement without someone manually pulling numbers from two different systems?",
        "If a booking is cancelled on the OTA side, does that update flow through to staff schedules and reporting without a second manual step?",
      ] },
      { p: "If you are evaluating tools, the practical test is simple: ask what happens to a booking after it lands. If the answer stops at it shows up in your calendar, you are looking at a channel manager. If it walks you through housekeeping, staff tasks and payout reporting too, you are looking at a PMS, or a platform that combines both." },
    ],
  },
  {
    slug: "ota-distribution-guide-india",
    title: "A practical guide to OTA distribution for Indian rentals",
    description:
      "From Airbnb and Booking.com to MakeMyTrip and Goibibo, here is how to build an OTA distribution strategy for the Indian short-term rental market.",
    category: "Distribution",
    date: "2026-06-06",
    readingMinutes: 6,
    content: [
      { p: "The Indian short-term rental market has its own mix of channels. Getting distribution right means covering the global OTAs and the domestic platforms your guests actually book on, and doing it in a way that does not turn into a full-time job of logging into separate extranets." },
      { h2: "The channels that matter in India" },
      { p: "Indian guests do not book on a single platform the way travellers in some other markets do. A weekend getaway from Mumbai might get booked on Airbnb, a family holiday to Goa might come through MakeMyTrip, and a business traveller might book direct on Booking.com. Building a distribution strategy for the Indian market means recognising that spread rather than betting everything on one channel." },
      { ul: [
        "Global: Airbnb, Booking.com, Agoda, Expedia, Vrbo",
        "Domestic: MakeMyTrip, Goibibo and Cleartrip, which carry real weight for Indian leisure travel",
        "Premium villas: curated villa platforms for higher-end properties",
      ] },
      { h2: "Global versus domestic: different guests, different expectations" },
      { p: "Global OTAs tend to bring in international travellers and a segment of urban Indian travellers who default to platforms they already use for other travel. Domestic OTAs bring a different guest profile, often booking closer to the travel date, more price-sensitive, and more likely to call the property directly with questions before or after booking. A distribution strategy that only covers global platforms misses a meaningful share of demand that domestic OTAs capture on their own." },
      { p: "Premium villa platforms serve yet another guest: someone booking a larger group stay, often for a celebration or extended family trip, who is comparing curated listings rather than searching broadly. If your portfolio includes villas or larger properties, listing there in addition to the mainstream OTAs widens the pool without cannibalising your existing channels." },
      { h2: "How guests actually shop across these channels" },
      { p: "It helps to think about the booking journey rather than the platform in isolation. A family planning a Goa trip might start on Google, compare a handful of villas across two or three OTAs, check reviews on whichever platform shows the most, and finally book on whichever one offered the clearest cancellation policy or the better price that day. A business traveller heading to a smaller city for a wedding might book far closer to the date, often through whichever domestic platform their travel agent or company account defaults to. Neither guest is loyal to a platform; they are loyal to whichever listing answers their questions fastest with the least friction." },
      { p: "That means the same property, with the same amenities and the same rate intent, needs to show up consistently across every channel a guest might land on. A listing that looks complete and competitively priced on Airbnb but has stale photos and a mismatched rate on a domestic platform is quietly losing bookings to competitors who kept both listings current." },
      { h2: "Distribute widely, oversell less" },
      { p: "The more channels you list on, the more bookings you capture, but only if availability stays accurate everywhere. Wide distribution without reliable sync is how a property ends up double-booked on a long weekend, exactly when demand and rates are highest and the cost of getting it wrong is worst. Cross-channel sync is what makes wide distribution safer: a night sold on one platform gets closed out everywhere else, without someone having to remember to do it by hand." },
      { p: "This is where operators sometimes talk themselves out of adding a channel that would otherwise bring real bookings, because they are worried about the operational overhead of one more calendar to watch. That worry is legitimate if the calendars are being managed by hand. It mostly disappears once every channel reads from and writes to the same master calendar, at which point adding a channel is a distribution decision rather than an operations risk." },
      { h2: "Price with intent" },
      { p: "Centralized rate control lets you set and adjust pricing across every channel from one place, so you spend less time fighting rate parity issues by hand. Rate parity matters more in India than it might seem at first glance: guests frequently price-check the same property across two or three OTAs before booking, and a mismatch, even a small one, can push a guest to whichever channel looks cheaper, cutting into your margin on that booking." },
      { p: "Seasonal and weekend demand in Indian leisure markets, hill stations, beach towns, and weekend-drive destinations near major cities in particular, swings hard enough that pricing needs to move with it. Doing that across five or more channel extranets by hand is where rate parity mistakes creep in." },
      { h2: "What centralized rate control means in practice" },
      { p: "Centralized rate control means you set a rate once in one place, and that change applies across every connected channel, rather than editing five separate extranets one at a time. It is worth being precise about what that does and does not mean: it removes the repetitive manual work of updating each platform separately, it does not turn pricing into something that adjusts itself. You still decide when a rate changes and by how much; the platform's job is making sure that decision only has to be entered once." },
      { h2: "Building a channel calendar, not just a channel list" },
      { p: "Beyond picking which platforms to list on, it helps to think in terms of a calendar of channel activity rather than a static list set once and forgotten. Domestic platforms often run their own promotional periods tied to Indian travel seasons, long weekends, festival calendars, school holiday windows, that global OTAs do not always mirror on the same dates. Keeping half an eye on what each platform is pushing that month, and making sure your listings are positioned to catch that traffic, tends to matter more for domestic channels than for the global ones, where demand patterns are steadier." },
      { p: "This does not need to be a heavy exercise. For most portfolios, checking in on channel-specific activity once a month, alongside the routine of reviewing rates, is enough to catch the moments worth leaning into a particular platform a little harder." },
      { h2: "Sequencing a rollout instead of listing everywhere at once" },
      { p: "Operators new to multi-channel distribution sometimes try to list on every available platform in the same week, which tends to create more setup work than it is worth before the calendar and content are actually ready. A steadier approach is to launch on one global platform and one domestic platform first, get comfortable with how bookings, guest messages and payouts flow through the operational side, and only then add the next channel. Each additional channel should be a deliberate step once the last one is running smoothly, not a batch of signups done in a single afternoon." },
      { p: "This also gives you a cleaner way to judge whether a channel is worth keeping. A platform added in isolation, with its own launch date and its own baseline, is much easier to evaluate for actual booking volume than one lumped into a mass rollout where it is hard to tell which channel is driving which result." },
      { h2: "Keeping listing content consistent across channels" },
      { p: "Distribution strategy is not only about which platforms you are on, it is also about whether the listing itself holds up on each one. Photos, amenity lists, house rules and cancellation policies all need to say the same thing across every channel a guest might compare. A property described as having a private pool on one platform and no mention of it on another does not just look inconsistent, it actively costs bookings on whichever platform undersells the property relative to what a guest can see elsewhere." },
      { ul: [
        "Keep photos current across every channel, not just the one you update most often",
        "Match amenity lists and house rules so a guest comparing two platforms sees the same property",
        "Review each listing after any renovation or amenity change, not just the flagship channel",
      ] },
      { h2: "Building the distribution mix that fits your portfolio" },
      { ul: [
        "Start with the global OTAs and at least one major domestic platform to cover both traveller profiles",
        "Add premium or curated platforms only if your property type fits that guest expectation",
        "Keep rates aligned across every channel to avoid pushing bookings to whichever platform looks cheapest",
        "Treat channel count as a means to more bookings, not a target in itself; a channel you cannot keep synced is a liability",
      ] },
      { p: "Simplified Management connects to 8 major OTAs, including the leading Indian platforms, and syncs everything from a single dashboard, so widening your distribution does not mean widening the amount of manual work behind it." },
    ],
  },
  {
    slug: "split-payouts-property-co-owners",
    title: "How to split payouts fairly with property co-owners",
    description:
      "Co-owned and investor-backed properties make payouts messy. Here is how to automate earnings and expense splits per booking.",
    category: "Operations",
    date: "2026-05-28",
    readingMinutes: 4,
    content: [
      { p: "When properties are co-owned or backed by investors, every booking raises the same question: who earns what, and who pays for what? Doing this by hand in spreadsheets is slow and error-prone, and it tends to get worse, not better, as the portfolio grows." },
      { h2: "The problem with manual splits" },
      { p: "A single-owner property is simple: revenue in, expenses out, whatever is left belongs to one person. Co-ownership breaks that simplicity in a few predictable ways. Two family members might own a villa 60/40. An investor might hold a share of a property while a local operator manages it day to day for a management fee plus a smaller cut. A group of friends might jointly own a homestay and expect equal splits regardless of who handled which booking." },
      { p: "These arrangements are common precisely because they make property ownership accessible to people who could not, or would not want to, buy and manage a property alone. A family splitting a villa spreads both the cost and the workload. An investor backing an operator gets exposure to hospitality income without doing the day-to-day work themselves. The arrangement makes financial sense on paper. It only stays pleasant in practice if the accounting behind it is trustworthy, because money and family or business relationships are a combination that does not tolerate ambiguity well." },
      { ul: [
        "Every booking needs its share calculated separately, based on whatever split that specific property or partner agreement uses",
        "Expenses have to be attributed to the right property and owner, not lumped together across the portfolio",
        "Different partners often have different splits on the same property, for example an equity share plus a separate management fee",
        "Owners want transparent statements they can trust, not a number that just appears at month end with no way to check it",
      ] },
      { p: "In a spreadsheet, this usually means a tab per property, formulas that someone has to remember to update whenever a split changes, and a real risk that a booking gets missed, an expense gets attributed to the wrong owner, or a formula breaks silently and nobody notices until an owner asks why the numbers look off." },
      { h2: "Where it breaks down in practice" },
      { p: "The trouble rarely shows up on the first booking of the month. It shows up two or three months in, when a partner's share was quietly changed after a renegotiation and the old formula never got updated, or when a shared expense, a repair, a linen replacement, a commission fee, gets applied to one owner's column instead of split proportionally. By the time someone catches it, the statement has already gone out, and now the conversation is about a correction rather than a routine report." },
      { p: "That kind of mistake costs more than the money involved. Owners who manage properties through a partner or operator are trusting that partner to get the numbers right without having to audit every line themselves. One statement that does not add up is often enough to make an owner start double-checking everything after that." },
      { h2: "A concrete example" },
      { p: "Take a three-bedroom villa co-owned by two siblings, 55/45, with a local operator handling day-to-day management for a 15 percent fee off the top. In a given month, the villa books 18 nights across Airbnb, Booking.com and one direct guest, at a mix of rates because of a festival weekend in the middle of the month. There is also a plumbing repair that month, split evenly between the two owners as a shared capital expense rather than an operating cost. Reconstructing that by hand means pulling booking totals from three sources, applying the management fee before anything else, splitting what remains 55/45, then separately tracking the repair outside the regular revenue split so it does not get folded into the wrong column. Any one of those steps done slightly wrong changes what each sibling is actually owed, and neither of them has an easy way to check the arithmetic unless someone shows their work." },
      { h2: "Automating partner payouts" },
      { p: "With partner accounts, you allocate properties (or shares of them) to partners once, then earnings and expenses split automatically on every booking, down to each daily payment. There is no month-end scramble to reconcile a spreadsheet against actual reservations, because the split is applied at the point the booking and its expenses are recorded, not retrofitted afterward." },
      { p: "This also makes it straightforward to handle the more layered arrangements: an investor with an equity share, an operator with a management fee, and a fixed cost like a cleaning charge that comes off the top before either party's share is calculated. Once that structure is set up once for a property, it applies consistently to every booking without anyone having to re-check the math." },
      { ul: [
        "Set the split once per property or partner agreement, including any management fees or off-the-top costs",
        "Let earnings and expenses flow through automatically as bookings and costs are recorded",
        "Give each owner a statement they can see for themselves, rather than a number handed down at month end",
      ] },
      { h2: "Handling disagreements before they start" },
      { p: "Even a well-run split arrangement will occasionally hit a disagreement, a shared expense one partner feels should not have been split evenly, a booking that came in during a period one partner covered operationally and feels should carry a different weighting. Those conversations go very differently depending on whether both sides can see the same booking-level detail or whether one side is simply relaying a total. A partner who can open a statement and see exactly which bookings and expenses produced their number is arguing about a specific line item. A partner working from a summary figure is arguing about trust, which is a much harder conversation to have productively." },
      { p: "Setting the split structure once, in writing, and having every subsequent statement apply it mechanically also removes a subtler risk: the split quietly drifting over time because nobody wants to raise it. When each statement is generated the same way from the same rule, adjusting that rule later is a deliberate, visible change rather than something that creeps in unnoticed." },
      { p: "Simplified Management handles this natively, so co-owned portfolios stay transparent without the spreadsheet gymnastics, and owners get a statement that reflects what actually happened, booking by booking, rather than a best effort reconstructed after the fact." },
    ],
  },
  {
    slug: "where-double-bookings-actually-start",
    title: "Where double bookings actually start (it is not the OTA's fault)",
    description:
      "Double bookings look random from the outside, but they trace back to three specific gaps in how a calendar gets updated. Here is where to look first.",
    category: "Channel Management",
    date: "2026-06-27",
    readingMinutes: 5,
    content: [
      { p: "Ask an operator where a double booking came from and the answer is often that the platform glitched. Almost always, it did not. The OTA processed the booking it was shown correctly. The problem sits earlier, in the gap between when a night actually sold and when every other channel found out about it." },
      { p: "That gap has a shape. It is not random, and it is not evenly distributed across your bookings. In practice, nearly every double booking traces back to one of three specific points, and knowing which one is causing yours is the difference between fixing the actual problem and just hoping it does not happen again." },
      { h2: "Gap one: the update that never left your head" },
      { p: "This is the most common one, especially for smaller operators. A guest calls or messages you directly, you agree on dates, and you make a mental note to block the calendar later. Later gets pushed by whatever else is happening that day, and in the meantime a booking comes in through Airbnb or Booking.com for an overlapping date, because nothing on any calendar showed those nights as unavailable." },
      { p: "The fix here is not remembering better. It is removing the step where a booking exists only in your head or in a chat thread before it exists on a calendar. Any confirmed stay, however it was booked, needs to hit the calendar within minutes, not by the end of the day." },
      { h2: "Gap two: the sync that runs on its own schedule" },
      { p: "Many calendar connections between platforms rely on iCal feeds, which pull updates on an interval rather than the moment something changes. Depending on the platforms involved, that interval can run from a few minutes to several hours. During a busy weekend, or a flash sale, or simply a normal day with steady demand, several hours is more than enough time for the same night to sell twice." },
      { p: "This gap is invisible until it is not. Everything looks fine on both calendars right up until the moment two confirmations land within the same sync window. Operators who have never had a double booking often assume their setup is fine, when really they have just been lucky with timing so far." },
      { h2: "Gap three: the channel nobody was watching" },
      { p: "The third gap shows up as a portfolio grows. A property that started on two channels expands to five or six, and somewhere in that growth, one channel gets added without being folded into the same calendar-management routine as the others. Maybe it is a smaller regional platform, maybe it is a listing a team member set up and never mentioned. Either way, it sits outside the loop that keeps the main channels in sync, and it becomes the channel that quietly oversells." },
      { ul: [
        "Gap one: a confirmed stay that has not been entered anywhere yet",
        "Gap two: a sync interval long enough for a second booking to land in between",
        "Gap three: a channel that exists but was never brought into the same sync setup as the rest",
      ] },
      { h2: "How to tell which gap is yours" },
      { p: "If double bookings are a recurring problem rather than a one-off, it is worth tracing the last two or three back to their source instead of treating them as bad luck. Pull up the booking times on both reservations and ask a few questions: was one of them a direct or phone booking that took time to reach the calendar? Did both bookings land within a short window of each other, pointing at a sync delay rather than a forgotten update? Was the property listed on a channel that nobody remembers actively managing?" },
      { ul: [
        "If the losing booking was direct or offline, look at gap one: how fast confirmed stays reach the calendar",
        "If both bookings landed close together in time, look at gap two: the sync interval between the platforms involved",
        "If the channel involved is one you rarely think about, look at gap three: whether it was ever brought into your main sync setup",
      ] },
      { p: "Most operators, once they trace a few incidents this way, find that one gap accounts for the majority of their collisions, not an even split across all three. That matters, because it tells you where to spend your effort first rather than trying to fix everything at once." },
      { h2: "Why this matters more as you scale" },
      { p: "One property on two channels can absorb an occasional slip. An operator running ten properties across six channels cannot, because the number of possible collision points multiplies with every property and every channel added. What was a rare inconvenience at small scale becomes a near-certainty at portfolio scale, unless the underlying sync mechanism changes rather than just the amount of attention you throw at it." },
      { p: "This is also where the cost of the problem changes shape. At small scale, a double booking is an awkward phone call and a refunded night. At portfolio scale, it becomes a recurring line item, cancellation penalties, discounted relocations, and staff time spent untangling which guest actually has the room, that adds up month over month without ever showing up as a single dramatic loss anyone flags for attention." },
      { h2: "A day-in-the-life version of the same three gaps" },
      { p: "Spread across five properties and a spreadsheet, a typical morning for an operator without a shared calendar looks like this: open one tab for Airbnb's host dashboard, another for Booking.com's extranet, a third for a domestic OTA, then cross-reference all three against a WhatsApp thread of direct-booking requests before deciding which nights are actually free to quote a new guest. That routine, repeated daily across five properties, is not just tedious, it is exactly the environment where all three gaps live at once: an update forgotten between tabs, a sync interval nobody is tracking, and a listing on a channel that gets checked less often than the rest because it brings in fewer bookings." },
      { p: "The operators who eventually fix this rarely do it by getting faster at the spreadsheet-and-tabs routine. They fix it by removing the routine, replacing five separate checks with one calendar that already reflects what happened on every channel, so there is nothing left to cross-reference by hand." },
      { h2: "Closing all three gaps at once" },
      { p: "The common thread across all three gaps is a calendar that is not actually one calendar. Each fix on its own, being faster to log direct bookings, choosing platforms with tighter sync, being disciplined about onboarding new channels, helps. But the more durable fix is structural: one master calendar that every channel reads from and writes to, so there is no separate mental note, no waiting on an interval, and no orphaned channel outside the loop." },
      { p: "With Simplified Management, availability changes on any connected channel sync back to one master calendar, and out to every other connected channel, so a booking taken anywhere closes that night everywhere else. It does not eliminate the need for good habits around logging direct bookings quickly, but it removes the two gaps that no amount of diligence can fully close on its own." },
    ],
  },
  {
    slug: "why-empty-nights-are-not-a-demand-problem",
    title: "Why your empty nights are not a demand problem",
    description:
      "Unsold nights usually get blamed on low demand, but the real issue is often a rate that never moved. Here is how to tell the difference.",
    category: "Guides",
    date: "2026-07-04",
    readingMinutes: 4,
    content: [
      { p: "When a property sits empty for a stretch of nights, the instinct is to assume demand is soft, the location is having a slow month, or the listing needs better photos. Sometimes that is true. Far more often, the actual cause is simpler and easier to fix: the rate was set once and left alone while everything around it, the season, the competition, the day of week, kept moving." },
      { h2: "The rate that never moves" },
      { p: "A lot of independent operators set a rate when they list a property and revisit it only occasionally, maybe once a season if that. That rate might have made sense on the day it was set. It rarely stays right for long, because demand for short-term rentals is not flat. It moves with weekends, holidays, local events, school breaks, and how many similar properties are competing for the same guests that week." },
      { p: "A flat rate is, by definition, wrong most of the time. It is sometimes too low, leaving money on the table during high-demand weekends. It is sometimes too high, sitting empty on a quiet Tuesday when a lower rate would have filled the room. Both mistakes look identical from the owner's side: nights that did not sell, or sold for less than they should have. Only one of them shows up as an empty calendar, which is why it gets the attention while the other quietly costs money without anyone noticing." },
      { h2: "How to tell a pricing problem from an actual demand problem" },
      { p: "Before assuming a property has a demand problem, it helps to check a few things that point specifically at price rather than location or product." },
      { ul: [
        "Compare your rate against similar properties nearby for the same dates, not against your own rate last season",
        "Look at which specific nights go unsold: if it is consistently weekdays while weekends fill, that is a pricing pattern, not a demand problem",
        "Check whether the rate changed at all around a local event, holiday, or long weekend, or stayed exactly the same as a normal week",
        "Notice whether inquiries are coming in but not converting to bookings, which often points at rate rather than visibility",
      ] },
      { p: "If nearby comparable properties are booking at a higher rate than yours for the same dates, that is not a demand signal working against you, it is unclaimed demand. If your weekday nights sit empty while weekends fill reliably, that is a pattern a flat rate cannot respond to, because it treats every night the same." },
      { h2: "A worked example" },
      { p: "Take a two-bedroom homestay near a hill station that books reliably on weekends but has sat empty on weeknights for the past two months. The owner's first instinct is that interest in the area has cooled. A quick comparison against five similar listings nearby for the same weeknights shows three of them booked, at a noticeably lower rate than what this property is listed at. The other two are also sitting empty, at rates close to this one's. That split is the tell: it is not that weeknight demand vanished from the area, it is that this property's weeknight rate is out of step with what is actually converting nearby. Adjusting the weekday rate down, while leaving the weekend rate untouched since weekends are already filling, addresses the actual gap instead of the assumed one." },
      { h2: "A simple seasonal pricing framework" },
      { p: "You do not need a complex revenue management system to capture most of this. A workable starting framework for a homestay or small portfolio looks something like this." },
      { ul: [
        "Set a base rate for an ordinary weekday with no local event nearby",
        "Add a weekend premium for Friday and Saturday nights, sized to what comparable properties charge for the same nights",
        "Build a separate tier for known high-demand periods: major holidays, local festivals, wedding season if that is relevant to your market",
        "Build a lower tier for genuinely slow periods, monsoon lulls in some markets, the off-season in hill and beach destinations, rather than leaving the base rate to absorb the gap",
        "Revisit all of it at least once a quarter, since what counted as a slow period last year may not hold this year",
      ] },
      { h2: "Where the mechanics get in the way" },
      { p: "Even operators who understand this in principle often do not act on it, because updating rates across several channels by hand is tedious enough that it keeps getting deferred. If changing a weekend rate means logging into five separate OTA extranets, that change is far less likely to happen consistently, which quietly pulls an operator back toward the flat-rate trap this whole approach is meant to avoid." },
      { p: "There is also a psychological version of this friction. Even operators with the discipline to update rates regularly often hesitate to lower a rate, because it can feel like conceding that the property is worth less. That framing gets the economics backwards: an empty night earns nothing, so a lower rate that fills it earns more than a higher rate that sits unsold. The goal is not to always charge more, it is to charge what each specific night is actually worth, which is sometimes more and sometimes less than the flat rate currently on the listing." },
      { p: "Centralized rate control removes that friction: set the rate once and it applies across every connected channel, so a seasonal or weekend adjustment is one change instead of five. Simplified Management gives you that single point of control across your connected OTAs, so pricing with intent does not depend on how much patience you have left for extranet logins at the end of a long day." },
      { h2: "Building the review into a routine, not a one-time fix" },
      { p: "A pricing framework set up once and never revisited eventually turns back into the same flat-rate problem it was meant to solve, just with more tiers baked in. The properties that stay consistently well-priced tend to have someone glance at occupancy and nearby comparables on a set cadence, weekly for a portfolio that is actively managed, monthly at minimum, rather than waiting for a stretch of empty nights to prompt a review." },
      { p: "Empty nights are worth investigating, but the first place to look is the rate sheet, not the listing itself. A property in a genuinely soft market still benefits from pricing that flexes with actual demand; a property with strong underlying demand and a flat rate is very often just underpriced or overpriced on the wrong nights, not undesired." },
    ],
  },
  {
    slug: "what-a-gst-ready-booking-record-looks-like",
    title: "What a GST-ready booking record actually looks like",
    description:
      "GST compliance starts with clean records long before it reaches your CA. Here is what to keep organized on every booking, and why it matters.",
    category: "Operations",
    date: "2026-07-11",
    readingMinutes: 4,
    content: [
      { p: "This is not tax advice. It is a look at the record-keeping habits that make GST compliance easier once your accountant gets involved, because the biggest source of friction at filing time is usually not the tax rule itself, it is scrambling to reconstruct booking details that should have been captured months earlier." },
      { h2: "Why booking records matter for GST" },
      { p: "Short-term rental income sits at the intersection of property, hospitality and platform commerce, and how it gets treated can depend on factors like registration status, turnover, and the structure of the business. Rather than guessing at specifics here, the practical starting point for any operator is to confirm your own GST obligations and applicable treatment with a qualified CA, and to build booking records that give that CA everything they need without a scavenger hunt." },
      { p: "Whatever the specifics turn out to be for your business, one thing holds across the board: an accountant working from complete, organized records can do their job accurately and quickly, and one working from scattered screenshots, WhatsApp confirmations and half-updated spreadsheets cannot, no matter how good they are." },
      { p: "This is worth saying plainly because it is easy to assume compliance is mainly about knowing the right rule. In practice, most of the actual work is upstream of any rule: it is having a complete, dated, correctly attributed record of every booking to apply that rule to. A CA who is confident about the applicable treatment can still only work as accurately as the records they are handed, which is exactly the part an operator controls day to day, independent of whatever the specific tax position turns out to be." },
      { h2: "What a clean record includes" },
      { p: "Think of it from your CA's perspective at filing time. For every booking, they generally want to see the same handful of things, consistently captured, rather than reconstructed after the fact." },
      { ul: [
        "Which property the booking was for, and its location, since treatment can vary by state and property type",
        "The channel the booking came from (Airbnb, Booking.com, direct, etc.), since platform commissions and how they were handled matter",
        "The gross booking amount, any commission or fees deducted by the channel, and the net amount received",
        "The dates of stay, not just the date the booking was made, since these can be different tax periods",
        "Any invoices or receipts issued to the guest or generated by the platform",
      ] },
      { h2: "Where this usually falls apart" },
      { p: "For an operator running one property and taking most bookings through a single OTA, keeping this organized by hand is manageable. It stops being manageable once bookings are spread across five or six channels, each with its own commission structure, payout schedule and reporting format. Reconciling all of that manually at quarter end is exactly the kind of task that eats a weekend and still leaves gaps, because a booking confirmation from one platform rarely arrives in the same format as one from another." },
      { p: "The other common failure point is timing. Bookings made in one month for stays in a later month, cancellations that come with partial refunds, and commission adjustments that land after the original booking record was created, all of these need to be tracked as they happen, not reconstructed weeks later from memory and email search." },
      { h2: "What multi-property operators run into specifically" },
      { p: "For an operator managing several properties, sometimes across more than one state or city, the record-keeping question gets a layer more involved, since treatment can differ by location and each property may need to be tracked as its own unit rather than folded into one portfolio-wide number. This is exactly the kind of structural detail a CA needs to weigh in on directly, since it depends on specifics of registration and business structure that vary operator to operator. What an operator can control regardless of how that question resolves is making sure every booking record is already tagged to the correct property and date range, so that whatever structure the CA recommends, the underlying data supports it without a re-tagging exercise first." },
      { h2: "A habit that pays off well before filing season" },
      { p: "The operators who find filing season the least stressful are usually the ones who treat record-keeping as something that happens the moment a booking is confirmed, not something they catch up on before a deadline. That can be as simple as making sure every booking, whichever channel it came from, gets logged with its property, gross amount, and commission the same day it is confirmed, rather than letting a backlog build up that someone has to reconstruct later from memory and inbox search. Small and consistent beats occasional and thorough, because the small version never requires anyone to remember what happened six weeks ago." },
      { h2: "How a PMS helps with this, without replacing your CA" },
      { p: "A property management system will not tell you what rate applies or how to file, that is squarely a job for your CA. What it can do is keep every booking's core details, property, channel, amounts, dates, consistently recorded in one place as bookings happen, rather than scattered across OTA extranets and spreadsheets that need to be stitched together later." },
      { p: "Simplified Management centralizes booking and payment records across your connected channels, so when it is time to sit down with your CA, the underlying data is already organized by property and by booking rather than needing to be assembled first. Again: confirm the specific GST treatment that applies to your business with a CA. What this changes is how much work it takes to hand them accurate records when you do." },
    ],
  },
  {
    slug: "what-to-put-in-a-monthly-owner-report",
    title: "What to put in a monthly owner report",
    description:
      "A good owner report answers the questions an owner is actually going to ask, before they ask them. Here is what belongs in one.",
    category: "Operations",
    date: "2026-07-18",
    readingMinutes: 4,
    content: [
      { p: "If you manage a property on behalf of an owner, whether that is a co-owner, an investor, or someone who simply does not want to deal with day-to-day operations, the monthly report is often the entire relationship as far as they are concerned. It is the one artifact that tells them whether their property is being looked after and whether the numbers make sense. A thin or late report erodes trust faster than almost anything else in the arrangement." },
      { p: "It helps to remember why the owner is not doing this themselves in the first place. Most owners in this position are absent by choice, not by neglect, they live elsewhere, they have another job, or they simply prefer not to manage bookings and housekeeping personally. That choice comes with a trade: they give up day-to-day visibility in exchange for someone else handling it well. The monthly report is the mechanism that makes that trade feel fair, because it is the only regular proof that the property is actually being run the way it should be." },
      { h2: "Start from the owner's questions, not your data" },
      { p: "It is tempting to build a report around whatever numbers are easiest to pull. A better approach is to start from the questions an owner is actually going to ask, and build the report to answer them before they have to." },
      { ul: [
        "How many nights were booked this month, and at what occupancy rate?",
        "What did the property earn, gross and net of fees and expenses?",
        "Which channels did the bookings come from?",
        "What expenses came out of that revenue, and what were they for?",
        "Is anything upcoming that the owner should know about, a repair, a maintenance issue, a slow patch on the calendar?",
      ] },
      { h2: "The core numbers" },
      { p: "At minimum, a monthly report should show occupancy for the month, gross booking revenue, channel commissions and fees, any operating expenses attributed to the property, and the net payout the owner is receiving. Each of these should be able to stand up to a follow-up question. If an owner asks why net is lower than they expected, the report should already contain the answer, a maintenance cost, a longer-than-usual vacancy, a heavier commission month, rather than sending you back to reconstruct it after the fact." },
      { p: "For co-owned or partner-managed properties, the report also needs to show how the split was applied on this month's numbers specifically, not just state the final figure. An owner who sees a bare 'your share: X' with no visible calculation behind it is far more likely to ask for a breakdown than one who sees the split applied line by line." },
      { h2: "A worked example of a complete report" },
      { p: "Consider a two-bedroom coastal villa managed on behalf of an out-of-town owner. A complete report for the month covers 21 booked nights out of 30 available, listing which nights came from which channel, a gross revenue figure, channel commissions itemized separately from the operator's own management fee, a note on a one-off expense for pool maintenance that month, and the resulting net payout. It also flags that the following month includes a public holiday weekend where the rate has already been adjusted upward, and that a routine appliance service is scheduled and will show up as a small expense next month rather than arriving as a surprise later. None of this requires more than a page, but every line answers a question the owner would otherwise have to ask." },
      { h2: "Where reports fall apart in practice" },
      { p: "The most common failure is not wrong numbers, it is inconsistency. A report that includes channel-level detail one month and skips it the next makes an owner wonder what changed, even when nothing did. Reports that arrive on a different day each month, or skip a month during a busy period, do more damage to trust than a report with a slightly disappointing occupancy number, because a late or inconsistent report reads as neglect, regardless of the actual performance underneath it." },
      { p: "A related failure shows up when a property is managed by a small team and the person who usually sends the report is unavailable for a month. If the report only exists as a manually built spreadsheet that one person knows how to assemble, that absence becomes the owner's problem too, in the form of a missed or rushed report. A process that any team member can execute from the same underlying records is more resilient than one that lives in a single person's head or personal file." },
      { p: "The other common gap is context. A number on its own, occupancy was 62 percent, does not tell an owner whether that is good, bad, or normal for the season. A short note, one or two lines, on what drove the month, a slow patch that matched the wider market, a booking surge around a local event, is often worth more to the relationship than another row of data." },
      { h2: "Making this repeatable without rebuilding it by hand every month" },
      { p: "Manually assembling this from OTA extranets, bank statements and a maintenance log every month is exactly the kind of task that gets rushed or delayed when things get busy, which is precisely when an owner most wants reassurance that things are under control. The more the underlying booking, payment and expense data already lives in one system, the less work it takes to turn it into a report an owner can trust every single month." },
      { p: "There is also a compounding benefit to keeping this consistent over a year or more: an owner who has twelve straight months of comparable, complete reports can see their own seasonal patterns clearly, which quarter tends to be strongest, when maintenance costs cluster, whether a rate change last spring actually moved occupancy. That kind of longer view is only available if every month was captured the same way, which is exactly what breaks down when reports are rebuilt from scratch by hand each time." },
      { p: "Simplified Management keeps bookings, channel-level revenue, and partner splits together as they happen, so building a monthly owner report is a matter of pulling from records that are already organized, rather than reconstructing a month's activity from scattered sources right before the report is due." },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(posts.map((p) => p.category)));
}

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getPostsByCategorySlug(slug: string): Post[] {
  return getAllPosts().filter((p) => categorySlug(p.category) === slug);
}

export function getRelatedPosts(slug: string, limit = 2): Post[] {
  const current = getPost(slug);
  if (!current) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === current.category)
    .concat(getAllPosts().filter((p) => p.slug !== slug && p.category !== current.category))
    .slice(0, limit);
}
