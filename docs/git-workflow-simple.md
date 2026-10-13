# Git Workflow (Simplified)

Two ways to ship a change on this site. Both skip pull requests. Pick whichever fits the change.

`main` is the published site. Merging or pushing to `main` likely deploys it (the site URL in `astro.config.mjs` suggests so), so check the site builds first: `npx astro build`.

## Option A: Commit straight to `main`

Best for small edits and quick fixes.

```
git checkout main
git pull
git add -A
git commit -m "docs: short description of the change"
git push
```

## Option B: Work on `develop`, then merge into `main`

Best for larger changes, or anything you want to preview and tweak over several commits before it goes live. Every commit you made on `develop` is kept in `main`'s history.

1. Make sure `develop` is up to date with `main`.
   ```
   git checkout develop
   git merge main
   ```
2. Commit as you go. Push if you want a backup.
   ```
   git add -A
   git commit -m "docs: short description of the change"
   git push -u origin develop
   ```
3. When it's ready, merge into `main` and push.
   ```
   git checkout main
   git pull
   git merge --no-ff develop
   git push
   ```
   `--no-ff` adds one merge commit that groups the whole batch of work, so it's easy to find and undo later.
4. Go back to `develop` and keep working.
   ```
   git checkout develop
   git merge main
   ```
   This is a normal merge, so the branches share history and nothing needs to be reset or realigned.

## Undoing a change

Never use `git reset --hard` or force-push on `main`. Use `git revert`, which adds a new commit that reverses the change and is safe on a published branch.

```
git checkout main
git pull
git log --oneline
```

- **A single commit** (Option A, or one commit from `develop`):
  ```
  git revert <commit-sha>
  git push
  ```
- **A whole merge** (Option B): revert the merge commit.
  ```
  git revert -m 1 <merge-sha>
  git push
  ```
  `-m 1` tells git to keep `main`'s side and undo what `develop` brought in.

If you later want to merge the same `develop` work again after reverting its merge, revert the revert first, or git will treat those commits as already merged.

## Rules of thumb

- Pull before you commit to `main`, so you don't have to untangle a rejected push.
- Don't mix the options within one piece of work. If a change started on `develop`, finish it there.
- Test locally before shipping: `npx astro dev` or `npx astro build`.
