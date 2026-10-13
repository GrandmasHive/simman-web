# WhatsApp templates for website and ad leads

Submit both in WhatsApp Manager (or via the Graph API `message_templates` endpoint) on the
Simplified Management WhatsApp Business Account. Category: **Utility**. Language: **English (en)**.
Names must match `WHATSAPP_THANKS_TEMPLATE` / `WHATSAPP_DETAILS_TEMPLATE` (defaults below).

## lead_thank_you

Body:

> Hi {{1}}, thank you for filling in our form. Your request has reached the Simplified Management team in Pune. We will call or WhatsApp you within 24 business hours.

Sample for {{1}}: `Rahul`

## lead_details_request

Body:

> To set up your account, we need a few details. How many listings, which cities, and which booking sites you use. It takes 2 minutes.

Button (URL, static): text `Share my details`, URL `https://simplifiedmanagement.in/get-started`

## Vercel env vars

| Name | Value |
|---|---|
| `WHATSAPP_TOKEN` | System User token (Bitwarden) |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone number ID from WhatsApp Manager > API setup |

The site stores no leads (no CRM, Shaun 13 Oct 2026). Form leads and /get-started answers reach Shaun only through the Web3Forms email alert; WhatsApp sends go through `/api/whatsapp-thanks`.
