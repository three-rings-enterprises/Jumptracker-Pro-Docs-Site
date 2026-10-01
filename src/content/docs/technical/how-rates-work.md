---
title: How Rates Are Set, Captured and Updated
description: Where your rates live, when an amount is locked in on a logged jump, and what happens to your logbook when you change a rate.
sidebar:
  order: 11
---

Every jump you log has a dollar amount. This guide explains where that amount comes from, when it gets locked in, and what happens to past entries when you change a rate later. If you only read one thing, read the next section.

## The short version

- Your rate lives on the **service**. When you log a fixed-rate service, the app takes the service's rate **at that moment** and saves it on the entry.
- After that, the entry keeps its own amount. Changing the service's rate later changes **new** entries only. Past entries, the Summary page and your invoice totals are not touched.
- The app does not keep a history of old rates. There is one current rate per service.
- Past amounts can change in a few specific ways, listed in [Changing amounts on past entries](#changing-amounts-on-past-entries). The most important one is **Edit Day**, which re-prices a day at today's rates.

## Where rates are set

Rates are set in **Settings**, under **Services & Categories**.

1. Tap **Service** to add one, or **Edit** on an existing service.
2. Enter the **Base Rate**. This is the amount a single entry of that service earns.
3. Optionally turn on **Variable Rate** (see below).

Each service belongs to one location, so the same service name at two dropzones is two separate services with two separate rates. When you add a new service, you can add it to all of your locations at once, and then adjust each location's copy on its own.

In Settings, choose a location to see the current **Rates** of each of that location's services.

### Variable-rate services

Some services don't have a fixed price, such as one that depends on the customer's weight. Turn on **Variable Rate** for these. The app asks you to **type the amount each time you log it**. Whatever you type is saved on that entry.

## How an amount is captured

The amount is saved on each entry at the moment the entry is created. How that happens depends on how you log it:

| How you log it | Where the amount comes from |
|---|---|
| **Log Single** or **Log Day** (fixed-rate service) | The service's current rate, when you save |
| **Log Single** or **Log Day** (variable-rate service) | The amount you type |
| **Bulk Day Entry** import | The service's current rate, when you confirm the import. See [Import Past Days with Bulk Day Entry](/technical/bulk-day-entry-import/) |
| **Burble** or **JumpTracker CSV** import | The amount in the file, exactly as written. It is not recalculated from your rates |

The total shown while you are logging is calculated from your current rates, so it matches what will be saved.

## What happens when you change a rate

Say a tandem pays $85 and you change it to $90 in Settings.

- Jumps you log **from now on** earn $90.
- Jumps you already logged **stay at $85**, in your Logbook, on the Summary page and on invoices.

This is deliberate. Your history reflects what you were actually paid at the time, and a rate change never silently rewrites old earnings. For how these amounts add up on the Summary page and invoices, see [How Jump Counts and Totals Are Calculated](/technical/how-totals-are-calculated/).

:::note
A service that already has logged entries can't be deleted, so your history always keeps the service its amounts belong to.
:::

## Changing amounts on past entries

There is no button to edit the amount on a single past entry. If you need a past amount to change, these are the options.

### Edit Day re-prices fixed-rate entries

On the Logbook, open a day's menu and choose **Edit Day**. When you save, the app rebuilds that day's entries, and **every fixed-rate entry that day is priced at the service's current rate**, even if you only changed a note or the tips.

:::caution
Opening and saving a past day can change its earnings. If a rate has changed since that day, the day's fixed-rate jumps move to the new rate. The total shown inside Edit Day already uses current rates, so you can see the effect before you save.
:::

What Edit Day keeps:

- **Variable-rate entries** keep the amounts you entered. You can also change them here.
- **Payment status** (Paid or Pending) is carried over to the rebuilt entries.

You can use this on purpose: if you raised a rate and want a specific day to reflect it, open that day with **Edit Day** and save. The reverse also applies. If you changed a rate and want old days left alone, avoid saving them in Edit Day.

### Replace with a CSV import

If you need **exact** amounts, such as a day that paid a one-off price, you can correct them in a file and import it back:

1. Use **Export CSV** on the Logbook to get your entries.
2. Change the `paymentAmount` values you want to correct.
3. Import the file with **Import CSV** and choose **JumpTracker CSV**.
4. For days that already have entries, choose **Replace (remove and re-import)**.

The file's amounts are imported exactly as written.

:::caution
Replace removes what is logged for that day first, and **undoing the import does not bring it back**. Export a backup before you start, and try it on one day first.
:::

### Bulk Day Entry with Replace

Importing a day through [Bulk Day Entry](/technical/bulk-day-entry-import/) and choosing **Replace** re-prices that day at your current rates. It also replaces the day's session time, tips and notes with what is in the file, so it suits catching up whole days more than correcting a few amounts.

## Quick reference

| I want to... | Do this |
|---|---|
| Change what future jumps earn | Edit the service's **Base Rate** in Settings |
| Leave past jumps alone | Just change the rate. Past entries keep their amounts |
| Re-price one past day at today's rates | Open **Edit Day** on that day and save |
| Set an exact amount on past entries | Export, edit `paymentAmount`, re-import with **Replace** |
| Type a different amount each time | Turn on **Variable Rate** for the service |
