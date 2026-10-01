---
title: Import Past Days with Bulk Day Entry
description: Fill in a spreadsheet with one row per day, import a whole stretch of your jump history at once, and undo it if something looks wrong.
sidebar:
  order: 30
---

If you've been logging jumps in a spreadsheet, this tool makes it easy to get them into the app. Bulk Day Entry lets you fill in a spreadsheet with **one row per day** and import all of it in one go. Each row becomes the jumps you made that day, plus a work session with your times, tips and notes. This guide walks through it from start to finish.

## Before you start

- **Set up your services first.** The spreadsheet has one column for every **active service** at the location you choose, so the services, categories and rates need to exist before you download the template. 
- **Check your rates.** Amounts are not typed into the spreadsheet. Every jump is priced from the rate currently set for that service at that location. If a rate was different for the time frame you are importing, change your rates in the app before the import, and change them back to the current rates after you're done.
- **Pick one location per file.** A template belongs to a single location. For a second dropzone, download a second template.

## Start the import

1. Open the **Logbook** page.
2. Tap the import/export icon (the two arrows) at the top right and choose **Import CSV**.
3. Choose **Bulk Day Entry** as the source.
4. Pick the **Location** and tap **Continue**.

## Download and fill in the template

On the next screen, tap **Download Template**. The file is named `JumpTracker-BulkDayEntry-<Location>-Template.csv` and opens in any spreadsheet app.

Its columns, in order, are:

| Column | What to enter |
|---|---|
| `date` | The day, as `YYYY-MM-DD`, for example `2026-01-15` |
| One column per active service | Named `Category - Service`, for example `Tandem - Tandem Jump`. Enter how many times you did that service that day |
| `startTime` | Optional. 24-hour `HH:MM`, for example `09:00`. |
| `endTime` | Optional. 24-hour `HH:MM`, for example `17:00` |
| `notes` | Optional. A note for the whole day |
| `tips` | Optional. For example `20` or `$20.00`. |

The template comes with two example rows so you can see the format. Replace or delete them before you upload. 

:::tip[Quick tip]
Add your logs below the example rows so you have a reference for the format, then use your spreadsheet app to format all of the data to match it. Delete the example rows before you upload.
:::

### How the rows are read

- **One row per date.** If the same date appears twice, the whole file is rejected.
- **Quantities are whole numbers.** Enter `2` for two tandems. Leave a cell blank or enter `0` for none. Negative numbers and decimals are rejected.
- **Hours come from your times.** If you enter both start and end time, hours worked are calculated for you. If you leave the times blank, the day is saved with zero hours.

> **Don't edit the column headers.** The headers must match the location's current active services exactly. If you add, rename, remove or deactivate a service after downloading the template, the upload is rejected. Download a fresh template and copy your data across.

## Upload your file

1. Choose the **payment status for this batch**: **Paid** or **Pending**. It applies to every jump in the file. You need to pick this before the upload is enabled.
2. Choose your file.

JumpTracker Pro checks the whole file before it imports anything. If any row has a problem, **nothing** is imported, and you get a list such as "Row 4: date must be in YYYY-MM-DD format and a valid calendar date". Fix every row listed, then upload again.

## Review and confirm

The preview shows how many days are ready to import, and how many rows were skipped for having no data. Check the day count against what you expect, then confirm.

### If a day already has data

If you already have jumps or a work session logged at that location on a date in your file, you are asked what to do for each of those days: 

| Choice | What happens |
|---|---|
| **Match (skip this day)** | Your existing data is left alone. Nothing from the file is added for that day |
| **Merge (add alongside)** | The file's jumps are added next to what is already logged |
| **Replace (remove and re-import)** | The existing jump entries for that day are removed and replaced with the file's entries. Session time, tips and notes are kept |

You can apply one choice to all flagged days at once.

**Be careful with Replace.** With Bulk Day Entry, Replace also replaces that day's session time, tips and notes with what is in your file. It does not keep them. Replace also cannot be undone later. If you are unsure, export a backup first.

## If something looks wrong: undo

Every import is saved as a batch. To remove one:

1. On the **Logbook** page, open the import/export menu and choose **View Import History**.
2. Find the batch and choose undo. You will be asked to confirm.

Undo removes both the jumps and the work sessions the import created. It **cannot** be reversed once you confirm it, and it does not bring back anything a **Replace** removed.

## What to check afterward

- Open a few imported days in the **Logbook** and confirm the jump counts and amounts look right.
- Check the day's hours, tips and notes if you filled in times.
- If you chose **Pending**, those entries appear under Pending Services on the Summary page.
