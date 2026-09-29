// Fixed proposal copy. Every claim here is taken from the v2 sales decks
// (Media-Kit/source/kit_hotels.py + kit_owners.py, 2026-09-25) or the website.
// Do not add new product claims or numbers here: reps can only pick from
// these lines, which is what stops a proposal promising something new.

import type { Segment } from "./types";

// Same contact on every proposal. Matches the decks and the website
// (number and email changed per Shaun, 2026-09-25; confirmed 2026-09-29).
export const CONTACT = {
  name: "Tipusultan",
  role: "Relationship Manager",
  phone: "+91 98240 04043",
  phoneDigits: "919824004043",
  email: "sultan@simplifiedmanagement.in",
  site: "simplifiedmanagement.in",
  siteUrl: "https://simplifiedmanagement.in",
  demo: "simplifiedmanagement.in/demo",
  demoUrl: "https://simplifiedmanagement.in/demo",
};

export const WA_PROPOSAL_TEXT = encodeURIComponent(
  "Hi, I have a question about my Simplified Management proposal.",
);

export type Problem = { id: string; said: string; changes: string };

export type SegmentCopy = {
  label: string;
  kicker: string;
  promise: string;
  unitOne: string;
  unitMany: string;
  kinds: string[];
  roles: string[];
  teamRoles: { id: string; one: string; many: string }[];
  problems: Problem[];
  closeBand: string;
  weeks: (units: string) => { title: string; text: string }[];
  weeksH2: string;
  priceWho: string;
  chips: { title: string; text: string }[];
  assurances: { title: string; text: string }[];
  includedNote: string;
  groups: { title: string; items: string[] }[];
};

// The three sites the decks name. Only these are promised to "come in on
// their own"; any other site a prospect uses is listed, never promised.
export const NAMED_SITES = ["Airbnb", "Booking.com", "MakeMyTrip"];
export const SITES = ["Airbnb", "Booking.com", "MakeMyTrip", "Goibibo", "Agoda", "Walk-ins and direct"];
export const TODAY = ["WhatsApp", "Excel", "A paper register", "Phone calls", "Another software"];

