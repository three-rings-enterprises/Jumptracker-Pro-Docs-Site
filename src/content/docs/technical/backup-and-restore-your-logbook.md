---
title: Back Up and Restore Your Logbook
description: Export your logbook to CSV files, keep them as a backup, and bring them back into JumpTracker Pro with the JumpTracker CSV import.
sidebar:
  order: 50
---

JumpTracker Pro can export your logbook as CSV files and import those same files back in. Together, that gives you a backup and a way to restore it. It also lets you move your history to a new account or keep your own copy in a spreadsheet. This guide covers both directions.

## Export your logbook

1. Open the **Logbook** page.
2. Tap the import/export icon (the two arrows) at the top right and choose **Export CSV**.
3. Optionally set a **From Date** and **To Date**. Leave both blank to export your full history.
4. Tap **Download**.

You get **two files** from one export, both covering the same date range:

| File | What is in it | Columns |
|---|---|---|
| `JumpTracker-Logbook-<date>.csv` | Every jump or service you logged | `date`, `location`, `category`, `service`, `paymentAmount`, `paymentStatus`, `notes` |
| `JumpTracker-WorkSessions-<date>.csv` | One row per work day: your times, hours, tips and day notes | `location`, `date`, `startTime`, `endTime`, `hoursWorked`, `tips`, `notes`, `basePay` |

Keep the two files together. A complete backup needs both: the logbook file has your jumps, and the work sessions file has your hours and tips.

If you set only one date, the other side defaults to the earliest possible date (From) or today (To).

### What is and isn't in a backup

**Included:** every logged entry with its amount, paid or pending status and note, and every day's session times, hours, tips and notes.

**Not included:** your service settings (service type, variable rate, info text, display order), location addresses and billing details, invoices, and account settings. Amounts are included, but your **current rates** are not. Invoices can be generated again from your restored entries.

:::tip[Back up before big changes]
Export a fresh backup before any import that uses **Replace**, and before editing many past days. Replace cannot be undone.
:::

## Restore or import a JumpTracker CSV

1. On the **Logbook** page, open the import/export menu and choose **Import CSV**.
2. Choose **JumpTracker CSV** as the source.
3. Choose your **logbook** file.
4. Optionally, choose your **work sessions** file in the second upload ("Optionally also import a Work Sessions CSV"). You can also import only the work sessions file.
5. Tap **Continue** and follow the steps that appear.

Need a blank file to fill in by hand? Tap **Download Template** on the upload step.

### What the app checks in your file

- The column headers must match the export exactly, in the same order. If you edit a file in a spreadsheet, don't rename, reorder or remove columns.
- Each row needs a valid `date` (as `YYYY-MM-DD`), a `location`, `category` and `service`, a numeric `paymentAmount`, and a `paymentStatus` of exactly `paid` or `pending`. Negative amounts are allowed, for example a deduction.
- Location, category and service names can't contain the `|` character.
- A file can have at most 20,000 rows.

Unlike Bulk Day Entry, a bad row doesn't reject the whole file. Rows with problems are **skipped**, and the preview lists each one with the reason, so you can see what won't be imported before you confirm.

Amounts and paid or pending status come **straight from the file**, row by row. Nothing is recalculated from your current rates. See [How Rates Are Set, Captured and Updated](/technical/how-rates-work/).

### Matching names to your account

The app compares location, category and service names in the file to the ones in your account, using exact spelling.

- **Everything matches.** This is the normal case when restoring into the account the file came from. You skip straight on.
- **Some names are new.** This happens with a new account, or if you renamed something since the export. For each new location, category or service, choose **Match to existing** or **Create new**.

When you create a new service during an import:

- You choose its **service type** (Jump, Jump Modifier, Pack Job or Other).
- Its **base rate** is set from the amount on the most recent entry for that service in the file.
- It is created as a **fixed-rate** service. If it should be variable rate, turn that on in Settings afterward.
- New categories are created at the top level, without any grouping under a parent category, and new locations are created with just their name.

After a restore into a fresh account, check **Settings** for service types, variable-rate services, category grouping and location details. The backup doesn't carry those. You may need to reconfigure.

### Days that already have data

If your account already has entries or a session at the same location and date as a row in your file, you choose what to do for each of those days:

| Choice | What happens |
|---|---|
| **Match (skip this day)** | Your existing data is left alone. Nothing from the file is added for that day |
| **Merge (add alongside)** | The file's jumps are added next to what is already logged |
| **Replace (remove and re-import)** | The existing jump entries for that day are removed and replaced with the file's entries. Session time, tips and notes are kept |

You can apply one choice to all flagged days at once.

:::caution
Importing the same file twice does not remove duplicates by itself. If you restore a file into an account that already has those days, choose **Match** for them, or **Merge** will add every jump a second time.
:::

### Work sessions are handled differently

If you import the work sessions file, any day that **already has a session** at that location and date is **overwritten** with the file's start time, end time, hours, tips and notes. You are not asked to choose Match, Merge or Replace for sessions.

Two more details:

- **Hours:** if a row has both a start and an end time, hours are calculated from them. Otherwise the `hoursWorked` value is used.
- **Base pay:** the `basePay` column in the file is ignored. JumpTracker Pro recalculates it from that day's entries.

### Confirm and finish

The preview shows how many logbook rows and work session rows are ready, anything that will be created (locations, categories, services), and any rows that will be skipped. Tap **Confirm Import** when it looks right.

The final screen shows how many rows were added, and how many work sessions were created or updated. If the work sessions part fails while the logbook part succeeds, you'll see **Retry work sessions only**. Use that instead of running the wizard again, which would add your jumps a second time.

## Undo an import

Every import is saved as a batch.

1. On the **Logbook** page, open the import/export menu and choose **View Import History**.
2. Find the batch and choose **Undo**. You will be asked to confirm.

Undo removes the entries and work sessions that import **created**. It cannot be reversed, and it does not put back anything that **Replace** removed or any work session the import **overwrote**. Locations, categories and services the import created stay in your settings until you delete them.

## Common uses

| I want to... | Do this |
|---|---|
| Keep a regular backup | Export your full history, and keep both files somewhere safe |
| Restore after deleting entries by mistake | Import both files and choose **Match** for days that still have data |
| Move to a new account | Import both files, then check Settings for service types, rates and location details |
| Correct amounts on past entries | Edit `paymentAmount` in the logbook file and import with **Replace**. See [How Rates Are Set, Captured and Updated](/technical/how-rates-work/) |
| Add a stretch of past days from a spreadsheet | Use [Bulk Day Entry](/technical/bulk-day-entry-import/), which is built for that |
