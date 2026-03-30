# 🌟 Portfolio Showcase Contribution Repo

Welcome to the **Research and Innovation Team Portfolio Showcase** 🚀

This repository is created for our GitHub hands-on workshop to help first-year students learn how open-source contributions work in a real project.

Each student will contribute by adding:

* a short **intro card** on the main page
* their own **portfolio page**
* a working **View Portfolio** link

This helps you learn real GitHub contribution workflow in a simple way.

---

## 🎯 Contribution Flow

Every student will work on **only their own section**.

The project structure is:

```text id="h3k9p2"
portfolio-showcase/
│
├── index.html
├── style.css
├── script.js
│
└── portfolios/
    ├── john-doe.html
    ├── karthik.html
    ├── rahul.html
```

---

## 🌐 What You Need to Do

You need to contribute in **2 places only**:

### 1) Create Your JSON File in `data/` folder

Add a JSON file named after yourself: `data/your-name.json`

```json id="j7m2x5"
{
  "name": "John Doe",
  "year": "1st Year CSE",
  "intro": "AI enthusiast and web developer. Passionate about building projects",
  "portfolio": "portfolios/john-doe.html"
}
```

✅ The **index page automatically reads this JSON** and creates your card!

---

### 2) Create Your Own Portfolio Page

Inside the `portfolios/` folder, create **your own file only**

Your portfolio must be a **single HTML file only** (write HTML/CSS/JS inside the same file).

✅ valid examples:

```text id="n1p6t4"
portfolios/john-doe.html
portfolios/karthik.html
portfolios/rahul.html
```

❌ do not create portfolio files outside `portfolios/`

Example:

```text id="v8q4t1"
portfolios/john-doe.html
```

---

## ⚡ How Automatic Updates Work

**You DO NOT need to edit `index.html`!**

Here's how the magic happens:

1. **You add:** `data/your-name.json` + `portfolios/your-name.html`
2. **The script automatically:**
   - Discovers all JSON files in the `data/` folder
   - Reads the JSON data
   - Creates beautiful cards with your name, year, and intro
   - Links to your portfolio page
   - Displays everything on the index page **instantly**

This happens with **zero manual edits** to `index.html`. The system is intelligent and handles:
- ✅ Card layout and spacing
- ✅ Proper links to your portfolio
- ✅ Sorting contributors alphabetically
- ✅ Error handling if JSON is malformed
- ✅ Responsive design
- ✅ GitHub API fallback if directory listing disabled

**The Technology Stack:**
- `script.js` scans the `data/` folder for JSON files
- Uses GitHub API to discover files (works on static hosting!)
- Dynamically generates HTML cards from JSON
- No webpack, no build step needed - pure JavaScript

---

---

## 🚨 Important Guidelines

### ✅ Edit ONLY Your Own Files

Only create/edit:

```text id="m2c6z8"
data/your-name.json
portfolios/your-name.html
```

**Do NOT edit index.html** - The system automatically picks up your JSON file! ✨

Example for john-doe:

```text id="p9x1w3"
data/john-doe.json
portfolios/john-doe.html
```

---

### ❌ Do NOT Edit Others' Files

Do not touch:

* someone else’s card
* someone else’s portfolio file
* CSS unless assigned

---

## 🔄 ALWAYS PULL LATEST UPDATES

Before you start working, **always run this command first**:

```bash id="r4n7b2"
git pull origin main
```

This gets the **latest file updates from the main branch**.

⚠️ This is compulsory before starting your work.

---

## 🔁 Pull Again Before Pushing

Before you push your changes, always pull once again:

```bash id="w6k3m9"
git pull origin main
```

This ensures you have the latest updates from others and helps avoid merge conflicts.

So the flow is:

```text id="x1v5c8"
pull → edit → status → commit → pull → push
```

---

## 🌿 Check Your Branch First

Always check your branch:

```bash id="t3q8n4"
git branch
```

Example:

```text id="d7m1p6"
* john-doe
  main
```

The `*` means current branch.

---

## 🔁 If You Are in the Wrong Branch

Go back using your branch name.

Example:

```bash id="b2v9k7"
git checkout john-doe
```

---

## 👀 ALWAYS CHECK WHAT IS BEING EDITED

