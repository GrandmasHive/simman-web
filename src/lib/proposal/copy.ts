// Fixed proposal copy. Every claim here is taken from the v2 sales decks
// (Media-Kit/source/kit_hotels.py + kit_owners.py, 2026-09-25) or the website.
// Do not add new product claims or numbers here: reps can only pick from
// these lines, which is what stops a proposal promising something new.

import type { Segment } from "./types";

export type SegmentCopy = {
  label: string;
  kicker: string;
  promise: string;
  unitOne: string;
  unitMany: string;
  weeks: (units: string) => { title: string; text: string }[];
  weeksH2: string;
  priceWho: string;
  chips: { title: string; text: string }[];
  assurances: { title: string; text: string }[];
  includedNote: string;
  groups: { title: string; items: string[] }[];
};

const HOTEL: SegmentCopy = {
  label: "Hotel",
  kicker: "For hotels",
  promise: "Your whole hotel. Without chasing your whole team.",
  unitOne: "room",
  unitMany: "rooms",
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
  label: "Home owner",
  kicker: "For property owners",
  promise: "You bought a property to earn. Not to work every day.",
  unitOne: "listing",
  unitMany: "listings",
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

