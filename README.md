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

### 1) Add Your Intro Card in `index.html`

```html id="j7m2x5"
<div class="card">
    <h3>John Doe</h3>
    <p>1st Year CSE</p>
    <p>AI enthusiast and web developer</p>
    <p>Passionate about building projects</p>
    <a href="portfolios/john-doe.html">View Portfolio</a>
</div>
```

⚠️ Keep your intro within **4–5 lines only**

---

### 2) Create Your Own Portfolio Page

Inside the `portfolios/` folder, create **your own file only**

Example:

```text id="v8q4t1"
portfolios/john-doe.html
```

---

## 🚨 Important Guidelines

### ✅ Edit Only Your Own Files

Only edit:

```text id="m2c6z8"
index.html
portfolios/your-name.html
```

Example:

```text id="p9x1w3"
index.html
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

### 1) Create Your Branch

```bash id="f3t7x1"
git checkout -b john-doe
```

---

### 2) Pull Latest Updates

```bash id="q6m2v9"
git pull origin main
```

---

### 3) Check Branch + Status

```bash id="z4p8n5"
git branch
git status
```

---

### 4) Add Your Card + Portfolio Page

Edit only your own files

---

### 5) Save Changes

```bash id="j1x9k4"
git add .
git commit -m "Added John Doe portfolio"
```

---

### 6) Pull Latest Updates Again

```bash id="u5c3m7"
git pull origin main
```

⚠️ Always do this before pushing

---

### 7) Push Your Branch

```bash id="l8v2n6"
git push origin john-doe
```

---

### 8) Create Pull Request

Go to GitHub and raise your PR.

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
