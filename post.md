# I built LocalListing AI to help small sellers create product listings with open AI

*This is a submission for the [Hacktoberfest Open-Source AI Challenge Week 2: Side Hustle](https://dev.to/challenges/hacktoberfest-week2-2026-10-12)*

## What I Built

LocalListing AI helps small sellers turn a product photo and a few details into a ready-to-edit product listing.

It generates a product title, description, keywords, social caption, and translations. The goal is to make listing products less time-consuming for people running small shops or selling through social media.

I wanted to build something practical, not another chatbot. A seller should be able to upload a photo, review the result, correct any details, and copy the content where they need it.

## Demo

Try it here: **[Add your deployed demo URL]**

## Code

Source code: **[Add your GitHub repository URL]**

## How I Built It

I built the web app with Next.js and TypeScript. The AI workflow uses an open-weight vision model to understand the product image and generate structured listing content.

The seller can provide extra details such as category, audience, tone, and target language. The app is designed to flag missing information instead of making up facts such as materials, dimensions, or product safety claims.

**Model used:** [Add the exact model and version you tested]

**Deployment:** [Add where the app and model are hosted]

## Why Does Open Innovation Matter?

Open-weight models give developers more control over how AI runs and which model fits the job. They also make it possible to experiment with local inference, compare models, and understand the trade-offs in quality, speed, and compute cost.

For this project, I wanted the AI workflow to be replaceable rather than tied to one closed provider. Local inference can also keep product images on a seller's machine when the whole workflow is run locally. A hosted deployment has different privacy considerations, so that distinction matters.

## My First User

[Keep this section only after a real person has tested the app. Describe who tried it, what they used it for, what feedback they gave, and whether they would pay for it.]

## Prize Categories

- [List only the partner categories that your finished project genuinely qualifies for.]

---

Built for Hacktoberfest 2026.
