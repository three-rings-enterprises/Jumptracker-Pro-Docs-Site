# Git Workflow

How changes get from `develop` to `main` on this site, and how to undo them.

**Goal:** every change on `main` is one commit that is easy to find and easy to undo.

**Branches**
- `main`: the published site. Changes normally arrive through a squash-merged PR, or [directly](#publishing-straight-to-main-no-pr) for small fixes.
- `develop`: where work happens.

## Shipping a change

1. Commit your work on `develop`.
   ```
   git add -A
   git commit -m "docs: short description of the change"
   ```
2. Push the branch (use `-u` the first time).
   ```
   git push -u origin develop
   ```
3. Open a pull request into `main`.
   ```
   gh pr create --base main --head develop --title "Short description"
   ```
4. Squash and merge, either with the button on GitHub or:
   ```
   gh pr merge --squash
   ```
   Squashing turns the whole PR into a single commit on `main`.

## Publishing straight to `main` (no PR)

For a small or urgent change, you can skip the PR and put it on `main` yourself. Keep the "one commit per change" goal by squashing locally.

**Option A: squash `develop` into `main`**

```
git checkout main
git pull
git merge --squash develop
git commit -m "docs: short description of the change"
git push
```

`git merge --squash` stages the combined changes without committing, so the `git commit` creates the single commit on `main`. Then reset `develop` as described below.

**Option B: commit directly on `main`**

For a tiny fix that doesn't need a branch:

```
git checkout main
git pull
# make your edits
git add -A
git commit -m "docs: short description of the change"
git push
```

Then bring `develop` up to date (`git checkout develop && git rebase main`) so it doesn't fall behind.

Pushing to `main` publishes the site right away, so run `npx astro build` first. If branch protection blocks direct pushes, use the PR workflow instead. To undo, use `git revert <commit-sha>` as in [Undoing a change](#undoing-a-change).

## Reset `develop` after every merge

A squash merge gives `main` a new commit that `develop` doesn't have, so the two branches' histories diverge. Before starting new work, realign `develop` with `main`, or the next PR will show conflicts over the old commits.

```
git checkout main
git pull
git checkout -B develop
git push --force-with-lease origin develop
```

The last line is needed because `origin/develop` still holds the pre-squash commits. Without it, Git reports `develop` as ahead 1 and behind N. That is expected after a squash merge, and force-pushing is safe here because `develop` is a personal branch.

## Undoing a change

Find the commit on `main` (`git log --oneline main`), then revert it:

```
git checkout main
git pull
git revert <commit-sha>
git push
```

`git revert` adds a new commit that reverses the change, so history stays intact and it is safe on a published branch. You can also click **Revert** on the merged PR on GitHub, which opens a PR that does the same thing.

Don't use `git reset --hard` or force-push on `main`.

## Notes

- Check whether `main` triggers a deploy. The site URL in `astro.config.mjs` suggests it does, so merging to `main` publishes the change.
- Test locally before opening the PR: `npx astro dev` or `npx astro build`.
- Skipping the PR is fine for solo work if you'd rather not use one. From `main`, run `git merge --no-ff develop` and push. Undo it with `git revert -m 1 <merge-sha>`. The squash workflow above is easier to get right.