const HOTEL: SegmentCopy = {
  label: "Hotel",
  kicker: "For hotels",
  promise: "Your whole hotel. Without chasing your whole team.",
  unitOne: "room",
  unitMany: "rooms",
  kinds: ["Hotel", "Guest house", "Serviced apartments", "Resort", "Boutique hotel"],
  roles: ["Owner", "General Manager", "Operations Manager"],
  teamRoles: [
    { id: "frontdesk", one: "front desk", many: "front desk" },
    { id: "housekeeping", one: "housekeeping", many: "housekeeping" },
    { id: "maintenance", one: "maintenance", many: "maintenance" },
    { id: "accounts", one: "accounts", many: "accounts" },
  ],
  problems: [
    { id: "h-room-ready", said: "Chasing housekeeping to know if a room is ready",
      changes: "Today’s cleaning is given out room by room. You see when it is done." },
    { id: "h-whatsapp", said: "The hotel runs on WhatsApp groups",
      changes: "Front desk, housekeeping, maintenance and accounts write into the same place. Everyone on shift sees the same thing." },
    { id: "h-excel", said: "Copying messages into Excel and registers",
      changes: "Type it once and it goes everywhere. Nobody copies WhatsApp messages into Excel." },
    { id: "h-handover", said: "Things get lost at shift handover",
      changes: "Handover takes a minute. The next shift opens the same screen and sees what is left." },
    { id: "h-repairs", said: "Repairs get forgotten",
      changes: "Repairs and requests are logged with photos and go to the right person. Urgent ones are flagged." },
    { id: "h-away", said: "You can’t see how the hotel is doing unless you’re there",
      changes: "One screen shows how the hotel is doing: rooms full tonight, money collected, money still owed and open issues." },
    { id: "h-owner-calls", said: "The owner keeps calling for numbers",
      changes: "Your owner can see the same screen, without calling you on a Sunday." },
    { id: "h-money", said: "Money owed and cash are hard to track",
      changes: "Money still owed, and cash you took, in one place. Reminders before a payment is due." },
    { id: "h-gst", said: "GST bills are made by hand",
      changes: "The payment is recorded and the GST bill goes out on WhatsApp." },
    { id: "h-checkin", said: "Guest IDs and check-in paperwork at the desk",
      changes: "Every guest gets a check-in link on WhatsApp and sends their ID before they arrive." },
    { id: "h-bookings", said: "Bookings from different sites are typed in by hand",
      changes: "Bookings come in on their own and show on the colour chart of every room." },
    { id: "h-charges", said: "Late checkout and damage don’t get charged",
      changes: "Damage is saved with photos. Late checkout is charged." },
    { id: "h-staff", said: "Attendance, advances and salary are kept on paper",
      changes: "Attendance and leave, advances, bonus and salary in one place." },
  ],
  closeBand: "Type it once and it goes everywhere. Everyone sees their job. You see everything.",
  weeksH2: "You don’t change everything at once.",
  weeks: (units) => [
    { title: "We watch how you work", text: "One call to see your day, your rooms and your team." },
    { title: `We put your ${units} in`, text: "Rooms, rates and your team, all set up with the right access." },
    { title: "We train your staff", text: "Front desk, cleaning and repair staff learn it, at your hotel." },
    { title: "You go live", text: "You run a full month on it. We watch the first bills and reports go out." },
  ],
  priceWho: "One platform fee for your hotel, plus a little for each room. Nothing changes when you get busy.",
  chips: [
    { title: "First 2 months free", text: "On your real rooms, with your real staff." },
    { title: "No setup fee", text: "We add every room and train your staff." },
    { title: "No cut of your bookings", text: "You keep every rupee you earn." },
    { title: "Leave any time", text: "30 days notice. No fine." },
  ],
  assurances: [
    { title: "Two months free", text: "Run your real hotel on it before you pay anything." },
    { title: "Nothing to set up", text: "No setup fee. We add every room and train your staff." },
    { title: "Leave any time", text: "Tell us 30 days before. No fine. Your data comes with you." },
  ],
  includedNote: "You get all of it, for every room.",
  groups: [
    { title: "Front desk and calendar", items: [
      "A home screen with today on it", "A booking list you can search",
      "A colour chart of every room and date", "Change rates for many days at once",
      "Add walk-in and direct bookings", "Bookings come in on their own"] },
    { title: "Housekeeping and repairs", items: [
      "A daily cleaning list, room by room", "Jobs for cleaning, repairs and supervisors",
      "Laundry and laundry stock", "Supplies counted as they are used",
      "Damage saved with photos", "Late checkout charges"] },
    { title: "Money", items: [
      "Money still owed, and cash you took", "A record of every cash payment",
      "Purchase bills saved against the hotel", "One book for pay, rent, EMIs and bills",
      "Owner payouts, for hotels with more than one investor", "GST bills made and sent on WhatsApp",
      "What you earned and spent, month and year"] },
    { title: "Guests", items: [
      "A check-in link on WhatsApp for every booking", "A check-in form where they send their ID",
      "Hotel details sent back as a PDF", "Welcome and help messages",
      "A file for each guest, with their papers", "A record of guests who come back",
      "Reviews, reminders to reply, and takedown requests"] },
    { title: "Your staff", items: [
      "Staff accounts with a job title", "Give each person their own floors or blocks",
      "Choose what each person can see", "Attendance and leave",
      "Advances, bonus and salary", "Staff papers kept on file",
      "A phone app for cleaning, repairs and laundry"] },
    { title: "Reports and account", items: [
      "How full the hotel was", "A score for each room, and nights sold",
      "Alerts and payment reminders", "Shared files: house rules, vendor numbers",
      "Your own WhatsApp number", "Your data kept apart from every other hotel"] },
  ],
};