Before committing or pushing, always run:

```bash id="n5w2x8"
git status
```

This shows what files are changed.

Example:

```text id="k8p4q1"
modified: index.html
modified: portfolios/john-doe.html
```

✅ correct

If you see someone else’s file:

```text id="s9v6m3"
portfolios/rahul.html
```

❌ do not commit it

---

## 🚀 Contribution Steps

### 1) Clone Once (Skip if already cloned)

```bash id="c7v3b9"
git clone <repository-url>
cd portfolio-showcase
```

---

### 2) Add Upstream Remote (Do this once after cloning)

**What is upstream?** Upstream is the original repository. You need to add it so you can sync with the latest changes from the main project.

```bash id="u1p7x4"
# Add upstream remote (do this only once)
git remote add upstream <original-repository-url>

# Verify it was added correctly
git remote -v
```

**Expected Output:**

```text id="u2p8x5"
origin    https://github.com/your-username/portfolio-showcase.git (fetch)
origin    https://github.com/your-username/portfolio-showcase.git (push)
upstream  https://github.com/original-owner/portfolio-showcase.git (fetch)
upstream  https://github.com/original-owner/portfolio-showcase.git (push)
```

⚠️ **If you get this error:**
```text
error: remote upstream already exists
```
**Fix:** You already added upstream before. Run `git remote -v` to verify it's correct. If it's wrong:
```bash
git remote remove upstream
git remote add upstream <correct-url>
```

---

### 3) Create Issue First and Get Assigned

Use GitHub website first.

Optional GitHub CLI:

```bash id="k3d8n1"
gh issue create --title "Add your-name portfolio" --body "I will add data/your-name.json and portfolios/your-name.html"
```

---

### 4) Sync Main and Create Your Branch

```bash id="f3t7x1"
git checkout main
git pull origin main
git checkout -b your-name
git pull origin main
```

---

### 5) Make Your Changes Only in These Two Files

```text id="q4w8m2"
portfolios/your-name.html
data/your-name.json
```

---

### 6) Check Changes and Add Only Your Files

```bash id="q6m2v9"
git status

# example
git add portfolios/john-doe.html data/john-doe.json
```

---

### 7) Commit and Push to Your Branch

```bash id="z4p8n5"
git commit -m "Add your-name portfolio"
git push -u origin your-name
```

---

### 8) Raise Pull Request (Use PR Template)

Create PR from `your-name` branch to `main`.

Optional GitHub CLI:

```bash id="t5r2n8"
gh pr create --base main --head your-name --title "Add your-name portfolio files" --body "Closes #issue-number"
```

---

## ⚠️ Common Errors & How to Fix Them

### Error: "fatal: not a git repository"
**Cause:** You're not in the correct repository folder.

**Fix:**
```bash
cd portfolio-showcase
git status
```

---

### Error: "Your local changes to the following files would be overwritten by merge"
**Cause:** You have unsaved changes and tried to pull or checkout.

**Fix:**
```bash
git add .
git commit -m "Save my changes"
git pull origin main
```

---

### Error: "fatal: The current branch your-name has no upstream branch"
**Cause:** You didn't use `-u` flag when pushing.

**Fix:**
```bash
git push -u origin your-name
# Or if already exists
git push --set-upstream origin your-name
```

---

### Error: "merge conflict" when pulling
**Cause:** Someone modified the same file you're working on.

**Fix:** Open the conflicting file and look for:
```text
<<<<<<< HEAD
your code here
=======
their code here
>>>>>>> branch-name
```

Delete conflict markers and keep the correct code, then:
```bash
git add .
git commit -m "Resolved merge conflict"
git push origin your-name
```

---

## ✅ Automatic Updates from Upstream

To keep your fork synced with the latest changes from the original project:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

**Or use this one-liner:**
```bash
git fetch upstream && git checkout main && git merge upstream/main && git push origin main
```

Run this regularly to stay up-to-date before making new changes.

---

## 🎯 Goal of This Workshop

By contributing here, you will learn:

* Forking
* Branching
* Pulling latest updates
* Checking edited files
* Creating portfolio pages
* Raising Pull Requests

Happy Contributing 🚀