const OWNER: SegmentCopy = {
  label: "Property owner",
  kicker: "For property owners",
  promise: "You bought a property to earn. Not to work every day.",
  unitOne: "listing",
  unitMany: "listings",
  kinds: ["Villa", "Homestay", "Flat", "Room", "Cottage"],
  roles: [],
  teamRoles: [
    { id: "cleaner", one: "cleaner", many: "cleaners" },
    { id: "caretaker", one: "caretaker", many: "caretakers" },
    { id: "helper", one: "helper", many: "helpers" },
    { id: "partner", one: "partner who co-owns", many: "partners who co-own" },
  ],
  problems: [
    { id: "o-apps", said: "Bookings arrive on different apps",
      changes: "Bookings from {sites} come into one calendar on their own." },
    { id: "o-cleaner", said: "Confirming the cleaner on WhatsApp, late at night",
      changes: "The job goes to your cleaner’s phone. You see when it is done." },
    { id: "o-questions", said: "Guests ask the same questions every stay",
      changes: "Your house details go to the guest on WhatsApp, so they stop asking you." },
    { id: "o-ids", said: "Collecting guest IDs",
      changes: "Every guest gets a check-in link on WhatsApp and sends their ID before they reach the gate." },
    { id: "o-earnings", said: "Not sure what each property really makes",
      changes: "Income, cleaning, laundry and bills, property by property. No Excel at month end." },
    { id: "o-partner", said: "You own a property with a partner",
      changes: "Every booking splits in the share you agreed, and you both see the same numbers." },
    { id: "o-away", said: "You can’t be at the property every day",
      changes: "Your staff see their jobs on their phone and mark them done. You do not have to be there." },
    { id: "o-repairs", said: "Repairs are reported by photo on WhatsApp",
      changes: "Repairs are logged with photos and go to the right person." },
    { id: "o-charges", said: "Late checkout and damage don’t get charged",
      changes: "Damage is saved with photos. Late checkout is charged." },
    { id: "o-staff", said: "Staff pay and attendance are kept on paper",
      changes: "Attendance and leave, advances, bonus and salary in one place." },
  ],
  closeBand: "Keep your listings where they are. We handle everything after the booking.",
  weeksH2: "Live in four weeks. Your cleaner learns it on their phone.",
  weeks: (units) => [
    { title: "We see how you run things", text: "One call about your listings, your bookings and your staff." },
    { title: `We put your ${units} in`, text: "Listings, rates and your team, all set up with the right access." },
    { title: "We train your staff", text: "Your cleaner and caretaker learn the phone app, at your place." },
    { title: "You go live", text: "You run a full month on it. We watch the first bills and reports go out." },
  ],
  priceWho: "You pay for each listing. A listing is one thing a guest can book on its own: a room, a villa or a flat.",
  chips: [
    { title: "First 2 months free", text: "On your own places, with your own staff." },
    { title: "No setup fee", text: "We add everything and train your staff." },
    { title: "No cut of your bookings", text: "You keep every rupee you earn." },
    { title: "Leave any time", text: "30 days notice. No fine." },
  ],
  assurances: [
    { title: "Two months free", text: "Use it on your real listings before you pay anything." },
    { title: "Nothing to set up", text: "No setup fee. We add the listings and train your staff." },
    { title: "Leave any time", text: "Tell us 30 days before. No fine. Your data comes with you." },
  ],
  includedNote: "You get all of it, for every listing.",
  groups: [
    { title: "Bookings and calendar", items: [
      "A home screen with today on it", "A booking list you can search",
      "A colour chart of every listing and date", "Change rates for many days at once",
      "Add walk-in and direct bookings", "Bookings come in on their own"] },
    { title: "Cleaning and repairs", items: [
      "A daily cleaning list, place by place", "Jobs for cleaning, repairs and supervisors",
      "Laundry and laundry stock", "Supplies counted as they are used",
      "Damage saved with photos", "Late checkout charges"] },
    { title: "Money", items: [
      "Money still owed, and cash you took", "A record of every cash payment",
      "Purchase bills saved under each house", "One book for pay, rent, EMIs and bills",
      "Partner accounts and booking splits", "GST bills made and sent on WhatsApp",
      "What you earned and spent, month and year"] },
    { title: "Guests", items: [
      "A check-in link on WhatsApp for every booking", "A check-in form where they send their ID",
      "House details sent back as a PDF", "Welcome and help messages",
      "A file for each guest, with their papers", "A record of guests who come back",
      "Reviews, reminders to reply, and takedown requests"] },
    { title: "Your staff", items: [
      "Staff accounts with a job title", "Give each person their own houses",
      "Choose what each person can see", "Attendance and leave",
      "Advances, bonus and salary", "Staff papers kept on file",
      "A phone app for cleaning, repairs and laundry"] },
    { title: "Reports and account", items: [
      "How full each house was", "A score for each listing, and nights sold",
      "Alerts and payment reminders", "Shared files: house rules, vendor numbers",
      "Your own WhatsApp number", "Your data kept apart from everyone else"] },
  ],
};

export const COPY: Record<Segment, SegmentCopy> = { hotel: HOTEL, owner: OWNER };

export const MAX_PROBLEMS = 5;
export const MAX_OWNER_ROWS = 10;
